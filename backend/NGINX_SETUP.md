# Руководство по настройке Nginx для Nuxt.js и Yii2

Данное руководство содержит раздельные конфигурации Nginx для frontend (Nuxt.js) и backend (Yii2) приложений.

## Файлы конфигурации

1. **nginx-nuxt.conf** - конфигурация для Nuxt.js приложения (frontend)
2. **nginx-yii2.conf** - конфигурация для Yii2 приложения (backend API)

## Архитектура системы

```
mytests.space (HTTPS)
├── / → Nuxt.js приложение (порт 4206)
└── /api/ → Yii2 API (PHP-FPM)

api.mytests.space (HTTPS) - альтернативный вариант
└── / → Yii2 API (PHP-FPM)
```

## Установка конфигураций

### 1. Копирование файлов на сервер

```bash
# Подключиться к серверу
ssh root@80-78-240-29

# Создать директорию для конфигураций (если не существует)
mkdir -p /etc/nginx/sites-available
mkdir -p /etc/nginx/sites-enabled
```

### 2. Установка конфигурации Nuxt.js

```bash
# Копировать конфигурацию
scp nginx-nuxt.conf root@80-78-240-29:/etc/nginx/sites-available/nuxt-frontend

# Или создать файл напрямую на сервере
nano /etc/nginx/sites-available/nuxt-frontend
# Вставить содержимое из nginx-nuxt.conf

# Создать симлинк
ln -s /etc/nginx/sites-available/nuxt-frontend /etc/nginx/sites-enabled/
```

### 3. Установка конфигурации Yii2

```bash
# Копировать конфигурацию
scp nginx-yii2.conf root@80-78-240-29:/etc/nginx/sites-available/yii2-backend

# Или создать файл напрямую на сервере
nano /etc/nginx/sites-available/yii2-backend
# Вставить содержимое из nginx-yii2.conf

# Создать симлинк
ln -s /etc/nginx/sites-available/yii2-backend /etc/nginx/sites-enabled/
```

### 4. Настройка SSL сертификатов

```bash
# Получить SSL сертификат для mytests.space
certbot --nginx -d mytests.space -d www.mytests.space

# Если используете отдельный API домен
certbot --nginx -d api.mytests.space
```

### 5. Настройка прав доступа для Yii2

```bash
# Права для директорий Yii2
chown -R www-data:www-data /var/www/vacancy-system/backend/web/assets
chown -R www-data:www-data /var/www/vacancy-system/backend/runtime
chmod -R 775 /var/www/vacancy-system/backend/web/assets
chmod -R 775 /var/www/vacancy-system/backend/runtime

# Права для загрузок (если есть)
chown -R www-data:www-data /var/www/vacancy-system/backend/web/uploads
chmod -R 755 /var/www/vacancy-system/backend/web/uploads
```

### 6. Проверка и применение конфигурации

```bash
# Проверить синтаксис конфигурации
nginx -t

# Если все ОК, перезагрузить Nginx
systemctl reload nginx

# Проверить статус
systemctl status nginx
```

## Проверка работы сервисов

### Frontend (Nuxt.js)

```bash
# Проверить, что Nuxt запущен на порту 4206
netstat -tlnp | grep 4206

# Проверить статус systemd сервиса
systemctl status vacancy-frontend

# Проверить логи
tail -f /var/log/nginx/nuxt_access.log
tail -f /var/log/nginx/nuxt_error.log
```

### Backend (Yii2)

```bash
# Проверить статус PHP-FPM
systemctl status php8.1-fpm

# Проверить логи
tail -f /var/log/nginx/yii2_backend_access.log
tail -f /var/log/nginx/yii2_backend_error.log

# Проверить права доступа к файлам
ls -la /var/www/vacancy-system/backend/web/
```

## Тестирование

### 1. Тест frontend

```bash
curl -I https://mytests.space/
# Должен вернуть 200 OK от Nuxt.js
```

### 2. Тест backend API

```bash
curl -I https://mytests.space/api/health
# Или
curl -I https://api.mytests.space/health
# Должен вернуть 200 OK от Yii2
```

### 3. Тест статических файлов

```bash
curl -I https://mytests.space/assets/
# Должен вернуть статические файлы Yii2
```

## Варианты архитектуры

### Вариант 1: Один домен (рекомендуется)
- **Frontend**: https://mytests.space/
- **API**: https://mytests.space/api/

### Вариант 2: Раздельные домены
- **Frontend**: https://mytests.space/
- **API**: https://api.mytests.space/

## Мониторинг и логи

### Логи Nginx
- `/var/log/nginx/nuxt_access.log` - доступ к frontend
- `/var/log/nginx/nuxt_error.log` - ошибки frontend
- `/var/log/nginx/yii2_backend_access.log` - доступ к backend
- `/var/log/nginx/yii2_backend_error.log` - ошибки backend

### Логи приложений
- `/var/www/vacancy-system/backend/runtime/logs/app.log` - логи Yii2
- Логи Nuxt.js через systemd: `journalctl -u vacancy-frontend -f`

## Безопасность

### Основные меры безопасности в конфигурации:
1. Скрытие системных файлов (.htaccess, .git, и т.д.)
2. Запрет доступа к служебным директориям
3. Запрет выполнения PHP в директории uploads
4. HTTPS редиректы
5. Правильные заголовки безопасности

### Дополнительные рекомендации:
1. Настройте fail2ban для защиты от брутфорса
2. Используйте CSP заголовки
3. Регулярно обновляйте SSL сертификаты
4. Мониторьте логи на предмет подозрительной активности

## Устранение неполадок

### Проблема: 502 Bad Gateway на frontend
```bash
# Проверить статус Nuxt сервиса
systemctl status vacancy-frontend
systemctl restart vacancy-frontend

# Проверить порт
netstat -tlnp | grep 4206
```

### Проблема: 502 Bad Gateway на API
```bash
# Проверить PHP-FPM
systemctl status php8.1-fpm
systemctl restart php8.1-fpm

# Проверить сокет
ls -la /run/php/php8.1-fpm.sock
```

### Проблема: SSL сертификат
```bash
# Обновить сертификат
certbot renew

# Проверить срок действия
openssl x509 -in /etc/letsencrypt/live/mytests.space/cert.pem -text -noout | grep "Not After"
```

## Контакты и поддержка

При возникновении проблем проверьте:
1. Логи Nginx (`/var/log/nginx/`)
2. Статус сервисов (`systemctl status`)
3. Доступность портов (`netstat -tlnp`)
4. Права доступа к файлам (`ls -la`)
