<?php

namespace app\models;

use Yii;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\behaviors\TimestampBehavior;

/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $token
 * @property string|null $abilities
 * @property int|null $expires_at
 * @property int|null $last_used_at
 * @property int $created_at
 * @property int $updated_at
 *
 * @property UserEntity $user
 */
class PersonalAccessToken extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return 'personal_access_tokens';
    }

    /**
     * {@inheritdoc}
     */
    public function behaviors(): array
    {
        return [
            TimestampBehavior::class,
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules(): array
    {
        return [
            [['user_id', 'name', 'token'], 'required'],
            [['user_id', 'expires_at', 'last_used_at'], 'integer'],
            [['name'], 'string', 'max' => 255],
            [['token'], 'string', 'max' => 64],
            [['abilities'], 'string'],
            [['token'], 'unique'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => UserEntity::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'user_id' => 'ID пользователя',
            'name' => 'Название',
            'token' => 'Токен',
            'abilities' => 'Права',
            'expires_at' => 'Срок действия до',
            'last_used_at' => 'Последнее использование',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return ActiveQuery
     */
    public function getUser(): ActiveQuery
    {
        return $this->hasOne(UserEntity::class, ['id' => 'user_id']);
    }

    /**
     * @return bool
     */
    public function isExpired(): bool
    {
        if ($this->expires_at === null) {
            return false;
        }

        return $this->expires_at < time();
    }

    /**
     * @param string $ability
     * @return bool
     */
    public function hasAbility(string $ability): bool
    {
        if ($this->abilities === null || $this->abilities === '*') {
            return true;
        }

        $abilities = json_decode($this->abilities, true) ?: [];
        return in_array($ability, $abilities) || in_array('*', $abilities);
    }

    /**
     * @return void
     */
    public function updateLastUsed(): void
    {
        $this->updateAttributes(['last_used_at' => time()]);
    }

    /**
     * @param string $token
     * @return PersonalAccessToken|null
     */
    public static function findByToken(string $token): ?PersonalAccessToken
    {
        return static::findOne(['token' => hash('sha256', $token)]);
    }
}
