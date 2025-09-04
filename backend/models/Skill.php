<?php

namespace app\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * Skill model
 * 
 * @property int $id
 * @property string $name
 * @property string|null $category
 * @property int $created_at
 * @property int $updated_at
 * 
 * @property VacancySkill[] $vacancySkills
 * @property Vacancy[] $vacancies
 */
class Skill extends ActiveRecord
{
    const CATEGORY_LANGUAGE = 'language';
    const CATEGORY_FRAMEWORK = 'framework';
    const CATEGORY_TOOL = 'tool';
    const CATEGORY_DATABASE = 'database';
    const CATEGORY_SOFT = 'soft';
    const CATEGORY_OTHER = 'other';

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%skill}}';
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
            [['name'], 'unique'],
            [['category'], 'string', 'max' => 50],
            [['category'], 'in', 'range' => [
                self::CATEGORY_LANGUAGE,
                self::CATEGORY_FRAMEWORK,
                self::CATEGORY_TOOL,
                self::CATEGORY_DATABASE,
                self::CATEGORY_SOFT,
                self::CATEGORY_OTHER,
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
            'category' => 'Категория',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancySkills()
    {
        return $this->hasMany(VacancySkill::class, ['skill_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancies()
    {
        return $this->hasMany(Vacancy::class, ['id' => 'vacancy_id'])
            ->viaTable('{{%vacancy_skill}}', ['skill_id' => 'id']);
    }

    /**
     * Получить список категорий
     * @return array
     */
    public static function getCategories(): array
    {
        return [
            self::CATEGORY_LANGUAGE => 'Языки программирования',
            self::CATEGORY_FRAMEWORK => 'Фреймворки',
            self::CATEGORY_TOOL => 'Инструменты',
            self::CATEGORY_DATABASE => 'Базы данных',
            self::CATEGORY_SOFT => 'Soft skills',
            self::CATEGORY_OTHER => 'Другое',
        ];
    }

    /**
     * Получить название категории
     * @return string
     */
    public function getCategoryName(): string
    {
        $categories = self::getCategories();
        return $categories[$this->category] ?? $this->category ?? 'Не указана';
    }
}
