<?php

namespace app\services\contracts;

use app\models\User;

interface AuthServiceInterface
{
    /**
     * Authenticate user by credentials
     *
     * @param string $username
     * @param string $password
     * @param bool $rememberMe
     * @return array
     */
    public function authenticate(string $username, string $password, bool $rememberMe = false): array;

    /**
     * Get user by access token
     *
     * @param string $token
     * @return User|null
     */
    public function getUserByToken(string $token): ?User;

    /**
     * Get user by ID
     *
     * @param int $id
     * @return User|null
     */
    public function getUserById(int $id): ?User;

    /**
     * Logout user
     *
     * @return bool
     */
    public function logout(): bool;

    /**
     * Validate user credentials
     *
     * @param string $username
     * @param string $password
     * @return bool
     */
    public function validateCredentials(string $username, string $password): bool;
}
