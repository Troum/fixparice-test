<?php

namespace app\modules\api\modules\v1\controllers;

use app\controllers\BaseApiController;
use app\factories\ServiceFactory;
use app\filters\BearerAuthFilter;
use app\models\Vacancy;
use app\services\contracts\VacancyServiceInterface;
use Yii;
use yii\base\InvalidConfigException;
use yii\data\ActiveDataProvider;
use yii\db\Exception;
use yii\web\BadRequestHttpException;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

class VacancyApiController extends BaseApiController
{
    private VacancyServiceInterface $vacancyService;

    public function behaviors(): array
    {
        $behaviors = parent::behaviors();
        
        $behaviors['bearerAuth'] = [
            'class' => BearerAuthFilter::class,
            'except' => ['options'],
        ];
        
        return $behaviors;
    }

    public function init(): void
    {
        parent::init();
        $this->vacancyService = ServiceFactory::getVacancyService();
    }

    public function actionIndex(): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'viewVacancy')) {
            throw new ForbiddenHttpException('Недостаточно прав для просмотра вакансий');
        }

        $params = Yii::$app->request->get();
        $dataProvider = $this->vacancyService->getList($params);

        $expand = Yii::$app->request->get('expand', '');
        $expandFields = $expand ? explode(',', $expand) : [];

        $items = [];
        foreach ($dataProvider->getModels() as $model) {
            $item = $model->toArray([], $expandFields);
            $items[] = $item;
        }

        return [
            'items' => $items,
            'meta' => [
                'totalCount' => $dataProvider->getTotalCount(),
                'pageCount' => $dataProvider->getPagination()->getPageCount(),
                'currentPage' => $dataProvider->getPagination()->getPage() + 1,
                'perPage' => $dataProvider->getPagination()->getPageSize(),
            ],
            'links' => [
                'self' => Yii::$app->request->getUrl(),
                'first' => $dataProvider->getPagination()->createUrl(0),
                'last' => $dataProvider->getPagination()->createUrl($dataProvider->getPagination()->getPageCount() - 1),
            ]
        ];
    }

    public function actionView(int $id): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'viewVacancy')) {
            throw new ForbiddenHttpException('Недостаточно прав для просмотра вакансий');
        }

        $vacancy = $this->vacancyService->getById($id);

        if (!$vacancy) {
            throw new NotFoundHttpException('Вакансия не найдена');
        }

        $fields = Yii::$app->request->get('fields', '');
        $expand = Yii::$app->request->get('expand', '');

        if ($fields) {
            $fieldsList = explode(',', $fields);
            $result = [];
            foreach ($fieldsList as $field) {
                $field = trim($field);
                if ($vacancy->hasAttribute($field)) {
                    $result[$field] = $vacancy->$field;
                }
            }
            return $result;
        } else {
            $expandFields = $expand ? explode(',', $expand) : [];
            return $vacancy->toArray([], $expandFields);
        }
    }

    public function actionCreate(): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'createVacancy')) {
            throw new ForbiddenHttpException('Недостаточно прав для создания вакансий');
        }

        $data = Yii::$app->getRequest()->getBodyParams();
        $result = $this->vacancyService->create($data);

        if ($result['success']) {
            Yii::$app->response->setStatusCode(201);
            return [
                'id' => $result['data']['id'],
                'result' => 'success'
            ];
        }

        Yii::$app->response->setStatusCode(422);
        return [
            'result' => 'error',
            'errors' => $result['errors']
        ];
    }

    public function actionUpdate(int $id): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'updateVacancy')) {
            throw new ForbiddenHttpException('Недостаточно прав для редактирования вакансий');
        }

        $data = Yii::$app->getRequest()->getBodyParams();
        $result = $this->vacancyService->update($id, $data);

        if (!$result['success'] && in_array('Вакансия не найдена', $result['errors'])) {
            throw new NotFoundHttpException('Вакансия не найдена');
        }

        if ($result['success']) {
            return [
                'id' => $result['data']['id'],
                'result' => 'success'
            ];
        }

        Yii::$app->response->setStatusCode(422);
        return [
            'result' => 'error',
            'errors' => $result['errors']
        ];
    }

    public function actionDelete(int $id): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'deleteVacancy')) {
            throw new ForbiddenHttpException('Недостаточно прав для удаления вакансий');
        }

        $result = $this->vacancyService->delete($id);

        if (!$result['success'] && in_array('Вакансия не найдена', $result['errors'])) {
            throw new NotFoundHttpException('Вакансия не найдена');
        }

        if ($result['success']) {
            Yii::$app->response->setStatusCode(204);
            return [
                'result' => 'success',
                'message' => $result['data']['message']
            ];
        }

        Yii::$app->response->setStatusCode(500);
        return [
            'result' => 'error',
            'errors' => $result['errors']
        ];
    }

    public function actionSearch(): array
    {
        $criteria = Yii::$app->request->get();
        $vacancies = $this->vacancyService->search($criteria);

        return [
            'result' => 'success',
            'data' => $vacancies
        ];
    }

    public function actionStats(): array
    {
        $user = $this->validateBearerToken();
        
        if (!Yii::$app->authManager->checkAccess($user->id, 'viewStats')) {
            throw new ForbiddenHttpException('Недостаточно прав для просмотра статистики');
        }

        $result = $this->vacancyService->getStatistics();

        if ($result['success']) {
            return $result['data'];
        }

        Yii::$app->response->setStatusCode(500);
        return [
            'result' => 'error',
            'errors' => $result['errors']
        ];
    }
}