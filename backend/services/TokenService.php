<?php

namespace app\services;

use app\models\PersonalAccessToken;
use app\models\UserEntity;
use app\services\contracts\TokenServiceInterface;
use Throwable;
use Yii;
use yii\base\Exception;
use \yii\db\Exception as DbException;
use yii\db\StaleObjectException;

class TokenService implements TokenServiceInterface
{
    /**
     * @param UserEntity $user
     * @param string $name
     * @param array|null $abilities
     * @param int|null $expiresAt
     * @return array
     * @throws Exception
     * @throws DbException
     */
    public function createToken(UserEntity $user, string $name, ?array $abilities = null, ?int $expiresAt = null): array
    {
        $plainTextToken = $this->generateToken();
        $hashedToken = hash('sha256', $plainTextToken);

        $token = new PersonalAccessToken([
            'user_id' => $user->id,
            'name' => $name,
            'token' => $hashedToken,
            'abilities' => $abilities ? json_encode($abilities) : '*',
            'expires_at' => $expiresAt,
        ]);

        if (!$token->save()) {
            throw new Exception('Failed to create token: ' . json_encode($token->errors));
        }

        return [
            'token' => $token,
            'plainTextToken' => $plainTextToken,
            'accessToken' => $plainTextToken,
        ];
    }

    /**
     * @param string $token
     * @return PersonalAccessToken|null
     */
    public function findToken(string $token): ?PersonalAccessToken
    {
        return PersonalAccessToken::findByToken($token);
    }

    /**
     * @param string $token
     * @param string|null $ability
     * @return UserEntity|null
     */
    public function validateToken(string $token, ?string $ability = null): ?UserEntity
    {
        $accessToken = $this->findToken($token);

        if (!$accessToken || $accessToken->isExpired()) {
            return null;
        }

        if ($ability && !$accessToken->hasAbility($ability)) {
            return null;
        }

        $accessToken->updateLastUsed();

        return $accessToken->user;
    }

    /**
     * @param string $token
     * @return bool
     * @throws Throwable
     * @throws StaleObjectException
     */
    public function revokeToken(string $token): bool
    {
        $accessToken = $this->findToken($token);

        if (!$accessToken) {
            return false;
        }

        return $accessToken->delete() !== false;
    }

    /**
     * @param UserEntity $user
     * @return int
     */
    public function revokeAllTokens(UserEntity $user): int
    {
        return PersonalAccessToken::deleteAll(['user_id' => $user->id]);
    }

    /**
     * @param UserEntity $user
     * @param string $currentToken
     * @return int
     */
    public function revokeOtherTokens(UserEntity $user, string $currentToken): int
    {
        $currentAccessToken = $this->findToken($currentToken);

        if (!$currentAccessToken) {
            return 0;
        }

        return PersonalAccessToken::deleteAll([
            'and',
            ['user_id' => $user->id],
            ['!=', 'id', $currentAccessToken->id]
        ]);
    }

    /**
     * @return string
     * @throws Exception
     */
    private function generateToken(): string
    {
        return bin2hex(Yii::$app->security->generateRandomKey(32));
    }

    /**
     * @return int
     */
    public function cleanExpiredTokens(): int
    {
        return PersonalAccessToken::deleteAll([
            'and',
            ['is not', 'expires_at', null],
            ['<', 'expires_at', time()]
        ]);
    }
}
