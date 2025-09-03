<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%personal_access_tokens}}`.
 */
class m250902_110712_create_personal_access_tokens_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp(): void
    {
        $this->createTable('{{%personal_access_tokens}}', [
            'id' => $this->primaryKey(),
            'user_id' => $this->integer()->notNull(),
            'name' => $this->string()->notNull(),
            'token' => $this->string(64)->notNull()->unique(),
            'abilities' => $this->text(),
            'expires_at' => $this->integer(),
            'last_used_at' => $this->integer(),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-personal_access_tokens-user_id',
            'personal_access_tokens',
            'user_id',
            'user',
            'id',
            'CASCADE'
        );

        $this->createIndex(
            'idx-personal_access_tokens-user_id',
            'personal_access_tokens',
            'user_id'
        );

        $this->createIndex(
            'idx-personal_access_tokens-token',
            'personal_access_tokens',
            'token'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): void
    {
        $this->dropTable('{{%personal_access_tokens}}');
    }
}
