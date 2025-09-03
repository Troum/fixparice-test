<?php

namespace app\controllers;

use app\factories\ServiceFactory;
use app\models\UserEntity;
use yii\filters\Cors;
use yii\web\Controller;
use yii\web\Response;
use yii\web\UnauthorizedHttpException;
use Yii;

abstract class BaseApiController extends Controller
{
    public function behaviors(): array
    {
        return [
            'corsFilter' => [
                'class' => Cors::class,
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Allow-Headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
                    'Access-Control-Allow-Credentials' => false,
                    'Access-Control-Max-Age' => 86400,
                ],
            ],
        ];
    }

    public function init(): void
    {
        parent::init();

        Yii::$app->response->format = Response::FORMAT_JSON;
        Yii::$app->response->headers->set('Content-Type', 'application/json; charset=UTF-8');
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        Yii::$app->response->headers->set('Access-Control-Allow-Credentials', 'false');
        Yii::$app->response->headers->set('Access-Control-Max-Age', '86400');
    }

    public function actionOptions(): string
    {
        Yii::$app->response->headers->set('Access-Control-Allow-Origin', '*');
        Yii::$app->response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        Yii::$app->response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        return '';
    }

    public function beforeAction($action): bool
    {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    protected function validateBearerToken(): UserEntity
    {
        $token = $this->getBearerToken();
        
        if (!$token) {
            throw new UnauthorizedHttpException('Необходим токен аутентификации');
        }

        $tokenService = ServiceFactory::getTokenService();
        $user = $tokenService->validateToken($token);
        
        if (!$user) {
            throw new UnauthorizedHttpException('Недействительный токен аутентификации');
        }

        return $user;
    }

    protected function getBearerToken(): ?string
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