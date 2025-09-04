<?php

namespace app\models;

use yii\db\ActiveRecord;

/**
 * VacancyBenefit model
 * 
 * @property int $vacancy_id
 * @property int $benefit_id
 * @property string|null $value
 * @property string|null $description
 * 
 * @property Vacancy $vacancy
 * @property Benefit $benefit
 */
class VacancyBenefit extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%vacancy_benefit}}';
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['vacancy_id', 'benefit_id'], 'required'],
            [['vacancy_id', 'benefit_id'], 'integer'],
            [['value'], 'string', 'max' => 255],
            [['description'], 'string'],
            [['vacancy_id'], 'exist', 'targetClass' => Vacancy::class, 'targetAttribute' => 'id'],
            [['benefit_id'], 'exist', 'targetClass' => Benefit::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels(): array
    {
        return [
            'vacancy_id' => 'Вакансия',
            'benefit_id' => 'Льгота',
            'value' => 'Значение',
            'description' => 'Описание',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancy()
    {
        return $this->hasOne(Vacancy::class, ['id' => 'vacancy_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getBenefit()
    {
        return $this->hasOne(Benefit::class, ['id' => 'benefit_id']);
    }
}
