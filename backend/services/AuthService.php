<?php

namespace app\services;

use app\models\User;
use app\models\UserEntity;
use app\repositories\contracts\UserRepositoryInterface;
use app\services\contracts\AuthServiceInterface;
use Exception;
use Yii;

class AuthService implements AuthServiceInterface
{
    /**
     * @var UserRepositoryInterface
     */
    private UserRepositoryInterface $userRepository;

    /**
     * @param UserRepositoryInterface $userRepository
     */
    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function authenticate(string $username, string $password, bool $rememberMe = false): array
    {
        try {
            $user = $this->userRepository->findByUsername($username);
            if (!$user) {
                $user = $this->userRepository->findByEmail($username);
            }

            if (!$user || !$user->validatePassword($password)) {
                return [
                    'success' => false,
                    'errors' => ['Invalid credentials']
                ];
            }

            $duration = $rememberMe ? 3600 * 24 * 30 : 0;
            $success = Yii::$app->user->login($user, $duration);

            if ($success) {
                return [
                    'success' => true,
                    'data' => [
                        'user_id' => $user->getId(),
                        'username' => $user->username,
                        'email' => $user->email,
                        'message' => 'Аутентификация прошла успешно'
                    ]
                ];
            }

            return [
                'success' => false,
                'errors' => ['Ошибка аутентификации']
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()]
            ];
        }
    }

    /**
     * @param string $email
     * @param string $password
     * @return UserEntity|null
     */
    public function authenticateForToken(string $email, string $password): ?UserEntity
    {
        $userEntity = UserEntity::findByEmail($email);
        if (!$userEntity) {
            $userEntity = UserEntity::findByUsername($email);
        }

        if ($userEntity && $userEntity->validatePassword($password)) {
            return $userEntity;
        }

        return null;
    }

    /**
     * {@inheritdoc}
     */
    public function getUserByToken(string $token): ?User
    {
        return $this->userRepository->findByAccessToken($token);
    }

    /**
     * {@inheritdoc}
     */
    public function getUserById(int $id): ?User
    {
        return $this->userRepository->findById($id);
    }

    /**
     * {@inheritdoc}
     */
    public function logout(): bool
    {
        return Yii::$app->user->logout();
    }

    /**
     * {@inheritdoc}
     */
    public function validateCredentials(string $username, string $password): bool
    {
        $user = $this->userRepository->findByUsername($username);
        return $user && $user->validatePassword($password);
    }
}
