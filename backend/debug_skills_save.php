<?php

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/config/console.php';
new yii\console\Application($config);

use app\models\{Vacancy, VacancySkill};

echo "=== Отладка сохранения навыков ===\n\n";

$vacancy = Vacancy::findOne(1);

if ($vacancy) {
    echo "📋 Вакансия: {$vacancy->title} (ID: {$vacancy->id})\n";
    
    // Показываем текущие навыки
    echo "\n🛠️  Текущие навыки в БД:\n";
    $currentSkills = VacancySkill::find()->where(['vacancy_id' => $vacancy->id])->with('skill')->all();
    foreach ($currentSkills as $vs) {
        echo "  ID {$vs->skill_id}: {$vs->skill->name} (required: " . ($vs->required ? 'true' : 'false') . ", level: " . ($vs->level ?: 'null') . ")\n";
    }
    
    // Тестовые данные для обновления
    $testSkillsData = [
        [
            "id" => 1,
            "required" => true,
            "level" => "senior"
        ],
        [
            "id" => 2,
            "required" => false,
            "level" => "middle"
        ],
        [
            "id" => 3,
            "required" => true,
            "level" => null
        ]
    ];
    
    echo "\n📝 Тестовые данные для обновления:\n";
    foreach ($testSkillsData as $skill) {
        $req = isset($skill['required']) ? ($skill['required'] ? 'true' : 'false') : 'не указан';
        $level = $skill['level'] ?? 'null';
        echo "  ID {$skill['id']}: required={$req}, level={$level}\n";
    }
    
    echo "\n🔄 Выполняем updateRelatedData...\n";
    
    // Включаем логирование для отладки
    $transaction = $vacancy->getDb()->beginTransaction();
    try {
        echo "  1. Удаляем старые навыки...\n";
        $deletedCount = VacancySkill::deleteAll(['vacancy_id' => $vacancy->id]);
        echo "     Удалено: {$deletedCount} записей\n";
        
        echo "  2. Добавляем новые навыки...\n";
        foreach ($testSkillsData as $skillData) {
            $skillId = $skillData['id'];
            $required = $skillData['required'] ?? false;
            $level = $skillData['level'] ?? null;
            
            echo "     Добавляем навык ID {$skillId}: required=" . ($required ? 'true' : 'false') . ", level=" . ($level ?: 'null') . "\n";
            
            $vacancySkill = new VacancySkill([
                'vacancy_id' => $vacancy->id,
                'skill_id' => $skillId,
                'required' => $required,
                'level' => $level,
            ]);
            
            if ($vacancySkill->save()) {
                echo "       ✅ Сохранено\n";
            } else {
                echo "       ❌ Ошибка: " . implode(', ', $vacancySkill->getFirstErrors()) . "\n";
            }
        }
        
        $transaction->commit();
        echo "  3. Транзакция завершена\n";
        
    } catch (Exception $e) {
        $transaction->rollBack();
        echo "  ❌ Ошибка транзакции: {$e->getMessage()}\n";
    }
    
    // Проверяем результат
    echo "\n🔍 Проверяем результат в БД:\n";
    $updatedSkills = VacancySkill::find()->where(['vacancy_id' => $vacancy->id])->with('skill')->all();
    foreach ($updatedSkills as $vs) {
        echo "  ID {$vs->skill_id}: {$vs->skill->name} (required: " . ($vs->required ? 'true' : 'false') . ", level: " . ($vs->level ?: 'null') . ")\n";
    }
    
    // Проверяем через API response
    echo "\n📱 API Response навыки:\n";
    $vacancy->refresh();
    $vacancy = Vacancy::find()->with(['skills'])->where(['id' => 1])->one();
    $apiSkills = $vacancy->toArray([], ['skills'])['skills'] ?? [];
    
    foreach ($apiSkills as $skill) {
        echo "  {$skill['name']}: данные в API response\n";
        echo json_encode($skill, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
    }
    
} else {
    echo "❌ Вакансия не найдена\n";
}

echo "\n=== Отладка завершена ===\n";
