<?php

namespace app\repositories;

use app\models\User;
use app\models\UserEntity;
use app\repositories\contracts\UserRepositoryInterface;
use ReflectionClass;
use RuntimeException;
use yii\base\Exception;
use \yii\db\Exception as DbException;
class UserRepository implements UserRepositoryInterface
{
    /**
     * {@inheritdoc}
     */
    public function findById(int $id): ?User
    {
        $userEntity = UserEntity::findIdentity($id);
        if (!$userEntity) {
            return User::findIdentity($id);
        }

        return $this->convertToUser($userEntity);
    }

    /**
     * {@inheritdoc}
     */
    public function findByUsername(string $username): ?User
    {
        $userEntity = UserEntity::findByUsername($username);
        if (!$userEntity) {
            return User::findByUsername($username);
        }

        return $this->convertToUser($userEntity);
    }

    /**
     * {@inheritdoc}
     */
    public function findByAccessToken(string $token): ?User
    {
        $userEntity = UserEntity::findIdentityByAccessToken($token);
        if (!$userEntity) {
            return User::findIdentityByAccessToken($token);
        }

        return $this->convertToUser($userEntity);
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        $userEntities = UserEntity::find()->where(['status' => UserEntity::STATUS_ACTIVE])->all();
        $users = [];

        foreach ($userEntities as $userEntity) {
            $users[] = $this->convertToUser($userEntity);
        }

        if (empty($users)) {
            $reflection = new ReflectionClass(User::class);
            $usersProperty = $reflection->getProperty('users');
            $usersData = $usersProperty->getValue();

            foreach ($usersData as $userData) {
                $users[] = new User($userData);
            }
        }

        return $users;
    }

    /**
     * @param array $data
     * @return User
     * @throws Exception
     * @throws DbException
     */
    public function create(array $data): User
    {
        $userEntity = new UserEntity();
        $userEntity->load($data, '');

        if (isset($data['password'])) {
            $userEntity->setPassword($data['password']);
        }

        $userEntity->generateAuthKey();
        $userEntity->generateAccessToken();

        if (!$userEntity->save()) {
            throw new RuntimeException('При создании пользователя произошла ошибка: ' . json_encode($userEntity->errors));
        }

        return $this->convertToUser($userEntity);
    }

    /**
     * @param User $user
     * @param array $data
     * @return bool
     * @throws Exception
     * @throws DbException
     */
    public function update(User $user, array $data): bool
    {
        $userEntity = UserEntity::findOne(['id' => $user->getId()]);
        if (!$userEntity) {
            return false;
        }

        $userEntity->load($data, '');

        if (isset($data['password'])) {
            $userEntity->setPassword($data['password']);
        }

        return $userEntity->save();
    }

    /**
     * @param User $user
     * @return bool
     * @throws DbException
     */
    public function delete(User $user): bool
    {
        $userEntity = UserEntity::findOne(['id' => $user->getId()]);
        if (!$userEntity) {
            return false;
        }

        $userEntity->status = UserEntity::STATUS_INACTIVE;
        return $userEntity->save();
    }

    /**
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User
    {
        $userEntity = UserEntity::findByEmail($email);
        if (!$userEntity) {
            return null;
        }

        return $this->convertToUser($userEntity);
    }

    /**
     * @param UserEntity $userEntity
     * @return User
     */
    private function convertToUser(UserEntity $userEntity): User
    {
        return new User([
            'id' => $userEntity->id,
            'username' => $userEntity->username,
            'password' => '',
            'authKey' => $userEntity->auth_key,
            'accessToken' => $userEntity->access_token,
        ]);
    }
}
