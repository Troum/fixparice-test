<?php

namespace app\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * VacancyResponsibility model
 *
 * @property int $id
 * @property int $vacancy_id
 * @property string $title
 * @property string|null $description
 * @property int $sort_order
 * @property int $created_at
 * @property int $updated_at
 *
 * @property Vacancy $vacancy
 */
class VacancyResponsibility extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%vacancy_responsibility}}';
    }

    /**
     * @return array
     */
    public function behaviors(): array
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['vacancy_id', 'title'], 'required'],
            [['vacancy_id', 'sort_order'], 'integer'],
            [['title'], 'string', 'max' => 255],
            [['description'], 'string'],
            [['sort_order'], 'default', 'value' => 0],
            [['vacancy_id'], 'exist', 'targetClass' => Vacancy::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'vacancy_id' => 'Вакансия',
            'title' => 'Заголовок',
            'description' => 'Описание',
            'sort_order' => 'Порядок сортировки',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getVacancy(): ActiveQuery
    {
        return $this->hasOne(Vacancy::class, ['id' => 'vacancy_id']);
    }
}
