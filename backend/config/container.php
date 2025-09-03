<?php

use app\repositories\contracts\UserRepositoryInterface;
use app\repositories\contracts\VacancyRepositoryInterface;
use app\repositories\UserRepository;
use app\repositories\VacancyRepository;
use app\services\contracts\AuthServiceInterface;
use app\services\contracts\TokenServiceInterface;
use app\services\contracts\VacancyServiceInterface;
use app\services\AuthService;
use app\services\TokenService;
use app\services\VacancyService;

return [
    'definitions' => [
        VacancyRepositoryInterface::class => VacancyRepository::class,
        UserRepositoryInterface::class => UserRepository::class,

        VacancyServiceInterface::class => function($container) {
            return new VacancyService($container->get(VacancyRepositoryInterface::class));
        },
        AuthServiceInterface::class => function($container) {
            return new AuthService($container->get(UserRepositoryInterface::class));
        },
        TokenServiceInterface::class => TokenService::class,
    ],
    'singletons' => [
        VacancyRepositoryInterface::class => VacancyRepository::class,
        UserRepositoryInterface::class => UserRepository::class,
        VacancyServiceInterface::class => function($container) {
            return new VacancyService($container->get(VacancyRepositoryInterface::class));
        },
        AuthServiceInterface::class => function($container) {
            return new AuthService($container->get(UserRepositoryInterface::class));
        },
        TokenServiceInterface::class => TokenService::class,
    ],
];
