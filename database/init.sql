-- Создание базы данных если не существует
CREATE DATABASE IF NOT EXISTS vacancy_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Использование созданной базы данных
USE vacancy_db;

-- Создание пользователя для приложения
CREATE USER IF NOT EXISTS 'vacancy_user'@'%' IDENTIFIED BY 'vacancy_password';
GRANT ALL PRIVILEGES ON vacancy_db.* TO 'vacancy_user'@'%';

-- Применение привилегий
FLUSH PRIVILEGES;

-- Базовые настройки MySQL для производительности
SET GLOBAL innodb_buffer_pool_size = 128M;
SET GLOBAL max_connections = 200;
SET GLOBAL query_cache_size = 32M;
SET GLOBAL query_cache_type = 1;

