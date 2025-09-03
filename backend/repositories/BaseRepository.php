<?php

namespace app\repositories;

use app\repositories\contracts\BaseRepositoryInterface;
use yii\data\ActiveDataProvider;
use yii\db\ActiveRecord;

abstract class BaseRepository implements BaseRepositoryInterface
{
    /**
     * @var string
     */
    protected string $modelClass;

    public function __construct()
    {
        if (!isset($this->modelClass)) {
            throw new \InvalidArgumentException('Необходима инициация модели');
        }
    }

    /**
     * {@inheritdoc}
     */
    public function findById(int $id): ?ActiveRecord
    {
        return $this->modelClass::findOne($id);
    }

    /**
     * {@inheritdoc}
     */
    public function findAll(): array
    {
        return $this->modelClass::find()->all();
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data): ActiveRecord
    {
        $model = new $this->modelClass();
        $model->load($data, '');

        if (!$model->save()) {
            throw new \RuntimeException('Failed to create model: ' . json_encode($model->errors));
        }

        return $model;
    }

    /**
     * {@inheritdoc}
     */
    public function update(ActiveRecord $model, array $data): bool
    {
        $model->load($data, '');
        return $model->save();
    }

    /**
     * {@inheritdoc}
     */
    public function delete(ActiveRecord $model): bool
    {
        return $model->delete() !== false;
    }

    /**
     * {@inheritdoc}
     */
    public function getDataProvider(array $params = []): ActiveDataProvider
    {
        return new ActiveDataProvider([
            'query' => $this->modelClass::find(),
            'pagination' => [
                'pageSize' => $params['perPage'] ?? 10,
                'pageParam' => 'page',
                'pageSizeParam' => 'perPage',
            ],
        ]);
    }
}
