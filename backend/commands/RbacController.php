<?php

namespace app\commands;

use app\models\UserEntity;
use Yii;
use yii\console\Controller;
use yii\console\ExitCode;
use yii\helpers\Console;

class RbacController extends Controller
{
    public function actionInit(): int
    {
        $auth = Yii::$app->authManager;
        $auth->removeAll();

        $this->stdout("Инициализация RBAC системы...\n", Console::FG_GREEN);

        $createVacancy = $auth->createPermission('createVacancy');
        $createVacancy->description = 'Создание вакансий';
        $auth->add($createVacancy);

        $updateVacancy = $auth->createPermission('updateVacancy');
        $updateVacancy->description = 'Редактирование вакансий';
        $auth->add($updateVacancy);

        $deleteVacancy = $auth->createPermission('deleteVacancy');
        $deleteVacancy->description = 'Удаление вакансий';
        $auth->add($deleteVacancy);

        $viewVacancy = $auth->createPermission('viewVacancy');
        $viewVacancy->description = 'Просмотр вакансий';
        $auth->add($viewVacancy);

        $viewStats = $auth->createPermission('viewStats');
        $viewStats->description = 'Просмотр статистики';
        $auth->add($viewStats);

        $manageUsers = $auth->createPermission('manageUsers');
        $manageUsers->description = 'Управление пользователями';
        $auth->add($manageUsers);

        $viewer = $auth->createRole('viewer');
        $viewer->description = 'Наблюдатель';
        $auth->add($viewer);
        $auth->addChild($viewer, $viewVacancy);

        $editor = $auth->createRole('editor');
        $editor->description = 'Редактор';
        $auth->add($editor);
        $auth->addChild($editor, $viewer);
        $auth->addChild($editor, $createVacancy);
        $auth->addChild($editor, $updateVacancy);

        $manager = $auth->createRole('manager');
        $manager->description = 'Менеджер';
        $auth->add($manager);
        $auth->addChild($manager, $editor);
        $auth->addChild($manager, $deleteVacancy);
        $auth->addChild($manager, $viewStats);

        $admin = $auth->createRole('admin');
        $admin->description = 'Администратор';
        $auth->add($admin);
        $auth->addChild($admin, $manager);
        $auth->addChild($admin, $manageUsers);

        $this->stdout("✓ Роли и разрешения созданы\n", Console::FG_GREEN);

        $adminUser = UserEntity::findByEmail('admin@example.com');
        if ($adminUser) {
            $auth->assign($admin, $adminUser->id);
            $this->stdout("✓ Роль admin назначена пользователю admin@example.com\n", Console::FG_GREEN);
        }

        $demoUser = UserEntity::findByEmail('demo@example.com');
        if ($demoUser) {
            $auth->assign($editor, $demoUser->id);
            $this->stdout("✓ Роль editor назначена пользователю demo@example.com\n", Console::FG_GREEN);
        }

        $testUser = UserEntity::findByEmail('test@example.com');
        if ($testUser) {
            $auth->assign($viewer, $testUser->id);
            $this->stdout("✓ Роль viewer назначена пользователю test@example.com\n", Console::FG_GREEN);
        }

        $this->stdout("\nRBAC система инициализирована успешно!\n", Console::FG_GREEN);
        $this->stdout("\nРоли:\n", Console::FG_YELLOW);
        $this->stdout("• admin - Полный доступ ко всем функциям\n", Console::FG_CYAN);
        $this->stdout("• manager - Управление вакансиями + статистика\n", Console::FG_CYAN);
        $this->stdout("• editor - Создание и редактирование вакансий\n", Console::FG_CYAN);
        $this->stdout("• viewer - Только просмотр вакансий\n", Console::FG_CYAN);

        return ExitCode::OK;
    }

    public function actionAssign(string $role, string $email): int
    {
        $auth = Yii::$app->authManager;
        $user = UserEntity::findByEmail($email);

        if (!$user) {
            $this->stdout("Пользователь с email '{$email}' не найден\n", Console::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }

        $roleObj = $auth->getRole($role);
        if (!$roleObj) {
            $this->stdout("Роль '{$role}' не найдена\n", Console::FG_RED);
            return ExitCode::UNSPECIFIED_ERROR;
        }

        $auth->revokeAll($user->id);
        $auth->assign($roleObj, $user->id);

        $this->stdout("✓ Роль '{$role}' назначена пользователю '{$email}'\n", Console::FG_GREEN);
        return ExitCode::OK;
    }

    public function actionList(): int
    {
        $auth = Yii::$app->authManager;
        
        $this->stdout("Роли в системе:\n", Console::FG_GREEN);
        foreach ($auth->getRoles() as $role) {
            $this->stdout("• {$role->name} - {$role->description}\n", Console::FG_CYAN);
        }

        $this->stdout("\nРазрешения в системе:\n", Console::FG_GREEN);
        foreach ($auth->getPermissions() as $permission) {
            $this->stdout("• {$permission->name} - {$permission->description}\n", Console::FG_CYAN);
        }

        return ExitCode::OK;
    }
}
