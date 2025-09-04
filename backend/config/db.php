<?php
if (YII_ENV_DEV) {
    return [
        'class'    => 'yii\db\Connection',
        'dsn'      => 'mysql:host=127.0.0.1;dbname=jobs;charset=utf8mb4',
        'username' => 'jobs',
        'password' => 'jobs',
        'charset'  => 'utf8mb4',

        // Schema cache options (for production environment)
        //'enableSchemaCache' => true,
        //'schemaCacheDuration' => 60,
        //'schemaCache' => 'cache',
    ];
}
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=vacancy_db',
    'username' => 'vacancy_user',
    'password' => '!1029QPwo!',
    'charset' => 'utf8mb4',
    'attributes' => [
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_EMULATE_PREPARES => false,
    ],

    // Schema cache options (for production environment)
    'enableSchemaCache' => true,
    'schemaCacheDuration' => 60,
    'schemaCache' => 'cache',
];
