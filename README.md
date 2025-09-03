# Система управления вакансиями

Инструкция по развертыванию системы управления вакансиями на сервере.

## Требования к серверу

### Системные требования
- **OS:** Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **RAM:** минимум 2GB, рекомендуется 4GB
- **CPU:** 1 ядро, рекомендуется 2 ядра
- **Диск:** 10GB свободного места
- **Сеть:** Статический IP адрес

### Необходимое ПО
- **PHP 8.1+** с расширениями
- **MySQL 8.0** или **MariaDB 10.6+**
- **Nginx** или **Apache**
- **Node.js 20+** и **npm**
- **Composer**
- **Redis** (опционально)
- **Git**

## Подготовка сервера

### 1. Обновление системы

**Ubuntu/Debian:**
```bash
sudo apt update && sudo apt upgrade -y
```

**CentOS/RHEL:**
```bash
sudo yum update -y
```

### 2. Установка PHP 8.1

**Ubuntu/Debian:**
```bash
# Добавление репозитория PHP
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update

# Установка PHP и расширений
sudo apt install -y php8.1 php8.1-fpm php8.1-mysql php8.1-pgsql \
    php8.1-sqlite3 php8.1-redis php8.1-memcached php8.1-json \
    php8.1-zip php8.1-gd php8.1-mbstring php8.1-curl php8.1-xml \
    php8.1-bcmath php8.1-intl php8.1-readline php8.1-msgpack \
    php8.1-igbinary php8.1-opcache
```

**CentOS/RHEL:**
```bash
# Добавление репозитория Remi
sudo yum install epel-release
sudo yum install https://rpms.remirepo.net/enterprise/remi-release-8.rpm
sudo yum module enable php:remi-8.1

# Установка PHP
sudo yum install -y php php-fpm php-mysql php-json php-zip \
    php-gd php-mbstring php-curl php-xml php-bcmath php-intl \
    php-opcache php-redis
```

### 3. Установка MySQL/MariaDB

**MySQL 8.0:**
```bash
# Ubuntu/Debian
sudo apt install -y mysql-server mysql-client

# CentOS/RHEL
sudo yum install -y mysql-server mysql
sudo systemctl enable mysqld
sudo systemctl start mysqld
```

**MariaDB (рекомендуется):**
```bash
# Ubuntu/Debian
sudo apt install -y mariadb-server mariadb-client

# CentOS/RHEL
sudo yum install -y mariadb-server mariadb
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

### 4. Установка Nginx

```bash
# Ubuntu/Debian
sudo apt install -y nginx

# CentOS/RHEL
sudo yum install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5. Установка Node.js 20

```bash
# Установка через NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Или через snap
sudo snap install node --classic

# Проверка версии
node --version
npm --version
```

### 6. Установка Composer

```bash
# Скачивание и установка Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# Проверка
composer --version
```

### 7. Установка Redis (опционально)

```bash
# Ubuntu/Debian
sudo apt install -y redis-server

# CentOS/RHEL
sudo yum install -y redis
sudo systemctl enable redis
sudo systemctl start redis
```

## Настройка базы данных

### 1. Безопасная установка MySQL/MariaDB

```bash
sudo mysql_secure_installation
```

### 2. Создание базы данных и пользователя

```bash
# Подключение к MySQL/MariaDB
sudo mysql -u root -p

# В консоли MySQL
CREATE DATABASE vacancy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'vacancy_user'@'localhost' IDENTIFIED BY '!1029QPwo!';
GRANT ALL PRIVILEGES ON vacancy_db.* TO 'vacancy_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Настройка MySQL/MariaDB

Создай файл `/etc/mysql/conf.d/vacancy.cnf`:

```ini
[mysqld]
# Основные настройки
character-set-server=utf8mb4
collation-server=utf8mb4_unicode_ci
default-authentication-plugin=mysql_native_password

# Производительность
innodb_buffer_pool_size=256M
max_connections=200

# Безопасность
local_infile=0

[mysql]
default-character-set=utf8mb4

[client]
default-character-set=utf8mb4
```

Перезапусти MySQL:
```bash
sudo systemctl restart mysql
# или для MariaDB
sudo systemctl restart mariadb
```

## Развертывание приложения

### 1. Клонирование проекта

```bash
# Создание директории
sudo mkdir -p /var/www
cd /var/www

# Клонирование репозитория
sudo git clone https://github.com/Troum/fixparice-test.git vacancy-system
sudo chown -R $USER:www-data vacancy-system
cd vacancy-system
```

### 2. Настройка Backend (Yii2)

```bash
cd backend

# Установка зависимостей
composer install --no-dev --optimize-autoloader

# Настройка прав доступа
sudo chown -R www-data:www-data runtime web/assets
sudo chmod -R 775 runtime web/assets

# Копирование конфигурации
cp config/db.php.example config/db.php
```

Настрой файл `config/db.php`:

```php
<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=vacancy_db',
    'username' => 'vacancy_user',
    'password' => '!1029QPwo!',
    'charset' => 'utf8mb4',
    'attributes' => [
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_EMULATE_PREPARES => false,
    ],
];
```

Выполни миграции:
```bash
./yii migrate --interactive=0
```

Создай администратора:
```bash
./yii seed/create-user troum@outlook.com password123
```

### 3. Настройка Frontend (Nuxt.js)

```bash
cd ../frontend

# Установка зависимостей
npm install

# Настройка API endpoint
# Отредактируй nuxt.config.ts
nano nuxt.config.ts
```

В `nuxt.config.ts` настрой:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: 'https://mytests.space/api'
    }
  },
  // остальная конфигурация...
})
```

Сборка для продакшн:
```bash
npm run build
```

## Настройка веб-сервера

### Nginx конфигурация

Создай файл `/etc/nginx/sites-available/vacancy-system`:

```nginx
server {
    listen 80;
    server_name mytests.space;
    
    # Логи
    access_log /var/log/nginx/vacancy_access.log;
    error_log /var/log/nginx/vacancy_error.log;
    
    # API routes (Backend)
    location /api/ {
        root /var/www/vacancy-system/backend/web;
        try_files $uri $uri/ /index.php?$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
            
            # Переменные окружения
            fastcgi_param YII_ENV prod;
            fastcgi_param YII_DEBUG 0;
        }
    }
    
    # Статические файлы backend
    location /assets/ {
        root /var/www/vacancy-system/backend/web;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Frontend (Nuxt.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Health check
    location /health {
        root /var/www/vacancy-system/backend/web;
        try_files $uri /index.php?$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_param YII_ENV prod;
            fastcgi_param YII_DEBUG 0;
        }
    }
    
    # Безопасность
    location ~ /\.(htaccess|htpasswd|ini|log|sh|sql|conf)$ {
        deny all;
    }
}
```

Активируй конфигурацию:
```bash
sudo ln -s /etc/nginx/sites-available/vacancy-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Настройка systemd сервисов

### 1. Сервис для Frontend

Создай файл `/etc/systemd/system/vacancy-frontend.service`:

```ini
[Unit]
Description=Vacancy System Frontend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/vacancy-system/frontend
ExecStart=/usr/bin/node .output/server/index.mjs
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
Environment=NUXT_HOST=0.0.0.0
Environment=NUXT_PORT=3000

[Install]
WantedBy=multi-user.target
```

Запусти сервис:
```bash
sudo systemctl enable vacancy-frontend
sudo systemctl start vacancy-frontend
sudo systemctl status vacancy-frontend
```

### 2. Сервис для очистки логов (опционально)

Создай файл `/etc/systemd/system/vacancy-cleanup.service`:

```ini
[Unit]
Description=Vacancy System Log Cleanup

[Service]
Type=oneshot
ExecStart=/bin/find /var/www/vacancy-system/backend/runtime/logs -name "*.log" -mtime +30 -delete
```

И таймер `/etc/systemd/system/vacancy-cleanup.timer`:

```ini
[Unit]
Description=Run vacancy cleanup daily

[Timer]
OnCalendar=daily
Persistent=true

[Install]
WantedBy=timers.target
```

Активируй таймер:
```bash
sudo systemctl enable vacancy-cleanup.timer
sudo systemctl start vacancy-cleanup.timer
```

## Настройка SSL сертификата

### Установка Certbot

```bash
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx

# CentOS/RHEL
sudo yum install certbot python3-certbot-nginx
```

### Получение сертификата

```bash
sudo certbot --nginx -d mytests.space --email troum@outlook.com --agree-tos --no-eff-email
```

### Автоматическое обновление

```bash
# Добавь в crontab
sudo crontab -e

# Добавь строку:
0 12 * * * /usr/bin/certbot renew --quiet
```

## Мониторинг и логи

### Настройка логирования

```bash
# Создание директорий для логов
sudo mkdir -p /var/log/vacancy-system
sudo chown www-data:www-data /var/log/vacancy-system
```

### Ротация логов

Создай файл `/etc/logrotate.d/vacancy-system`:

```
/var/log/nginx/vacancy_*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
    postrotate
        systemctl reload nginx
    endscript
}

/var/www/vacancy-system/backend/runtime/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 0644 www-data www-data
}
```

## Резервное копирование

### Создание скрипта бэкапа

Создай файл `/usr/local/bin/vacancy-backup.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/vacancy-system"
DATE=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="vacancy_backup_$DATE"

mkdir -p $BACKUP_DIR

# Бэкап базы данных
mysqldump -u vacancy_user -p'!1029QPwo!' vacancy_db > $BACKUP_DIR/${BACKUP_NAME}_database.sql

# Бэкап файлов
tar -czf $BACKUP_DIR/${BACKUP_NAME}_files.tar.gz \
    --exclude='node_modules' \
    --exclude='vendor' \
    --exclude='runtime/cache' \
    --exclude='runtime/debug' \
    /var/www/vacancy-system

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "vacancy_backup_*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "vacancy_backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_NAME"
```

Сделай исполняемым и добавь в cron:
```bash
sudo chmod +x /usr/local/bin/vacancy-backup.sh

# Добавь в crontab для ежедневного бэкапа в 2:00
sudo crontab -e
0 2 * * * /usr/local/bin/vacancy-backup.sh
```

## Проверка развертывания

### Проверка сервисов

```bash
# Статус всех сервисов
sudo systemctl status nginx php8.1-fpm mysql vacancy-frontend

# Проверка портов
sudo netstat -tulpn | grep -E ':80|:443|:3000|:3306'

# Проверка логов
sudo tail -f /var/log/nginx/vacancy_error.log
tail -f /var/www/vacancy-system/backend/runtime/logs/app.log
```

### Тестирование API

```bash
# Health check
curl -f http://mytests.space/health

# Проверка API
curl -X POST http://mytests.space/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "troum@outlook.com", "password": "password123", "device_name": "Test"}'
```

## Обновление приложения

### Создание скрипта обновления

Создай файл `/usr/local/bin/vacancy-update.sh`:

```bash
#!/bin/bash

cd /var/www/vacancy-system

# Создание бэкапа перед обновлением
/usr/local/bin/vacancy-backup.sh

# Получение обновлений
git pull origin main

# Обновление backend
cd backend
composer install --no-dev --optimize-autoloader
./yii migrate --interactive=0
./yii cache/flush-all

# Обновление frontend
cd ../frontend
npm install
npm run build

# Перезапуск сервисов
sudo systemctl restart vacancy-frontend
sudo systemctl reload nginx
sudo systemctl reload php8.1-fpm

echo "Update completed successfully!"
```

```bash
sudo chmod +x /usr/local/bin/vacancy-update.sh
```

## Безопасность

### Настройка файрвола

```bash
# Ubuntu (UFW)
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# CentOS (firewalld)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### Дополнительная безопасность

```bash
# Установка fail2ban
sudo apt install fail2ban

# Базовая конфигурация fail2ban
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Устранение неполадок

### Проверка PHP

```bash
# Проверка PHP-FPM
sudo systemctl status php8.1-fpm
sudo tail -f /var/log/php8.1-fpm.log

# Проверка PHP конфигурации
php -v
php -m | grep -E 'mysql|json|mbstring'
```

### Проверка базы данных

```bash
# Подключение к базе данных
mysql -u vacancy_user -p'!1029QPwo!' vacancy_db

# Проверка таблиц
SHOW TABLES;
```

### Проверка Nginx

```bash
# Тест конфигурации
sudo nginx -t

# Перезагрузка конфигурации
sudo systemctl reload nginx
```

## Заключение

После выполнения всех шагов у тебя будет полностью рабочая система управления вакансиями:

- **Backend:** Yii2 на PHP 8.1 + MySQL
- **Frontend:** Nuxt.js на Node.js 20  
- **Веб-сервер:** Nginx с SSL
- **Мониторинг:** Логи и systemd сервисы
- **Безопасность:** SSL, файрвол, fail2ban
- **Бэкапы:** Автоматическое резервное копирование

Приложение будет доступно по адресу: **https://mytests.space**

