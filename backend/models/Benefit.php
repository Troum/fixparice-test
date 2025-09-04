<?php

namespace app\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * Benefit model
 * 
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string|null $type
 * @property int $created_at
 * @property int $updated_at
 * 
 * @property VacancyBenefit[] $vacancyBenefits
 * @property Vacancy[] $vacancies
 */
class Benefit extends ActiveRecord
{
    const TYPE_INSURANCE = 'insurance';
    const TYPE_MONETARY = 'monetary';
    const TYPE_TIME = 'time';
    const TYPE_EQUIPMENT = 'equipment';
    const TYPE_DEVELOPMENT = 'development';
    const TYPE_WELLNESS = 'wellness';
    const TYPE_OTHER = 'other';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%benefit}}';
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
            [['name'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['description'], 'string'],
            [['type'], 'string', 'max' => 50],
            [['type'], 'in', 'range' => [
                self::TYPE_INSURANCE,
                self::TYPE_MONETARY,
                self::TYPE_TIME,
                self::TYPE_EQUIPMENT,
                self::TYPE_DEVELOPMENT,
                self::TYPE_WELLNESS,
                self::TYPE_OTHER,
            ]],
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'description' => 'Описание',
            'type' => 'Тип',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancyBenefits()
    {
        return $this->hasMany(VacancyBenefit::class, ['benefit_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancies()
    {
        return $this->hasMany(Vacancy::class, ['id' => 'vacancy_id'])
            ->viaTable('{{%vacancy_benefit}}', ['benefit_id' => 'id']);
    }

    /**
     * Получить список типов льгот
     * @return array
     */
    public static function getTypes(): array
    {
        return [
            self::TYPE_INSURANCE => 'Страхование',
            self::TYPE_MONETARY => 'Денежные',
            self::TYPE_TIME => 'Время',
            self::TYPE_EQUIPMENT => 'Оборудование',
            self::TYPE_DEVELOPMENT => 'Развитие',
            self::TYPE_WELLNESS => 'Здоровье',
            self::TYPE_OTHER => 'Другое',
        ];
    }

    /**
     * Получить название типа льготы
     * @return string
     */
    public function getTypeName(): string
    {
        $types = self::getTypes();
        return $types[$this->type] ?? $this->type ?? 'Не указан';
    }
}
