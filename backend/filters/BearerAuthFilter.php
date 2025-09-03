<?php

namespace app\filters;

use app\services\contracts\TokenServiceInterface;
use app\factories\ServiceFactory;
use Yii;
use yii\base\ActionFilter;
use yii\web\UnauthorizedHttpException;

/**
 * Bearer Authentication Filter
 * Validates Bearer tokens from Authorization header
 */
class BearerAuthFilter extends ActionFilter
{
    /**
     * @var TokenServiceInterface
     */
    private TokenServiceInterface $tokenService;

    /**
     * @var string|null Required ability for accessing the action
     */
    public ?string $ability = null;

    /**
     * {@inheritdoc}
     */
    public function init(): void
    {
        parent::init();
        $this->tokenService = ServiceFactory::getTokenService();
    }

    /**
     * {@inheritdoc}
     */
    public function beforeAction($action): bool
    {
        // Set CORS headers before any processing
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        Yii::$app->response->headers->set('Access-Control-Allow-Credentials', 'false');

        // Skip authentication for excluded actions (using parent's $except property)
        if (is_array($this->except) && in_array($action->id, $this->except)) {
            return parent::beforeAction($action);
        }

        $token = $this->getBearerToken();
        
        if (!$token) {
            throw new UnauthorizedHttpException('Bearer token is required');
        }

        $user = $this->tokenService->validateToken($token, $this->ability);
        
        if (!$user) {
            throw new UnauthorizedHttpException('Invalid or expired token');
        }

        // Set authenticated user
        Yii::$app->user->setIdentity($user);

        return parent::beforeAction($action);
    }

    /**
     * Extract Bearer token from Authorization header
     *
     * @return string|null
     */
    private function getBearerToken(): ?string
    {
        $authHeader = Yii::$app->request->getHeaders()->get('Authorization');
        
        if (!$authHeader) {
            return null;
        }

        if (preg_match('/^Bearer\s+(.*)$/i', $authHeader, $matches)) {
            return $matches[1];
        }

        return null;
    }
}
