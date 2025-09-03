#!/bin/bash

# Скрипт для развертывания проекта
set -e

echo "🚀 Ручное развертывание системы управления вакансиями"
echo "=============================================="

# Проверка прав root
if [[ $EUID -eq 0 ]]; then
   echo "❌ Не запускай этот скрипт от root! Используй sudo при необходимости."
   exit 1
fi

# Проверка ОС
if [[ ! -f /etc/lsb-release ]] && [[ ! -f /etc/redhat-release ]]; then
    echo "❌ Поддерживаются только Ubuntu/Debian и CentOS/RHEL"
    exit 1
fi

# Определение ОС
if [[ -f /etc/lsb-release ]]; then
    OS="ubuntu"
    PKG_MANAGER="apt"
elif [[ -f /etc/redhat-release ]]; then
    OS="centos"
    PKG_MANAGER="yum"
fi

echo "📋 Обнаружена ОС: $OS"

# Функция установки пакетов
install_packages() {
    if [[ $OS == "ubuntu" ]]; then
        sudo apt update
        sudo apt install -y $@
    else
        sudo yum install -y $@
    fi
}

# 1. Установка основных компонентов
echo "📦 Установка основных компонентов..."

if [[ $OS == "ubuntu" ]]; then
    # PHP 8.1
    sudo add-apt-repository ppa:ondrej/php -y
    sudo apt update
    install_packages php8.1 php8.1-fpm php8.1-mysql php8.1-json \
        php8.1-zip php8.1-gd php8.1-mbstring php8.1-curl \
        php8.1-xml php8.1-bcmath php8.1-intl php8.1-opcache
    
    # MySQL/MariaDB
    install_packages mariadb-server mariadb-client
    
    # Nginx
    install_packages nginx
    
    # Node.js 20
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    install_packages nodejs
    
else
    # CentOS/RHEL
    sudo yum install epel-release -y
    sudo yum install https://rpms.remirepo.net/enterprise/remi-release-8.rpm -y
    sudo yum module enable php:remi-8.1 -y
    
    install_packages php php-fpm php-mysql php-json php-zip \
        php-gd php-mbstring php-curl php-xml php-bcmath \
        php-intl php-opcache mariadb-server mariadb nginx
    
    # Node.js
    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
    install_packages nodejs
fi

# Composer
echo "📦 Установка Composer..."
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer

# 2. Запуск сервисов
echo "🔄 Запуск сервисов..."
sudo systemctl enable mariadb nginx php8.1-fpm
sudo systemctl start mariadb nginx php8.1-fpm

# 3. Настройка базы данных
echo "🗃️ Настройка базы данных..."
read -p "Введи пароль для root MySQL: " MYSQL_ROOT_PASSWORD
read -p "Введи пароль для пользователя vacancy_user: " DB_PASSWORD

sudo mysql -e "
CREATE DATABASE IF NOT EXISTS vacancy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'vacancy_user'@'localhost' IDENTIFIED BY '$DB_PASSWORD';
GRANT ALL PRIVILEGES ON vacancy_db.* TO 'vacancy_user'@'localhost';
FLUSH PRIVILEGES;
"

# 4. Клонирование проекта
echo "📥 Клонирование проекта..."
sudo mkdir -p /var/www
cd /var/www

if [[ -d vacancy-system ]]; then
    echo "Директория vacancy-system уже существует. Обновляю..."
    cd vacancy-system
    git pull origin main
else
    sudo git clone https://github.com/Troum/fixparice-test.git vacancy-system
fi

sudo chown -R $USER:www-data vacancy-system
cd vacancy-system

# 5. Настройка Backend
echo "⚙️ Настройка Backend..."
cd backend

# Установка зависимостей
composer install --no-dev --optimize-autoloader

# Настройка прав
sudo chown -R www-data:www-data runtime web/assets
sudo chmod -R 775 runtime web/assets

# Создание конфигурации БД
cat > config/db.php << EOF
<?php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=vacancy_db',
    'username' => 'vacancy_user',
    'password' => '$DB_PASSWORD',
    'charset' => 'utf8mb4',
];
EOF

# Миграции
./yii migrate --interactive=0

# Создание администратора
read -p "Введи email администратора: " ADMIN_EMAIL
read -p "Введи пароль администратора: " ADMIN_PASSWORD
./yii seed/create-user "$ADMIN_EMAIL" "$ADMIN_PASSWORD"

# 6. Настройка Frontend
echo "🎨 Настройка Frontend..."
cd ../frontend

# Установка зависимостей
npm install

# Настройка API endpoint
read -p "Введи домен (например, mytests.space): " DOMAIN

# Обновление конфигурации
sed -i "s|apiBase:.*|apiBase: 'https://$DOMAIN/api'|" nuxt.config.ts

# Сборка
npm run build

# 7. Настройка Nginx
echo "🌐 Настройка Nginx..."
sudo tee /etc/nginx/sites-available/vacancy-system > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN;
    
    location /api/ {
        root /var/www/vacancy-system/backend/web;
        try_files \$uri \$uri/ /index.php?\$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_param YII_ENV prod;
            fastcgi_param YII_DEBUG 0;
        }
    }
    
    location /assets/ {
        root /var/www/vacancy-system/backend/web;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /health {
        root /var/www/vacancy-system/backend/web;
        try_files \$uri /index.php?\$query_string;
        
        location ~ \.php$ {
            fastcgi_pass unix:/run/php/php8.1-fpm.sock;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME \$document_root\$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_param YII_ENV prod;
            fastcgi_param YII_DEBUG 0;
        }
    }
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Активация конфигурации
sudo ln -sf /etc/nginx/sites-available/vacancy-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 8. Настройка systemd сервиса для Frontend
echo "🔧 Настройка systemd сервиса..."
sudo tee /etc/systemd/system/vacancy-frontend.service > /dev/null << EOF
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
EOF

sudo systemctl enable vacancy-frontend
sudo systemctl start vacancy-frontend

# 9. Настройка SSL (опционально)
read -p "Хочешь настроить SSL сертификат? (y/n): " SETUP_SSL
if [[ $SETUP_SSL == "y" || $SETUP_SSL == "Y" ]]; then
    echo "🔒 Настройка SSL..."
    
    if [[ $OS == "ubuntu" ]]; then
        install_packages certbot python3-certbot-nginx
    else
        install_packages certbot python3-certbot-nginx
    fi
    
    sudo certbot --nginx -d $DOMAIN --email $ADMIN_EMAIL --agree-tos --no-eff-email --non-interactive
fi

# 10. Настройка файрвола
echo "🛡️ Настройка файрвола..."
if [[ $OS == "ubuntu" ]]; then
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    sudo ufw --force enable
else
    sudo firewall-cmd --permanent --add-service=ssh
    sudo firewall-cmd --permanent --add-service=http
    sudo firewall-cmd --permanent --add-service=https
    sudo firewall-cmd --reload
fi

# 11. Создание скрипта бэкапа
echo "💾 Создание скрипта бэкапа..."
sudo tee /usr/local/bin/vacancy-backup.sh > /dev/null << EOF
#!/bin/bash
BACKUP_DIR="/var/backups/vacancy-system"
DATE=\$(date +"%Y%m%d_%H%M%S")
mkdir -p \$BACKUP_DIR
mysqldump -u vacancy_user -p'$DB_PASSWORD' vacancy_db > \$BACKUP_DIR/vacancy_backup_\${DATE}_database.sql
tar -czf \$BACKUP_DIR/vacancy_backup_\${DATE}_files.tar.gz /var/www/vacancy-system
find \$BACKUP_DIR -name "vacancy_backup_*.sql" -mtime +30 -delete
find \$BACKUP_DIR -name "vacancy_backup_*.tar.gz" -mtime +30 -delete
EOF

sudo chmod +x /usr/local/bin/vacancy-backup.sh

# Добавление в cron
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/vacancy-backup.sh") | crontab -

echo ""
echo "🎉 Развертывание завершено успешно!"
echo ""
echo "📋 Информация о развертывании:"
echo "   Домен: https://$DOMAIN"
echo "   Админ: $ADMIN_EMAIL"
echo "   Backend: https://$DOMAIN/api"
echo "   Health: https://$DOMAIN/health"
echo ""
echo "🔍 Проверка сервисов:"
echo "   sudo systemctl status nginx php8.1-fpm mariadb vacancy-frontend"
echo ""
echo "📊 Логи:"
echo "   Backend: tail -f /var/www/vacancy-system/backend/runtime/logs/app.log"
echo "   Nginx: tail -f /var/log/nginx/access.log"
echo "   Frontend: journalctl -u vacancy-frontend -f"
echo ""
echo "💾 Бэкап:"
echo "   Ручной: /usr/local/bin/vacancy-backup.sh"
echo "   Автоматический: каждый день в 02:00"

# Финальная проверка
echo ""
echo "🧪 Тестирование..."
sleep 5

if curl -f -s http://localhost/health > /dev/null; then
    echo "✅ Backend работает корректно"
else
    echo "⚠️ Проблемы с Backend, проверь логи"
fi

if curl -f -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend работает корректно"
else
    echo "⚠️ Проблемы с Frontend, проверь логи"
fi

echo ""
echo "🌐 Приложение доступно по адресу: https://$DOMAIN"

