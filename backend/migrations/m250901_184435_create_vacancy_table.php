<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%vacancy}}`.
 */
class m250901_184435_create_vacancy_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp(): void
    {
        $this->createTable('{{%vacancy}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(255)->notNull()->comment('Название'),
            'description' => $this->text()->comment('Описание'),
            'salary' => $this->integer()->notNull()->comment('Зарплата'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);
        $this->createIndex('idx_vacancy_salary', '{{%vacancy}}', 'salary');
        $this->createIndex('idx_vacancy_created_at', '{{%vacancy}}', 'created_at');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): void
    {
        $this->dropTable('{{%vacancy}}');
    }
}
