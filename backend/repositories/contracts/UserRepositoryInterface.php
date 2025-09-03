<?php

namespace app\repositories\contracts;

use app\models\User;

interface UserRepositoryInterface
{
    /**
     * @param int $id
     * @return User|null
     */
    public function findById(int $id): ?User;

    /**
     * @param string $username
     * @return User|null
     */
    public function findByUsername(string $username): ?User;

    /**
     * @param string $token
     * @return User|null
     */
    public function findByAccessToken(string $token): ?User;

    /**
     * @return array
     */
    public function findAll(): array;

    /**
     * @param array $data
     * @return User
     */
    public function create(array $data): User;

    /**
     * @param User $user
     * @param array $data
     * @return bool
     */
    public function update(User $user, array $data): bool;

    /**
     * @param User $user
     * @return bool
     */
    public function delete(User $user): bool;

    /**
     * @param string $email
     * @return User|null
     */
    public function findByEmail(string $email): ?User;
}
