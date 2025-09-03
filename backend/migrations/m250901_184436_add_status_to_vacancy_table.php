<?php

use yii\db\Migration;

/**
 * Handles adding status to table `{{%vacancy}}`.
 */
class m250901_184436_add_status_to_vacancy_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('{{%vacancy}}', 'status', $this->smallInteger()->notNull()->defaultValue(1)->after('salary'));
        
        // Add index for status
        $this->createIndex('idx-vacancy-status', '{{%vacancy}}', 'status');
        
        // Update existing records to have active status
        $this->update('{{%vacancy}}', ['status' => 1]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-vacancy-status', '{{%vacancy}}');
        $this->dropColumn('{{%vacancy}}', 'status');
    }
}
