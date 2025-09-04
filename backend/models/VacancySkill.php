<?php

namespace app\models;

use yii\db\ActiveRecord;

/**
 * VacancySkill model
 * 
 * @property int $vacancy_id
 * @property int $skill_id
 * @property bool $required
 * @property string|null $level
 * 
 * @property Vacancy $vacancy
 * @property Skill $skill
 */
class VacancySkill extends ActiveRecord
{
    const LEVEL_JUNIOR = 'junior';
    const LEVEL_MIDDLE = 'middle';
    const LEVEL_SENIOR = 'senior';
    const LEVEL_LEAD = 'lead';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%vacancy_skill}}';
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['vacancy_id', 'skill_id'], 'required'],
            [['vacancy_id', 'skill_id'], 'integer'],
            [['required'], 'boolean'],
            [['required'], 'default', 'value' => true],
            [['level'], 'string', 'max' => 50],
            [['level'], 'in', 'range' => [
                self::LEVEL_JUNIOR,
                self::LEVEL_MIDDLE,
                self::LEVEL_SENIOR,
                self::LEVEL_LEAD,
            ]],
            [['vacancy_id'], 'exist', 'targetClass' => Vacancy::class, 'targetAttribute' => 'id'],
            [['skill_id'], 'exist', 'targetClass' => Skill::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels(): array
    {
        return [
            'vacancy_id' => 'Вакансия',
            'skill_id' => 'Навык',
            'required' => 'Обязательный',
            'level' => 'Уровень',
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
    public function getSkill()
    {
        return $this->hasOne(Skill::class, ['id' => 'skill_id']);
    }

    /**
     * Получить список уровней
     * @return array
     */
    public static function getLevels(): array
    {
        return [
            self::LEVEL_JUNIOR => 'Junior',
            self::LEVEL_MIDDLE => 'Middle',
            self::LEVEL_SENIOR => 'Senior',
            self::LEVEL_LEAD => 'Lead',
        ];
    }

    /**
     * Получить название уровня
     * @return string
     */
    public function getLevelName(): string
    {
        $levels = self::getLevels();
        return $levels[$this->level] ?? $this->level ?? 'Не указан';
    }
}
