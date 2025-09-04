<?php

namespace app\repositories;

use app\models\Vacancy;
use app\repositories\contracts\VacancyRepositoryInterface;
use Exception;
use Yii;
use yii\data\ActiveDataProvider;
use yii\db\ActiveRecord;

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
        return Vacancy::find()
            ->with(['location', 'skills', 'benefits', 'responsibilities'])
            ->where(['id' => $id])
            ->one();
    }

    /**
     * {@inheritdoc}
     * @throws \yii\db\Exception
     */
    public function create(array $data): Vacancy
    {
        $transaction = Yii::$app->db->beginTransaction();
        try {
            $vacancy = new Vacancy();

            // Основные данные вакансии
            $vacancy->setAttributes([
                'title' => $data['title'],
                'salary' => $data['salary'],
                'status' => $data['status'] ?? Vacancy::STATUS_ACTIVE,
                'location_id' => $data['location_id'] ?? null,
                'position_type' => $data['position_type'] ?? null,
                'experience_required' => $data['experience_required'] ?? null,
                'education_required' => $data['education_required'] ?? null,
                'description' => $data['description'] ?? null, // Tiptap content blocks
                // Информация о компании
                'company_name' => $data['company_name'] ?? null,
                'company_size' => $data['company_size'] ?? null,
                'company_industry' => $data['company_industry'] ?? null,
                'company_website' => $data['company_website'] ?? null,
                // Условия работы
                'work_schedule' => $data['work_schedule'] ?? null,
                'work_office' => $data['work_office'] ?? null,
                'team_size' => $data['team_size'] ?? null,
                // Дополнительная информация
                'probation_period' => $data['probation_period'] ?? null,
                'vacation_days' => $data['vacation_days'] ?? null,
                'growth_opportunities' => $data['growth_opportunities'] ?? null,
                'requirements_text' => $data['requirements_text'] ?? null,
            ]);

            if (!$vacancy->save()) {
                throw new Exception('Не удалось создать вакансию: ' . implode(', ', $vacancy->getFirstErrors()));
            }

            // Связанные данные
            $skills = $data['skills'] ?? [];
            $benefits = $data['benefits'] ?? [];
            $responsibilities = $data['responsibilities'] ?? [];

            if (!$vacancy->updateRelatedData($skills, $benefits, $responsibilities)) {
                throw new Exception('Не удалось сохранить связанные данные');
            }

            $transaction->commit();
            return $vacancy;
        } catch (Exception $e) {
            $transaction->rollBack();
            throw $e;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function update(ActiveRecord $model, array $data): bool
    {
        /** @var Vacancy $vacancy */
        $vacancy = $model;

        $transaction = Yii::$app->db->beginTransaction();
        try {
            // Основные данные вакансии
            $vacancy->setAttributes([
                'title' => $data['title'] ?? $vacancy->title,
                'salary' => $data['salary'] ?? $vacancy->salary,
                'status' => $data['status'] ?? $vacancy->status,
                'location_id' => $data['location_id'] ?? $vacancy->location_id,
                'position_type' => $data['position_type'] ?? $vacancy->position_type,
                'experience_required' => $data['experience_required'] ?? $vacancy->experience_required,
                'education_required' => $data['education_required'] ?? $vacancy->education_required,
                'description' => $data['description'] ?? $vacancy->description, // Tiptap content blocks
                // Информация о компании
                'company_name' => $data['company_name'] ?? $vacancy->company_name,
                'company_size' => $data['company_size'] ?? $vacancy->company_size,
                'company_industry' => $data['company_industry'] ?? $vacancy->company_industry,
                'company_website' => $data['company_website'] ?? $vacancy->company_website,
                // Условия работы
                'work_schedule' => $data['work_schedule'] ?? $vacancy->work_schedule,
                'work_office' => $data['work_office'] ?? $vacancy->work_office,
                'team_size' => $data['team_size'] ?? $vacancy->team_size,
                // Дополнительная информация
                'probation_period' => $data['probation_period'] ?? $vacancy->probation_period,
                'vacation_days' => $data['vacation_days'] ?? $vacancy->vacation_days,
                'growth_opportunities' => $data['growth_opportunities'] ?? $vacancy->growth_opportunities,
                'requirements_text' => $data['requirements_text'] ?? $vacancy->requirements_text,
            ]);

            if (!$vacancy->save()) {
                throw new Exception('Не удалось обновить вакансию: ' . implode(', ', $vacancy->getFirstErrors()));
            }

            // Связанные данные (если переданы)
            if (isset($data['skills']) || isset($data['benefits']) || isset($data['responsibilities'])) {
                $skills = $data['skills'] ?? [];
                $benefits = $data['benefits'] ?? [];
                $responsibilities = $data['responsibilities'] ?? [];

                if (!$vacancy->updateRelatedData($skills, $benefits, $responsibilities)) {
                    throw new Exception('Не удалось обновить связанные данные');
                }
            }

            $transaction->commit();
            return true;
        } catch (Exception $e) {
            $transaction->rollBack();
            return false;
        }
    }

    /**
     * {@inheritdoc}
     */
    public function getDataProvider(array $params = []): ActiveDataProvider
    {
        $query = Vacancy::find()->with(['location']);

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
