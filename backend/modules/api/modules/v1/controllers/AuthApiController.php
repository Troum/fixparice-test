<?php

namespace app\modules\api\modules\v1\controllers;

use app\controllers\BaseApiController;
use app\factories\ServiceFactory;
use app\services\contracts\AuthServiceInterface;
use app\services\contracts\TokenServiceInterface;
use Yii;
use yii\base\InvalidConfigException;
use yii\web\BadRequestHttpException;
use yii\web\UnauthorizedHttpException;

class AuthApiController extends BaseApiController
{
    private AuthServiceInterface $authService;
    private TokenServiceInterface $tokenService;

    const int|float DEFAULT_TOKEN_EXPIRATION = 30 * 24 * 60 * 60;

    public function init(): void
    {
        parent::init();
        $this->authService = ServiceFactory::getAuthService();
        $this->tokenService = ServiceFactory::getTokenService();
    }

    /**
     * @return array|string[]
     * @throws BadRequestHttpException
     * @throws InvalidConfigException
     */
    public function actionLogin(): array
    {
        $data = Yii::$app->request->getBodyParams();

        if (empty($data['email']) || empty($data['password'])) {
            throw new BadRequestHttpException('Требуются email и пароль');
        }

        $user = $this->authService->authenticateForToken($data['email'], $data['password']);

        if (!$user) {
            Yii::$app->response->setStatusCode(401);
            return [
                'result' => 'error',
                'message' => 'Неверные учетные данные'
            ];
        }

        $tokenName = $data['device_name'] ?? 'API токен';
        $expiresAt = isset($data['expires_in']) ? time() + $data['expires_in'] : time() + self::DEFAULT_TOKEN_EXPIRATION;

        $tokenData = $this->tokenService->createToken($user, $tokenName, ['*'], $expiresAt);

        $roles = Yii::$app->authManager->getRolesByUser($user->id);
        $permissions = Yii::$app->authManager->getPermissionsByUser($user->id);

        return [
            'result' => 'success',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'username' => $user->username,
                    'status' => $user->status,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'roles' => array_keys($roles),
                    'permissions' => array_keys($permissions),
                ],
                'access_token' => $tokenData['accessToken'],
                'token_type' => 'Bearer',
                'expires_at' => $tokenData['token']->expires_at,
            ]
        ];
    }

    /**
     * @return string[]
     * @throws UnauthorizedHttpException
     */
    public function actionLogout(): array
    {
        $token = $this->getBearerToken();

        if (!$token) {
            throw new UnauthorizedHttpException('Необходим токен аутентификации');
        }

        $revoked = $this->tokenService->revokeToken($token);

        if (!$revoked) {
            return [
                'result' => 'error',
                'message' => 'Токен не найден'
            ];
        }

        return [
            'result' => 'success',
            'message' => 'Успешно вышли из системы'
        ];
    }

    /**
     * @return string[]
     * @throws UnauthorizedHttpException
     */
    public function actionLogoutAll(): array
    {
        $user = $this->validateBearerToken();
        $revokedCount = $this->tokenService->revokeAllTokens($user);

        return [
            'result' => 'success',
            'message' => "Отозваны {$revokedCount} токенов"
        ];
    }

    /**
     * @return array
     * @throws UnauthorizedHttpException
     */
    public function actionMe(): array
    {
        $user = $this->validateBearerToken();

        $roles = Yii::$app->authManager->getRolesByUser($user->id);
        $permissions = Yii::$app->authManager->getPermissionsByUser($user->id);

        return [
            'result' => 'success',
            'data' => [
                'id' => $user->id,
                'email' => $user->email,
                'username' => $user->username,
                'status' => $user->status,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
                'roles' => array_keys($roles),
                'permissions' => array_keys($permissions),
            ]
        ];
    }

    /**
     * @return array
     * @throws InvalidConfigException
     * @throws UnauthorizedHttpException
     */
    public function actionRefresh(): array
    {
        $oldToken = $this->getBearerToken();

        if (!$oldToken) {
            throw new UnauthorizedHttpException('Необходим токен аутентификации');
        }

        $user = $this->validateBearerToken();

        $data = Yii::$app->request->getBodyParams();
        $tokenName = $data['device_name'] ?? 'Обновленный API токен';
        $expiresAt = isset($data['expires_in']) ? time() + $data['expires_in'] : time() + self::DEFAULT_TOKEN_EXPIRATION;

        $tokenData = $this->tokenService->createToken($user, $tokenName, ['*'], $expiresAt);

        $this->tokenService->revokeToken($oldToken);

        return [
            'result' => 'success',
            'data' => [
                'access_token' => $tokenData['accessToken'],
                'token_type' => 'Bearer',
                'expires_at' => $tokenData['token']->expires_at,
            ]
        ];
    }

    /**
     * @return array
     * @throws UnauthorizedHttpException
     */
    public function actionTokens(): array
    {
        $user = $this->validateBearerToken();
        $tokens = $user->getPersonalAccessTokens()->all();

        $tokensData = array_map(function($token) {
            return [
                'id' => $token->id,
                'name' => $token->name,
                'abilities' => $token->abilities,
                'last_used_at' => $token->last_used_at,
                'expires_at' => $token->expires_at,
                'created_at' => $token->created_at,
            ];
        }, $tokens);

        return [
            'result' => 'success',
            'data' => $tokensData
        ];
    }
}
