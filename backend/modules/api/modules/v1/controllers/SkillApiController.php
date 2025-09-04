<?php

namespace app\modules\api\modules\v1\controllers;

use app\controllers\BaseApiController;
use app\models\Skill;
use yii\web\NotFoundHttpException;

class SkillApiController extends BaseApiController
{
    public function actionIndex(): array
    {
        $category = \Yii::$app->request->get('category');
        
        $query = Skill::find()->orderBy(['category' => SORT_ASC, 'name' => SORT_ASC]);
        
        if ($category) {
            $query->andWhere(['category' => $category]);
        }
        
        $skills = $query->all();
        
        return [
            'items' => array_map(function($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                    'category' => $skill->category,
                    'category_name' => $skill->getCategoryName(),
                ];
            }, $skills),
            'categories' => Skill::getCategories(),
        ];
    }

    public function actionView(int $id): array
    {
        $skill = Skill::findOne($id);
        
        if (!$skill) {
            throw new NotFoundHttpException('Навык не найден');
        }
        
        return [
            'id' => $skill->id,
            'name' => $skill->name,
            'category' => $skill->category,
            'category_name' => $skill->getCategoryName(),
            'vacancies_count' => $skill->getVacancies()->count(),
        ];
    }

    public function actionCategories(): array
    {
        return [
            'categories' => Skill::getCategories()
        ];
    }
}
