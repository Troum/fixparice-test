<?php

namespace app\modules\api\modules\v1\controllers;

use app\controllers\BaseApiController;
use app\models\Benefit;
use yii\web\NotFoundHttpException;

class BenefitApiController extends BaseApiController
{
    public function actionIndex(): array
    {
        $type = \Yii::$app->request->get('type');
        
        $query = Benefit::find()->orderBy(['type' => SORT_ASC, 'name' => SORT_ASC]);
        
        if ($type) {
            $query->andWhere(['type' => $type]);
        }
        
        $benefits = $query->all();
        
        return [
            'items' => array_map(function($benefit) {
                return [
                    'id' => $benefit->id,
                    'name' => $benefit->name,
                    'description' => $benefit->description,
                    'type' => $benefit->type,
                    'type_name' => $benefit->getTypeName(),
                ];
            }, $benefits),
            'types' => Benefit::getTypes(),
        ];
    }

    public function actionView(int $id): array
    {
        $benefit = Benefit::findOne($id);
        
        if (!$benefit) {
            throw new NotFoundHttpException('Льгота не найдена');
        }
        
        return [
            'id' => $benefit->id,
            'name' => $benefit->name,
            'description' => $benefit->description,
            'type' => $benefit->type,
            'type_name' => $benefit->getTypeName(),
            'vacancies_count' => $benefit->getVacancies()->count(),
        ];
    }

    public function actionTypes(): array
    {
        return [
            'types' => Benefit::getTypes()
        ];
    }
}
