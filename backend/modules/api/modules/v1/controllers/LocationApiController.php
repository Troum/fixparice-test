<?php

namespace app\modules\api\modules\v1\controllers;

use app\controllers\BaseApiController;
use app\models\Location;
use yii\web\NotFoundHttpException;

class LocationApiController extends BaseApiController
{
    public function actionIndex(): array
    {
        $locations = Location::find()->all();
        
        return [
            'items' => array_map(function($location) {
                return [
                    'id' => $location->id,
                    'name' => $location->name,
                    'full_name' => $location->getFullName(),
                    'country' => $location->country,
                    'city' => $location->city,
                    'remote_available' => (bool)$location->remote_available,
                ];
            }, $locations)
        ];
    }

    public function actionView(int $id): array
    {
        $location = Location::findOne($id);
        
        if (!$location) {
            throw new NotFoundHttpException('Локация не найдена');
        }
        
        return [
            'id' => $location->id,
            'name' => $location->name,
            'full_name' => $location->getFullName(),
            'country' => $location->country,
            'city' => $location->city,
            'remote_available' => (bool)$location->remote_available,
            'vacancies_count' => $location->getVacancies()->count(),
        ];
    }
}
