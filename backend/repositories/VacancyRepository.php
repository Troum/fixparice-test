<?php

namespace app\repositories;

use app\models\Vacancy;
use app\repositories\contracts\VacancyRepositoryInterface;
use Yii;
use yii\data\ActiveDataProvider;

class VacancyRepository extends BaseRepository implements VacancyRepositoryInterface
{
    /**
     * @var string
     */
    protected string $modelClass = Vacancy::class;

    /**
     * {@inheritdoc}
     */
    public function findById(int $id): ?Vacancy
    {
        return parent::findById($id);
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data): Vacancy
    {
        return parent::create($data);
    }

    /**
     * {@inheritdoc}
     */
    public function getDataProvider(array $params = []): ActiveDataProvider
    {
        $query = Vacancy::find();

        return new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => (int)($params['perPage'] ?? Yii::$app->request->get('perPage', 10)),
                'pageParam' => 'page',
                'pageSizeParam' => 'perPage',
            ],
            'sort' => [
                'params' => $params ?: Yii::$app->request->get(),
                'sortParam' => 'sort',
                'attributes' => [
                    'salary' => [
                        'asc' => [
                            'salary' => SORT_ASC
                        ],
                        'desc' => [
                            'salary' => SORT_DESC
                        ],
                    ],
                    'created_at' => [
                        'asc' => [
                            'created_at' => SORT_ASC
                        ],
                        'desc' => [
                            'created_at' => SORT_DESC
                        ],
                    ]
                ],
                'defaultOrder' => [
                    'created_at' => SORT_DESC
                ],
            ]
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function findBySalaryRange(int $minSalary, int $maxSalary): array
    {
        return Vacancy::find()
            ->andWhere(['>=', 'salary', $minSalary])
            ->andWhere(['<=', 'salary', $maxSalary])
            ->all();
    }

    /**
     * {@inheritdoc}
     */
    public function findByTitle(string $title): array
    {
        return Vacancy::find()
            ->andWhere(['like', 'title', $title])
            ->all();
    }

    /**
     * {@inheritdoc}
     */
    public function getStatistics(): array
    {
        $total = Vacancy::find()->count();
        $active = Vacancy::find()->andWhere(['status' => Vacancy::STATUS_ACTIVE])->count();
        $archived = Vacancy::find()->andWhere(['status' => Vacancy::STATUS_ARCHIVED])->count();

        $startOfMonth = mktime(0, 0, 0, date('m'), 1, date('Y'));
        $thisMonth = Vacancy::find()
            ->andWhere(['>=', 'created_at', $startOfMonth])
            ->count();

        return [
            'total' => (int)$total,
            'active' => (int)$active,
            'archived' => (int)$archived,
            'this_month' => (int)$thisMonth,
        ];
    }
}
