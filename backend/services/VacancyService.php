<?php

namespace app\services;

use app\models\Vacancy;
use app\repositories\contracts\VacancyRepositoryInterface;
use app\services\contracts\VacancyServiceInterface;
use Exception;
use yii\data\ActiveDataProvider;

class VacancyService implements VacancyServiceInterface
{
    /**
     * @var VacancyRepositoryInterface
     */
    private VacancyRepositoryInterface $vacancyRepository;

    /**
     * @param VacancyRepositoryInterface $vacancyRepository
     */
    public function __construct(VacancyRepositoryInterface $vacancyRepository)
    {
        $this->vacancyRepository = $vacancyRepository;
    }

    /**
     * {@inheritdoc}
     */
    public function getById(int $id): ?Vacancy
    {
        return $this->vacancyRepository->findById($id);
    }

    /**
     * {@inheritdoc}
     */
    public function getList(array $params = []): ActiveDataProvider
    {
        return $this->vacancyRepository->getDataProvider($params);
    }

    /**
     * {@inheritdoc}
     */
    public function create(array $data): array
    {
        try {
            $vacancy = $this->vacancyRepository->create($data);

            return [
                'success' => true,
                'data' => [
                    'id' => $vacancy->id,
                    'message' => 'Вакансия успешно создана'
                ]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()]
            ];
        }
    }

    /**
     * {@inheritdoc}
     */
    public function update(int $id, array $data): array
    {
        try {
            $vacancy = $this->vacancyRepository->findById($id);

            if (!$vacancy) {
                return [
                    'success' => false,
                    'errors' => ['Вакансия не найдена']
                ];
            }

            $success = $this->vacancyRepository->update($vacancy, $data);

            if ($success) {
                return [
                    'success' => true,
                    'data' => [
                        'id' => $vacancy->id,
                        'message' => 'Вакансия успешно обновлена'
                    ]
                ];
            }

            return [
                'success' => false,
                'errors' => $vacancy->errors ?: ['Не удалось обновить вакансию']
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()]
            ];
        }
    }

    /**
     * {@inheritdoc}
     */
    public function delete(int $id): array
    {
        try {
            $vacancy = $this->vacancyRepository->findById($id);

            if (!$vacancy) {
                return [
                    'success' => false,
                    'errors' => ['Вакансия не найдена']
                ];
            }

            $success = $this->vacancyRepository->delete($vacancy);

            if ($success) {
                return [
                    'success' => true,
                    'data' => [
                        'message' => 'Вакансия успешно удалена'
                    ]
                ];
            }

            return [
                'success' => false,
                'errors' => ['Не удалось удалить вакансию']
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()]
            ];
        }
    }

    /**
     * {@inheritdoc}
     */
    public function search(array $criteria): array
    {
        $results = [];

        if (isset($criteria['title'])) {
            $results = array_merge($results, $this->vacancyRepository->findByTitle($criteria['title']));
        }

        if (isset($criteria['min_salary']) && isset($criteria['max_salary'])) {
            $results = array_merge($results, $this->vacancyRepository->findBySalaryRange(
                (int)$criteria['min_salary'],
                (int)$criteria['max_salary']
            ));
        }

        $uniqueResults = [];
        $ids = [];
        foreach ($results as $vacancy) {
            if (!in_array($vacancy->id, $ids)) {
                $uniqueResults[] = $vacancy;
                $ids[] = $vacancy->id;
            }
        }

        return $uniqueResults;
    }

    /**
     * {@inheritdoc}
     */
    public function getStatistics(): array
    {
        try {
            $stats = $this->vacancyRepository->getStatistics();

            return [
                'success' => true,
                'data' => $stats
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'errors' => [$e->getMessage()]
            ];
        }
    }
}
