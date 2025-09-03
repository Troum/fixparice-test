<?php

namespace app\controllers;

use app\factories\ServiceFactory;
use app\services\contracts\AuthServiceInterface;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class SiteController extends Controller
{
    private AuthServiceInterface $authService;

    public function init(): void
    {
        parent::init();
        $this->authService = ServiceFactory::getAuthService();
    }

    public function behaviors(): array
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    public function actions(): array
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex(): Response|string
    {
        return $this->render('index');
    }

    public function actionHealth(): array
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        
        // Проверка подключения к базе данных
        try {
            Yii::$app->db->open();
            $dbStatus = 'ok';
        } catch (\Exception $e) {
            $dbStatus = 'error: ' . $e->getMessage();
        }
        
        return [
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
            'database' => $dbStatus,
            'version' => '1.0.0'
        ];
    }

    public function actionLogin(): Response|string
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post())) {
            $result = $this->authService->authenticate(
                $model->username,
                $model->password,
                $model->rememberMe
            );

            if ($result['success']) {
                return $this->goBack();
            }

            $model->addError('password', implode(', ', $result['errors']));
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    public function actionLogout(): Response|string
    {
        $this->authService->logout();
        return $this->goHome();
    }

    public function actionContact(): Response|string
    {
        $model = new ContactForm();
        if ($model->load(Yii::$app->request->post()) && $model->contact(Yii::$app->params['adminEmail'])) {
            Yii::$app->session->setFlash('contactFormSubmitted');
            return $this->refresh();
        }
        return $this->render('contact', [
            'model' => $model,
        ]);
    }

    public function actionAbout(): Response|string
    {
        return $this->render('about');
    }
}