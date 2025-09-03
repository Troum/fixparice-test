<?php

namespace app\services\contracts;

use app\models\Vacancy;
use yii\data\ActiveDataProvider;

interface VacancyServiceInterface
{
    /**
     * @param int $id
     * @return Vacancy|null
     */
    public function getById(int $id): ?Vacancy;

    /**
     * @param array $params
     * @return ActiveDataProvider
     */
    public function getList(array $params = []): ActiveDataProvider;

    /**
     * @param array $data
     * @return array
     */
    public function create(array $data): array;

    /**
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update(int $id, array $data): array;

    /**
     * @param int $id
     * @return array
     */
    public function delete(int $id): array;

    /**
     * @param array $criteria
     * @return array
     */
    public function search(array $criteria): array;

    /**
     * @return array
     */
    public function getStatistics(): array;
}
