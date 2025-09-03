<?php

namespace app\services\contracts;

use app\models\PersonalAccessToken;
use app\models\User;
use app\models\UserEntity;

interface TokenServiceInterface
{
    /**
     * Create a new personal access token for user
     *
     * @param UserEntity $user
     * @param string $name
     * @param array|null $abilities
     * @param int|null $expiresAt
     * @return array
     */
    public function createToken(UserEntity $user, string $name, ?array $abilities = null, ?int $expiresAt = null): array;

    /**
     * Find token by plain text token
     *
     * @param string $token
     * @return PersonalAccessToken|null
     */
    public function findToken(string $token): ?PersonalAccessToken;

    /**
     * Validate token and return associated user
     *
     * @param string $token
     * @param string|null $ability
     * @return UserEntity|null
     */
    public function validateToken(string $token, ?string $ability = null): ?UserEntity;

    /**
     * Revoke token
     *
     * @param string $token
     * @return bool
     */
    public function revokeToken(string $token): bool;

    /**
     * Revoke all tokens for user
     *
     * @param UserEntity $user
     * @return int
     */
    public function revokeAllTokens(UserEntity $user): int;

    /**
     * Revoke all tokens for user except current
     *
     * @param UserEntity $user
     * @param string $currentToken
     * @return int
     */
    public function revokeOtherTokens(UserEntity $user, string $currentToken): int;

    /**
     * Clean expired tokens
     *
     * @return int
     */
    public function cleanExpiredTokens(): int;
}
