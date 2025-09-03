<?php

namespace app\repositories\contracts;

use app\models\Vacancy;
use yii\data\ActiveDataProvider;

interface VacancyRepositoryInterface extends BaseRepositoryInterface
{
    /**
     * @param int $id
     * @return Vacancy|null
     */
    public function findById(int $id): ?Vacancy;

    /**
     * @param array $data
     * @return Vacancy
     */
    public function create(array $data): Vacancy;

    /**
     * @param array $params
     * @return ActiveDataProvider
     */
    public function getDataProvider(array $params = []): ActiveDataProvider;

    /**
     * @param int $minSalary
     * @param int $maxSalary
     * @return array
     */
    public function findBySalaryRange(int $minSalary, int $maxSalary): array;

    /**
     * @param string $title
     * @return array
     */
    public function findByTitle(string $title): array;

    /**
     * @return array
     */
    public function getStatistics(): array;
}
