<?php

namespace app\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

/**
 * Location model
 * 
 * @property int $id
 * @property string $name
 * @property string|null $country
 * @property string|null $city
 * @property bool $remote_available
 * @property int $created_at
 * @property int $updated_at
 * 
 * @property Vacancy[] $vacancies
 */
class Location extends ActiveRecord
{
    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%location}}';
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
            [['name'], 'string', 'max' => 255],
            [['country', 'city'], 'string', 'max' => 100],
            [['remote_available'], 'boolean'],
            [['remote_available'], 'default', 'value' => false],
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
            'country' => 'Страна',
            'city' => 'Город',
            'remote_available' => 'Удаленная работа',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getVacancies()
    {
        return $this->hasMany(Vacancy::class, ['location_id' => 'id']);
    }

    /**
     * Получить полное название локации
     * @return string
     */
    public function getFullName(): string
    {
        $parts = array_filter([$this->city, $this->country]);
        $location = implode(', ', $parts);
        
        if ($this->remote_available) {
            $location = $location ? $location . ' / Remote' : 'Remote';
        }
        
        return $location ?: $this->name;
    }
}
