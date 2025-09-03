<?php

namespace app\repositories\contracts;

use yii\data\ActiveDataProvider;
use yii\db\ActiveRecord;

interface BaseRepositoryInterface
{
    /**
     * @param int $id
     * @return ActiveRecord|null
     */
    public function findById(int $id): ?ActiveRecord;

    /**
     * @return array
     */
    public function findAll(): array;

    /**
     * @param array $data
     * @return ActiveRecord
     */
    public function create(array $data): ActiveRecord;

    /**
     * @param ActiveRecord $model
     * @param array $data
     * @return bool
     */
    public function update(ActiveRecord $model, array $data): bool;

    /**
     * @param ActiveRecord $model
     * @return bool
     */
    public function delete(ActiveRecord $model): bool;

    /**
     * @param array $params
     * @return ActiveDataProvider
     */
    public function getDataProvider(array $params = []): ActiveDataProvider;
}
