<?php

namespace app\factories;

use app\repositories\UserRepository;
use app\repositories\VacancyRepository;
use app\services\AuthService;
use app\services\contracts\AuthServiceInterface;
use app\services\contracts\TokenServiceInterface;
use app\services\contracts\VacancyServiceInterface;
use app\services\TokenService;
use app\services\VacancyService;

class ServiceFactory
{
    /**
     * @var VacancyServiceInterface|null
     */
    private static ?VacancyServiceInterface $vacancyService = null;

    /**
     * @var AuthServiceInterface|null
     */
    private static ?AuthServiceInterface $authService = null;

    /**
     * @var TokenServiceInterface|null
     */
    private static ?TokenServiceInterface $tokenService = null;

    /**
     * Get VacancyService instance
     *
     * @return VacancyServiceInterface
     */
    public static function getVacancyService(): VacancyServiceInterface
    {
        if (self::$vacancyService === null) {
            $vacancyRepository = new VacancyRepository();
            self::$vacancyService = new VacancyService($vacancyRepository);
        }

        return self::$vacancyService;
    }

    /**
     * Get AuthService instance
     *
     * @return AuthServiceInterface
     */
    public static function getAuthService(): AuthServiceInterface
    {
        if (self::$authService === null) {
            $userRepository = new UserRepository();
            self::$authService = new AuthService($userRepository);
        }

        return self::$authService;
    }

    /**
     * Get TokenService instance
     *
     * @return TokenServiceInterface
     */
    public static function getTokenService(): TokenServiceInterface
    {
        if (self::$tokenService === null) {
            self::$tokenService = new TokenService();
        }

        return self::$tokenService;
    }
}
