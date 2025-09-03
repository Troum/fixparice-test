<?php

use yii\filters\Cors;
use yii\symfonymailer\Mailer;

$params = require __DIR__ . '/params.php';
$db     = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'container' => require __DIR__ . '/container.php',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
            'cookieValidationKey' => 'i7HpjRjvd_Se8f7SH63o1IQX66R3xIhU',
        ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => Mailer::class,
            'viewPath' => '@app/mail',
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                'GET health' => 'site/health',
                'POST api/v1/auth/login' => 'api/v1/auth-api/login',
                'POST api/v1/auth/logout' => 'api/v1/auth-api/logout',
                'POST api/v1/auth/logout-all' => 'api/v1/auth-api/logout-all',
                'POST api/v1/auth/refresh' => 'api/v1/auth-api/refresh',
                'GET api/v1/auth/me' => 'api/v1/auth-api/me',
                'GET api/v1/auth/tokens' => 'api/v1/auth-api/tokens',
                'OPTIONS api/v1/auth/<action:\w+>' => 'api/v1/auth-api/options',

                'GET api/v1/vacancies' => 'api/v1/vacancy-api/index',
                'GET api/v1/vacancies/<id:\d+>' => 'api/v1/vacancy-api/view',
                'POST api/v1/vacancies' => 'api/v1/vacancy-api/create',
                'PUT api/v1/vacancies/<id:\d+>' => 'api/v1/vacancy-api/update',
                'PATCH api/v1/vacancies/<id:\d+>' => 'api/v1/vacancy-api/update',
                'DELETE api/v1/vacancies/<id:\d+>' => 'api/v1/vacancy-api/delete',
                'GET api/v1/vacancies/search' => 'api/v1/vacancy-api/search',
                'GET api/v1/vacancies/stats' => 'api/v1/vacancy-api/stats',
                'OPTIONS api/v1/vacancies' => 'api/v1/vacancy-api/options',
                'OPTIONS api/v1/vacancies/<id:\d+>' => 'api/v1/vacancy-api/options',
                'OPTIONS api/v1/vacancies/<action:\w+>' => 'api/v1/vacancy-api/options',
            ],
        ],
    ],
    'as cors' => [
      'class' => Cors::class,
      'cors' => [
          'Origin' => ['*'],
          'Access-Control-Request-Method' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
          'Access-Control-Request-Headers' => ['*'],
          'Access-Control-Allow-Headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
          'Access-Control-Allow-Credentials' => false,
          'Access-Control-Max-Age' => 86400,
          'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page'],
          'Access-Control-Allow-Origin' => ['*'],
      ]
    ],
    'modules' => [
        'api' => [
            'class' => \app\modules\api\Module::class,
            'modules' => [
                'v1' => [
                    'class' => \app\modules\api\modules\v1\Module::class,
                ]
            ]
        ]
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];
}

return $config;
