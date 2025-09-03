<?php

namespace app\models;

use Yii;
use yii\base\Exception;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;

/**
 * @property int $id
 * @property string $username
 * @property string $password_hash
 * @property string $auth_key
 * @property string $access_token
 * @property string $email
 * @property int $status
 * @property int $created_at
 * @property int $updated_at
 */
class UserEntity extends ActiveRecord implements IdentityInterface
{
    const int STATUS_INACTIVE = 0;
    const int STATUS_ACTIVE   = 1;

    /**
     * {@inheritdoc}
     */
    public static function tableName(): string
    {
        return '{{%user}}';
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
            [['username', 'email'], 'required'],
            [['status'], 'integer'],
            [['username', 'email'], 'string', 'max' => 255],
            [['username'], 'unique'],
            [['email'], 'email'],
            [['email'], 'unique'],
            [['password_hash', 'auth_key', 'access_token'], 'string', 'max' => 255],
            [['status'], 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_INACTIVE]],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentity($id): UserEntity|IdentityInterface|null
    {
        return static::findOne(['id' => $id, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * {@inheritdoc}
     */
    public static function findIdentityByAccessToken($token, $type = null): UserEntity|IdentityInterface|null
    {
        return static::findOne(['access_token' => $token, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * @param string $username
     * @return self|null
     */
    public static function findByUsername(string $username): ?self
    {
        return static::findOne(['username' => $username, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * {@inheritdoc}
     */
    public function getId()
    {
        return $this->getPrimaryKey();
    }

    /**
     * {@inheritdoc}
     */
    public function getAuthKey(): ?string
    {
        return $this->auth_key;
    }

    /**
     * {@inheritdoc}
     */
    public function validateAuthKey($authKey): ?bool
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * @param string $password
     * @return bool
     */
    public function validatePassword(string $password): bool
    {
        return Yii::$app->security->validatePassword($password, $this->password_hash);
    }

    /**
     * @param string $password
     * @return void
     * @throws Exception
     */
    public function setPassword(string $password): void
    {
        $this->password_hash = Yii::$app->security->generatePasswordHash($password);
    }

    /**
     * @return void
     * @throws Exception
     */
    public function generateAuthKey(): void
    {
        $this->auth_key = Yii::$app->security->generateRandomString();
    }

    /**
     * @return void
     * @throws Exception
     */
    public function generateAccessToken(): void
    {
        $this->access_token = Yii::$app->security->generateRandomString();
    }

    /**
     * @param string $email
     * @return self|null
     */
    public static function findByEmail(string $email): ?self
    {
        return static::findOne(['email' => $email, 'status' => self::STATUS_ACTIVE]);
    }

    /**
     * @return ActiveQuery
     */
    public function getPersonalAccessTokens(): ActiveQuery
    {
        return $this->hasMany(PersonalAccessToken::class, ['user_id' => 'id']);
    }

    /**
     * {@inheritdoc}
     */
    public function fields(): array
    {
        return [
            'id',
            'username',
            'email',
            'status',
            'created_at',
            'updated_at',
        ];
    }
}
