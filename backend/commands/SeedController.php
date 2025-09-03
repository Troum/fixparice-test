<?php

namespace app\commands;

use app\models\UserEntity;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\db\Exception;
use yii\helpers\BaseConsole;
use \yii\base\Exception as BaseException;

class SeedController extends Controller
{
    /**
     * @param string $email
     * @param string $password
     * @param string $username
     * @param string $description
     * @return int
     * @throws BaseException
     * @throws Exception
     */
    public function actionCreateUser(string $email, string $password, string $username = 'User', string $description = 'Demo'): int
    {
        $this->stdout("Создание пользователя {$description}..." . PHP_EOL, BaseConsole::FG_GREEN);

        $existingUser = UserEntity::find()
            ->where(['or', ['username' => $username], ['email' => $email]])
            ->one();

        if ($existingUser) {
            $this->stdout("- {$description} уже существует (email: {$email})" . PHP_EOL, BaseConsole::FG_YELLOW);
            return ExitCode::OK;
        }

        $user = new UserEntity();
        $user->username = $username;
        $user->email = $email;
        $user->setPassword($password);
        $user->generateAuthKey();
        $user->generateAccessToken();
        $user->status = UserEntity::STATUS_ACTIVE;

        if ($user->save()) {
            $this->stdout("{$description} пользователь создан (email: {$email}, пароль: {$password})" . PHP_EOL, BaseConsole::FG_GREEN);
        } else {
            $this->stdout("Ошибка при создании пользователя {$description}: " . json_encode($user->errors) . PHP_EOL, BaseConsole::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }

        return ExitCode::OK;
    }
    /**
     * @return int
     * @throws Exception|BaseException
     */
    public function actionUser(): int
    {
        $this->stdout("Создание пользователей..." . PHP_EOL, BaseConsole::FG_GREEN);

        $users = [
            [
                'username' => 'admin',
                'email' => 'admin@example.com',
                'password' => 'admin123',
                'description' => 'Admin'
            ],
            [
                'username' => 'demo',
                'email' => 'demo@example.com',
                'password' => 'demo123',
                'description' => 'Demo'
            ],
            [
                'username' => 'test',
                'email' => 'test@example.com',
                'password' => 'test123',
                'description' => 'Test'
            ]
        ];

        foreach ($users as $userData) {
            $existingUser = UserEntity::find()
                ->where(['or', ['username' => $userData['username']], ['email' => $userData['email']]])
                ->one();

            if ($existingUser) {
                $this->stdout("- {$userData['description']} уже существует (email: {$userData['email']})" . PHP_EOL, BaseConsole::FG_YELLOW);
                continue;
            }

            $user = new UserEntity();
            $user->username = $userData['username'];
            $user->email = $userData['email'];
            $user->setPassword($userData['password']);
            $user->generateAuthKey();
            $user->generateAccessToken();
            $user->status = UserEntity::STATUS_ACTIVE;

            if ($user->save()) {
                $this->stdout("{$userData['description']} пользователь создан (email: {$userData['email']}, пароль: {$userData['password']})" . PHP_EOL, BaseConsole::FG_GREEN);
            } else {
                $this->stdout("Ошибка при создании пользователя {$userData['description']}: " . json_encode($user->errors) . PHP_EOL, BaseConsole::FG_RED);
                return ExitCode::UNSPECIFIED_ERROR;
            }
        }

        $this->stdout("Добавление пользователей завершено!" . PHP_EOL, BaseConsole::FG_GREEN);
        $this->stdout("Доступные учётные данные для входа в API:" . PHP_EOL, BaseConsole::FG_YELLOW);
        $this->stdout("Admin: admin@example.com / admin123" . PHP_EOL, BaseConsole::FG_CYAN);
        $this->stdout("Demo:  demo@example.com / demo123" . PHP_EOL, BaseConsole::FG_CYAN);
        $this->stdout("Test:  test@example.com / test123" . PHP_EOL, BaseConsole::FG_CYAN);

        return ExitCode::OK;
    }

    /**
     * @return int
     * @throws BaseException
     * @throws Exception
     */
    public function actionAll(): int
    {
        $this->stdout("Создание..." . PHP_EOL, BaseConsole::FG_GREEN);

        $userResult = $this->actionUser();
        if ($userResult !== ExitCode::OK) {
            return $userResult;
        }

        $this->stdout("Данные успешно добавлены." . PHP_EOL, BaseConsole::FG_GREEN);
        return ExitCode::OK;
    }

    /**
     * @return int
     */
    public function actionClear(): int
    {
        $this->stdout("Очистка данных..." . PHP_EOL, BaseConsole::FG_YELLOW);

        $deletedUsers = UserEntity::deleteAll([
            'email' => [
                'admin@example.com',
                'demo@example.com',
                'test@example.com'
            ]
        ]);

        $this->stdout("Удалено {$deletedUsers} тестовых пользователей" . PHP_EOL, BaseConsole::FG_GREEN);
        $this->stdout("Тестовые данные успешно очищены!" . PHP_EOL, BaseConsole::FG_GREEN);

        return ExitCode::OK;
    }

    /**
     * @return int
     */
    public function actionInfo(): int
    {
        $this->stdout("Информация о тестовых пользователях:" . PHP_EOL . PHP_EOL, BaseConsole::FG_GREEN);

        $users = UserEntity::find()
            ->where(['email' => ['admin@example.com', 'demo@example.com', 'test@example.com']])
            ->all();

        if (empty($users)) {
            $this->stdout("Тестовые пользователи не найдены. Выполните 'php yii seed/user' для их создания." . PHP_EOL, BaseConsole::FG_YELLOW);
            return ExitCode::OK;
        }

        foreach ($users as $user) {
            $this->stdout("ID: {$user->id}" . PHP_EOL, BaseConsole::FG_CYAN);
            $this->stdout("Логин: {$user->username}" . PHP_EOL, BaseConsole::FG_CYAN);
            $this->stdout("Email: {$user->email}" . PHP_EOL, BaseConsole::FG_CYAN);
            $this->stdout("Статус: " . ($user->status == UserEntity::STATUS_ACTIVE ? 'Активен' : 'Неактивен') . PHP_EOL, BaseConsole::FG_CYAN);
            $this->stdout("Создан: " . date('Y-m-d H:i:s', $user->created_at) . PHP_EOL, BaseConsole::FG_CYAN);
            $this->stdout("---" . PHP_EOL);
        }

        return ExitCode::OK;
    }

    /**
     * @param string $email
     * @param string $password
     * @return int
     * @throws BaseException
     * @throws Exception
     */
    public function actionResetPassword(string $email, string $password): int
    {
        $user = UserEntity::findByEmail($email);

        if (!$user) {
            $this->stdout("Пользователь с email '{$email}' не найден." . PHP_EOL, BaseConsole::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }

        $user->setPassword($password);
        $user->generateAuthKey();

        if ($user->save()) {
            $this->stdout("Пароль для пользователя '{$email}' сброшен на '{$password}'" . PHP_EOL, BaseConsole::FG_GREEN);
            return ExitCode::OK;
        } else {
            $this->stdout("Не удалось сбросить пароль: " . json_encode($user->errors) . PHP_EOL, BaseConsole::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }
    }

    /**
     * @param string $email
     * @param string $password
     * @return int
     */
    public function actionTestAuth(string $email, string $password): int
    {
        $this->stdout("Проверка авторизации для: {$email}" . PHP_EOL, BaseConsole::FG_YELLOW);

        $user = UserEntity::findByEmail($email);

        if (!$user) {
            $this->stdout("Пользователь не найден" . PHP_EOL, BaseConsole::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }

        $this->stdout("Пользователь найден: ID {$user->id}, Логин: {$user->username}" . PHP_EOL, BaseConsole::FG_CYAN);

        if ($user->validatePassword($password)) {
            $this->stdout("Пароль верный" . PHP_EOL, BaseConsole::FG_GREEN);
            return ExitCode::OK;
        } else {
            $this->stdout("Неверный пароль" . PHP_EOL, BaseConsole::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }
    }
}
