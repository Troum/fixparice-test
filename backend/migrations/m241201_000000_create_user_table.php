<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%user}}`.
 */
class m241201_000000_create_user_table extends Migration
{
    /**
     * @return void
     * @throws \yii\base\Exception
     */
    public function safeUp(): void
    {
        $this->createTable('{{%user}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string()->notNull()->unique(),
            'email' => $this->string()->notNull()->unique(),
            'password_hash' => $this->string()->notNull(),
            'auth_key' => $this->string(32)->notNull(),
            'access_token' => $this->string()->null(),
            'status' => $this->smallInteger()->notNull()->defaultValue(1),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->createIndex('idx-user-username', '{{%user}}', 'username');
        $this->createIndex('idx-user-email', '{{%user}}', 'email');
        $this->createIndex('idx-user-access_token', '{{%user}}', 'access_token');
        $this->createIndex('idx-user-status', '{{%user}}', 'status');

        $this->insert('{{%user}}', [
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password_hash' => Yii::$app->security->generatePasswordHash('admin'),
            'auth_key' => Yii::$app->security->generateRandomString(),
            'access_token' => '100-token',
            'status' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ]);

        $this->insert('{{%user}}', [
            'username' => 'demo',
            'email' => 'demo@example.com',
            'password_hash' => Yii::$app->security->generatePasswordHash('demo'),
            'auth_key' => Yii::$app->security->generateRandomString(),
            'access_token' => '101-token',
            'status' => 1,
            'created_at' => time(),
            'updated_at' => time(),
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): void
    {
        $this->dropTable('{{%user}}');
    }
}
