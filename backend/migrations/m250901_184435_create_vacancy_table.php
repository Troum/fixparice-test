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
        // Основная таблица вакансий
        $this->createTable('{{%vacancy}}', [
            'id' => $this->primaryKey(),
            'title' => $this->string(255)->notNull()->comment('Название'),
            'description' => $this->json()->comment('Описание (Tiptap content blocks)'),
            'salary' => $this->integer()->notNull()->comment('Зарплата'),
            'status' => $this->smallInteger()->notNull()->defaultValue(1)->comment('Статус (1-активная, 0-архивная)'),
            'location_id' => $this->integer()->comment('ID локации'),
            'position_type' => $this->string(50)->comment('Тип позиции (full-time, part-time, contract, internship)'),
            'experience_required' => $this->string(100)->comment('Требуемый опыт'),
            'education_required' => $this->string(100)->comment('Требуемое образование'),
            // Дополнительные поля для информации о компании и условиях
            'company_name' => $this->string(255)->comment('Название компании'),
            'company_size' => $this->string(100)->comment('Размер компании'),
            'company_industry' => $this->string(100)->comment('Отрасль компании'),
            'company_website' => $this->string(255)->comment('Сайт компании'),
            'work_schedule' => $this->string(100)->comment('График работы'),
            'work_office' => $this->string(255)->comment('Описание офиса'),
            'team_size' => $this->integer()->comment('Размер команды'),
            'probation_period' => $this->string(50)->comment('Испытательный срок'),
            'vacation_days' => $this->integer()->comment('Количество дней отпуска'),
            'growth_opportunities' => $this->text()->comment('Возможности развития'),
            'requirements_text' => $this->text()->comment('Дополнительные требования'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Таблица локаций
        $this->createTable('{{%location}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(255)->notNull()->comment('Название локации'),
            'country' => $this->string(100)->comment('Страна'),
            'city' => $this->string(100)->comment('Город'),
            'remote_available' => $this->boolean()->defaultValue(false)->comment('Доступна удаленная работа'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Таблица навыков
        $this->createTable('{{%skill}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100)->notNull()->comment('Название навыка'),
            'category' => $this->string(50)->comment('Категория (language, framework, tool, etc)'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Таблица льгот/преимуществ
        $this->createTable('{{%benefit}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100)->notNull()->comment('Название льготы'),
            'description' => $this->text()->comment('Описание льготы'),
            'type' => $this->string(50)->comment('Тип (insurance, monetary, time, equipment, etc)'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Связующая таблица вакансия-навыки
        $this->createTable('{{%vacancy_skill}}', [
            'vacancy_id' => $this->integer()->notNull(),
            'skill_id' => $this->integer()->notNull(),
            'required' => $this->boolean()->defaultValue(true)->comment('Обязательный навык'),
            'level' => $this->string(50)->comment('Уровень (junior, middle, senior)'),
        ]);

        // Связующая таблица вакансия-льготы
        $this->createTable('{{%vacancy_benefit}}', [
            'vacancy_id' => $this->integer()->notNull(),
            'benefit_id' => $this->integer()->notNull(),
            'value' => $this->string(255)->comment('Значение льготы (сумма, процент и т.д.)'),
            'description' => $this->text()->comment('Дополнительное описание'),
        ]);

        // Таблица обязанностей
        $this->createTable('{{%vacancy_responsibility}}', [
            'id' => $this->primaryKey(),
            'vacancy_id' => $this->integer()->notNull(),
            'title' => $this->string(255)->notNull()->comment('Заголовок обязанности'),
            'description' => $this->text()->comment('Описание обязанности'),
            'sort_order' => $this->integer()->defaultValue(0)->comment('Порядок сортировки'),
            'created_at' => $this->integer()->notNull(),
            'updated_at' => $this->integer()->notNull(),
        ]);

        // Индексы
        $this->createIndex('idx_vacancy_salary', '{{%vacancy}}', 'salary');
        $this->createIndex('idx_vacancy_status', '{{%vacancy}}', 'status');
        $this->createIndex('idx_vacancy_created_at', '{{%vacancy}}', 'created_at');
        $this->createIndex('idx_vacancy_location_id', '{{%vacancy}}', 'location_id');
        $this->createIndex('idx_vacancy_position_type', '{{%vacancy}}', 'position_type');

        $this->createIndex('idx_location_country_city', '{{%location}}', ['country', 'city']);
        $this->createIndex('idx_skill_category', '{{%skill}}', 'category');
        $this->createIndex('idx_benefit_type', '{{%benefit}}', 'type');

        // Составные индексы для связующих таблиц
        $this->createIndex('idx_vacancy_skill_vacancy', '{{%vacancy_skill}}', 'vacancy_id');
        $this->createIndex('idx_vacancy_skill_skill', '{{%vacancy_skill}}', 'skill_id');
        $this->createIndex('idx_vacancy_benefit_vacancy', '{{%vacancy_benefit}}', 'vacancy_id');
        $this->createIndex('idx_vacancy_benefit_benefit', '{{%vacancy_benefit}}', 'benefit_id');
        $this->createIndex('idx_vacancy_responsibility_vacancy', '{{%vacancy_responsibility}}', 'vacancy_id');

        // Внешние ключи
        $this->addForeignKey('fk_vacancy_location', '{{%vacancy}}', 'location_id', '{{%location}}', 'id', 'SET NULL');
        
        $this->addForeignKey('fk_vacancy_skill_vacancy', '{{%vacancy_skill}}', 'vacancy_id', '{{%vacancy}}', 'id', 'CASCADE');
        $this->addForeignKey('fk_vacancy_skill_skill', '{{%vacancy_skill}}', 'skill_id', '{{%skill}}', 'id', 'CASCADE');
        
        $this->addForeignKey('fk_vacancy_benefit_vacancy', '{{%vacancy_benefit}}', 'vacancy_id', '{{%vacancy}}', 'id', 'CASCADE');
        $this->addForeignKey('fk_vacancy_benefit_benefit', '{{%vacancy_benefit}}', 'benefit_id', '{{%benefit}}', 'id', 'CASCADE');
        
        $this->addForeignKey('fk_vacancy_responsibility_vacancy', '{{%vacancy_responsibility}}', 'vacancy_id', '{{%vacancy}}', 'id', 'CASCADE');

        // Первичные ключи для связующих таблиц
        $this->addPrimaryKey('pk_vacancy_skill', '{{%vacancy_skill}}', ['vacancy_id', 'skill_id']);
        $this->addPrimaryKey('pk_vacancy_benefit', '{{%vacancy_benefit}}', ['vacancy_id', 'benefit_id']);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown(): void
    {
        // Удаляем в обратном порядке из-за внешних ключей
        $this->dropTable('{{%vacancy_responsibility}}');
        $this->dropTable('{{%vacancy_benefit}}');
        $this->dropTable('{{%vacancy_skill}}');
        $this->dropTable('{{%vacancy}}');
        $this->dropTable('{{%benefit}}');
        $this->dropTable('{{%skill}}');
        $this->dropTable('{{%location}}');
    }
}
