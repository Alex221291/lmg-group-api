-- Очистка таблицы areas
TRUNCATE TABLE "areas" RESTART IDENTITY CASCADE;

-- Вставка данных по районам Санкт-Петербурга
INSERT INTO "areas" (id, number, lat, lon, name, title, description, "subTitle", status, "pictureId", "createdAt", "updatedAt")
VALUES
    (gen_random_uuid(), 1, 59.9127, 30.3127, 'Адмиралтейский', 'Адмиралтейский район', 'Описание Адмиралтейского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 2, 59.9412, 30.2552, 'Василеостровский', 'Василеостровский район', 'Описание Василеостровского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 3, 59.9663, 30.3104, 'Выборгский', 'Выборгский район', 'Описание Выборгского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 4, 59.9323, 30.3639, 'Калининский', 'Калининский район', 'Описание Калининского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 5, 59.9292, 30.4383, 'Кировский', 'Кировский район', 'Описание Кировского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 6, 59.8846, 30.2650, 'Красногвардейский', 'Красногвардейский район', 'Описание Красногвардейского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 7, 59.9853, 30.2749, 'Красносельский', 'Красносельский район', 'Описание Красносельского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 8, 59.9108, 30.3499, 'Московский', 'Московский район', 'Описание Московского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 9, 59.9788, 30.3415, 'Невский', 'Невский район', 'Описание Невского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 10, 59.8581, 30.3189, 'Петроградский', 'Петроградский район', 'Описание Петроградского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 11, 59.9936, 30.3155, 'Приморский', 'Приморский район', 'Описание Приморского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 12, 59.8508, 30.2581, 'Фрунзенский', 'Фрунзенский район', 'Описание Фрунзенского района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW()),
    (gen_random_uuid(), 13, 59.9578, 30.3302, 'Центральный', 'Центральный район', 'Описание Центрального района', 'Подзаголовок', 'PUBLISHED', NULL, NOW(), NOW());
