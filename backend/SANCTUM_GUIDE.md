# Система аутентификации через токены

Создал систему аутентификации аналогичную Laravel Sanctum для безопасной работы с API.

## Как работает система

Вместо традиционных сессий использую персональные токены доступа. Каждый токен привязан к пользователю и может иметь определенные права доступа.

### Основные компоненты

**PersonalAccessToken** - модель для хранения токенов в базе данных. Каждый токен содержит:
- Хешированное значение токена
- Название устройства или приложения
- Список прав доступа (abilities)
- Время последнего использования
- Срок действия

**TokenService** - сервис для управления токенами:
- Создание новых токенов
- Проверка валидности
- Отзыв токенов
- Очистка просроченных

**BearerAuthFilter** - фильтр для автоматической проверки токенов в заголовках запросов

## Использование API

### Получение токена доступа

Отправляю POST запрос на `/api/v1/auth/login` с данными:

```json
{
  "email": "user@example.com", 
  "password": "password",
  "device_name": "Web Browser"
}
```

В ответ получаю токен доступа:

```json
{
  "result": "success",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "username": "user"
    },
    "access_token": "1|eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "token_type": "Bearer",
    "expires_at": 1640995200
  }
}
```

### Использование токена

Добавляю токен в заголовок Authorization для всех защищенных запросов:

```bash
curl -X GET http://backend.test/api/v1/vacancies \
  -H "Authorization: Bearer 1|eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." \
  -H "Content-Type: application/json"
```

### Управление токенами

**Получить информацию о текущем пользователе:**
```
GET /api/v1/auth/me
```

**Список всех моих токенов:**
```
GET /api/v1/auth/tokens
```

**Выйти (отозвать текущий токен):**
```
POST /api/v1/auth/logout
```

**Выйти со всех устройств:**
```
POST /api/v1/auth/logout-all
```

**Обновить токен:**
```
POST /api/v1/auth/refresh
```

## Защищенные endpoints

Все endpoints для работы с вакансиями требуют аутентификации:

- `GET /api/v1/vacancies` - список вакансий
- `GET /api/v1/vacancies/{id}` - конкретная вакансия  
- `POST /api/v1/vacancies` - создание вакансии
- `PUT /api/v1/vacancies/{id}` - обновление вакансии
- `DELETE /api/v1/vacancies/{id}` - удаление вакансии
- `GET /api/v1/vacancies/search` - поиск вакансий
- `GET /api/v1/vacancies/stats` - статистика

## Настройка в коде

### Защита контроллера

Добавляю BearerAuthFilter в behaviors контроллера:

```php
public function behaviors(): array
{
    return [
        'bearerAuth' => [
            'class' => BearerAuthFilter::class,
            'except' => ['options'], // Исключения для CORS
        ],
    ];
}
```

### Создание токена программно

```php
$tokenService = ServiceFactory::getTokenService();
$user = UserEntity::findByEmail('user@example.com');

$tokenData = $tokenService->createToken(
    $user, 
    'Mobile App',
    ['*'], // все права
    time() + 3600 // истекает через час
);

$accessToken = $tokenData['accessToken'];
```

### Проверка прав доступа

Могу ограничить доступ к определенным действиям:

```php
'bearerAuth' => [
    'class' => BearerAuthFilter::class,
    'ability' => 'vacancy:read', // Только чтение вакансий
],
```

## Безопасность

**Хеширование токенов** - токены хранятся в базе в хешированном виде, как пароли

**Срок действия** - каждый токен имеет ограниченный срок жизни

**Отслеживание использования** - система записывает время последнего использования каждого токена

**Отзыв токенов** - могу в любой момент отозвать токен или все токены пользователя

**Права доступа** - каждый токен может иметь ограниченный набор прав

## Примеры использования

**Веб-приложение:**
```javascript
// Сохраняю токен после логина
localStorage.setItem('token', data.access_token);

// Использую в запросах
fetch('/api/v1/vacancies', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});
```

**Мобильное приложение:**
```javascript
// При входе в приложение
const response = await fetch('/api/v1/auth/login', {
  method: 'POST',
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password', 
    device_name: 'iPhone App'
  })
});

const { access_token } = await response.json();
// Сохраняю токен в secure storage
```

Система токенов обеспечивает безопасный доступ к API без необходимости передавать логин и пароль в каждом запросе.
