<?php

namespace app\models;

use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;

class Vacancy extends ActiveRecord
{
    const int STATUS_ACTIVE   = 1;
    const int STATUS_ARCHIVED = 0;

    /**
     * @return string
     */
    public static function tableName(): string
    {
        return '{{%vacancy}}';
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
            [['title', 'salary'], 'required'],
            [['description'], 'string'],
            [['salary', 'status'], 'integer'],
            [['salary'], 'integer', 'min' => 0],
            [['title'], 'string', 'max' => 255],
            [['status'], 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_ARCHIVED]],
            [['status'], 'default', 'value' => self::STATUS_ACTIVE],
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
          'id', 'title', 'description', 'salary', 'status',
        ];
    }

    /**
     * @return array
     */
    public function extraFields(): array
    {
        return ['created_at', 'updated_at'];
    }
}
