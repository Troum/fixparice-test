<?php

namespace app\models;

use Exception;
use yii\base\InvalidConfigException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveQuery;
use yii\db\ActiveRecord;

/**
 * Vacancy model
 *
 * @property int $id
 * @property string $title
 * @property array|null $description Tiptap content blocks (JSON)
 * @property int $salary
 * @property int $status
 * @property int|null $location_id
 * @property string|null $position_type
 * @property string|null $experience_required
 * @property string|null $education_required
 * @property string|null $company_name
 * @property string|null $company_size
 * @property string|null $company_industry
 * @property string|null $company_website
 * @property string|null $work_schedule
 * @property string|null $work_office
 * @property int|null $team_size
 * @property string|null $probation_period
 * @property int|null $vacation_days
 * @property string|null $growth_opportunities
 * @property string|null $requirements_text
 * @property int $created_at
 * @property int $updated_at
 *
 * @property Location $location
 * @property VacancySkill[] $vacancySkills
 * @property Skill[] $skills
 * @property VacancyBenefit[] $vacancyBenefits
 * @property Benefit[] $benefits
 * @property VacancyResponsibility[] $responsibilities
 */
class Vacancy extends ActiveRecord
{
    const int STATUS_ACTIVE   = 1;
    const int STATUS_ARCHIVED = 0;

    const string POSITION_TYPE_FULL_TIME = 'full-time';
    const string POSITION_TYPE_PART_TIME = 'part-time';
    const string POSITION_TYPE_CONTRACT   = 'contract';
    const string POSITION_TYPE_INTERNSHIP = 'internship';

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
            [['description'], 'safe'], // JSON поле для Tiptap content blocks
            [['description'], 'validateJson'], // Кастомная валидация JSON
            [['salary', 'status', 'location_id', 'team_size', 'vacation_days'], 'integer'],
            [['salary'], 'integer', 'min' => 0],
            [['team_size', 'vacation_days'], 'integer', 'min' => 0],
            [['title', 'company_name', 'company_website', 'work_office'], 'string', 'max' => 255],
            [['position_type', 'work_schedule', 'probation_period'], 'string', 'max' => 50],
            [['experience_required', 'education_required', 'company_size', 'company_industry'], 'string', 'max' => 100],
            [['requirements_text', 'growth_opportunities'], 'string'],
            [['status'], 'in', 'range' => [self::STATUS_ACTIVE, self::STATUS_ARCHIVED]],
            [['status'], 'default', 'value' => self::STATUS_ACTIVE],
            [['position_type'], 'in', 'range' => [
                self::POSITION_TYPE_FULL_TIME,
                self::POSITION_TYPE_PART_TIME,
                self::POSITION_TYPE_CONTRACT,
                self::POSITION_TYPE_INTERNSHIP,
            ]],
            [['location_id'], 'exist', 'targetClass' => Location::class, 'targetAttribute' => 'id'],
        ];
    }

    /**
     * @return array
     */
    public function attributeLabels(): array
    {
        return [
            'id' => 'ID',
            'title' => 'Название',
            'description' => 'Описание (Tiptap)',
            'salary' => 'Зарплата',
            'status' => 'Статус',
            'location_id' => 'Локация',
            'position_type' => 'Тип позиции',
            'experience_required' => 'Требуемый опыт',
            'education_required' => 'Требуемое образование',
            'company_name' => 'Название компании',
            'company_size' => 'Размер компании',
            'company_industry' => 'Отрасль',
            'company_website' => 'Сайт компании',
            'work_schedule' => 'График работы',
            'work_office' => 'Описание офиса',
            'team_size' => 'Размер команды',
            'probation_period' => 'Испытательный срок',
            'vacation_days' => 'Дни отпуска',
            'growth_opportunities' => 'Возможности развития',
            'requirements_text' => 'Дополнительные требования',
            'created_at' => 'Создано',
            'updated_at' => 'Обновлено',
        ];
    }

    /**
     * @return string[]
     */
    public function fields(): array
    {
        return [
            'id', 'title', 'description', 'salary', 'status',
            'location_id', 'position_type', 'experience_required', 'education_required',
            'company_name', 'company_size', 'company_industry', 'company_website',
            'work_schedule', 'work_office', 'team_size',
            'probation_period', 'vacation_days', 'growth_opportunities', 'requirements_text',
            // Вычисляемые поля
            'status_text' => function() { return $this->getStatusText(); },
            'position_type_name' => function() { return $this->getPositionTypeName(); },
        ];
    }

    /**
     * @return array
     */
    public function extraFields(): array
    {
        return [
            'created_at', 'updated_at',
            'location', 'skills', 'benefits', 'responsibilities'
        ];
    }

    // Связи

    /**
     * @return ActiveQuery
     */
    public function getLocation(): ActiveQuery
    {
        return $this->hasOne(Location::class, ['id' => 'location_id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getVacancySkills(): ActiveQuery
    {
        return $this->hasMany(VacancySkill::class, ['vacancy_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     * @throws InvalidConfigException
     * @throws InvalidConfigException
     */
    public function getSkills(): ActiveQuery
    {
        return $this->hasMany(Skill::class, ['id' => 'skill_id'])
            ->viaTable('{{%vacancy_skill}}', ['vacancy_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getVacancyBenefits(): ActiveQuery
    {
        return $this->hasMany(VacancyBenefit::class, ['vacancy_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     * @throws InvalidConfigException
     * @throws InvalidConfigException
     */
    public function getBenefits(): ActiveQuery
    {
        return $this->hasMany(Benefit::class, ['id' => 'benefit_id'])
            ->viaTable('{{%vacancy_benefit}}', ['vacancy_id' => 'id']);
    }

    /**
     * @return ActiveQuery
     */
    public function getResponsibilities(): ActiveQuery
    {
        return $this->hasMany(VacancyResponsibility::class, ['vacancy_id' => 'id'])
            ->orderBy(['sort_order' => SORT_ASC]);
    }

    // Вспомогательные методы

    /**
     * Получить список типов позиций
     * @return array
     */
    public static function getPositionTypes(): array
    {
        return [
            self::POSITION_TYPE_FULL_TIME => 'Полная занятость',
            self::POSITION_TYPE_PART_TIME => 'Частичная занятость',
            self::POSITION_TYPE_CONTRACT => 'Контракт',
            self::POSITION_TYPE_INTERNSHIP => 'Стажировка',
        ];
    }

    /**
     * Получить название типа позиции
     * @return string
     */
    public function getPositionTypeName(): string
    {
        $types = self::getPositionTypes();
        return $types[$this->position_type] ?? $this->position_type ?? 'Не указан';
    }

    /**
     * Получить статус как текст
     * @return string
     */
    public function getStatusText(): string
    {
        return $this->status === self::STATUS_ACTIVE ? 'Активная' : 'Архивная';
    }

    /**
     * Добавить навык к вакансии
     * @param int $skillId
     * @param bool $required
     * @param string|null $level
     * @return bool
     * @throws \yii\db\Exception
     * @throws \yii\db\Exception
     */
    public function addSkill(int $skillId, bool $required = true, ?string $level = null): bool
    {
        $vacancySkill = new VacancySkill([
            'vacancy_id' => $this->id,
            'skill_id' => $skillId,
            'required' => $required,
            'level' => $level,
        ]);
        return $vacancySkill->save();
    }

    /**
     * Добавить льготу к вакансии
     * @param int $benefitId
     * @param string|null $value
     * @param string|null $description
     * @return bool
     * @throws \yii\db\Exception
     * @throws \yii\db\Exception
     */
    public function addBenefit(int $benefitId, ?string $value = null, ?string $description = null): bool
    {
        $vacancyBenefit = new VacancyBenefit([
            'vacancy_id' => $this->id,
            'benefit_id' => $benefitId,
            'value' => $value,
            'description' => $description,
        ]);
        return $vacancyBenefit->save();
    }

    /**
     * Добавить обязанность к вакансии
     * @param string $title
     * @param string|null $description
     * @param int $sortOrder
     * @return bool
     * @throws \yii\db\Exception
     * @throws \yii\db\Exception
     */
    public function addResponsibility(string $title, ?string $description = null, int $sortOrder = 0): bool
    {
        $responsibility = new VacancyResponsibility([
            'vacancy_id' => $this->id,
            'title' => $title,
            'description' => $description,
            'sort_order' => $sortOrder,
        ]);
        return $responsibility->save();
    }

    // Методы для работы с JSON description

    /**
     * Валидация JSON поля description
     * @param string $attribute
     * @param array $params
     */
    public function validateJson(string $attribute, $params = null): void
    {
        if (!empty($this->$attribute)) {
            if (is_string($this->$attribute)) {
                $decoded = json_decode($this->$attribute, true);
                if (json_last_error() !== JSON_ERROR_NONE) {
                    $this->addError($attribute, 'Поле должно содержать валидный JSON.');
                }
            } elseif (!is_array($this->$attribute) && !is_object($this->$attribute)) {
                $this->addError($attribute, 'Поле должно содержать валидный JSON.');
            }
        }
    }

    /**
     * Получить описание как массив
     * @return string|array|null
     */
    public function getDescriptionArray(): string|array|null
    {
        if (empty($this->description)) {
            return null;
        }

        if (is_string($this->description)) {
            return json_decode($this->description, true);
        }

        return $this->description;
    }

    /**
     * Установить описание из массива
     * @param array|null $data
     */
    public function setDescriptionArray(?array $data): void
    {
        if ($data === null) {
            $this->description = null;
        } else {
            $this->description = $data;
        }
    }

    /**
     * @inheritdoc
     */
    public function beforeSave($insert): bool
    {
        if (parent::beforeSave($insert)) {
            // Если description - массив, преобразуем в JSON строку для сохранения
            if (is_array($this->description)) {
                $this->description = json_encode($this->description, JSON_UNESCAPED_UNICODE);
            }
            return true;
        }
        return false;
    }

    /**
     * @inheritdoc
     */
    public function afterFind(): void
    {
        parent::afterFind();

        if (is_string($this->description) && !empty($this->description)) {
            $decoded = json_decode($this->description, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                $this->description = $decoded;
            }
        }
    }

    /**
     * Массовое обновление связанных данных
     * @param array $skillIds
     * @param array $benefitIds
     * @param array $responsibilities
     * @return bool
     */
    public function updateRelatedData(array $skillIds = [], array $benefitIds = [], array $responsibilities = []): bool
    {
        $transaction = $this->getDb()->beginTransaction();
        try {
            // Удаляем старые связи
            VacancySkill::deleteAll(['vacancy_id' => $this->id]);
            VacancyBenefit::deleteAll(['vacancy_id' => $this->id]);
            VacancyResponsibility::deleteAll(['vacancy_id' => $this->id]);

            // Добавляем навыки
            foreach ($skillIds as $skillData) {
                $skillId = is_array($skillData) ? $skillData['id'] : $skillData;
                // Если required не передан, считаем навык необязательным (false)
                $required = is_array($skillData) ? ($skillData['required'] ?? false) : true;
                $level = is_array($skillData) ? ($skillData['level'] ?? null) : null;
                
                $this->addSkill($skillId, $required, $level);
            }

            // Добавляем "плюшки"
            foreach ($benefitIds as $benefitData) {
                $benefitId = is_array($benefitData) ? $benefitData['id'] : $benefitData;
                $value = is_array($benefitData) ? ($benefitData['value'] ?? null) : null;
                $description = is_array($benefitData) ? ($benefitData['description'] ?? null) : null;

                $this->addBenefit($benefitId, $value, $description);
            }

            // Добавляем обязанности
            foreach ($responsibilities as $index => $responsibility) {
                $title = is_array($responsibility) ? $responsibility['title'] : $responsibility;
                $description = is_array($responsibility) ? ($responsibility['description'] ?? null) : null;

                $this->addResponsibility($title, $description, $index + 1);
            }

            $transaction->commit();
            return true;
        } catch (Exception $e) {
            $transaction->rollBack();
            return false;
        }
    }
}
