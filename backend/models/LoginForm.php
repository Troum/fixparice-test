<?php

namespace app\models;

use Yii;
use yii\base\Model;

/**
 * @property-read User|null $user
 */
class LoginForm extends Model
{
    public ?string $username = null;
    public ?string $password = null;
    public bool $rememberMe = true;

    private ?User $_user = null;


    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            [['username', 'password'], 'required'],
            ['rememberMe', 'boolean'],
            ['password', 'validatePassword'],
        ];
    }

    /**
     * @param string $attribute
     * @param array $params
     * @return void
     */
    public function validatePassword(string $attribute, array $params): void
    {
    }
}
