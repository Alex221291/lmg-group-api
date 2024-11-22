-- Вставка данных в таблицу Section
INSERT INTO "sections" (id, number, title, description, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 1, 'Реклама в жилых домах, ЖК', 'Описание для рекламы в жилых домах', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 2, 'Реклама в бизнес центрах', 'Описание для рекламы в бизнес центрах', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 3, 'Реклама в торговых центрах', 'Описание для рекламы в торговых центрах', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 4, 'Реклама в фитнес клубах', 'Описание для рекламы в фитнес клубах', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 5, 'Реклама для ПВЗ: Как привлечь клиентов', 'Описание для рекламы для ПВЗ', 'PUBLISHED', NOW(), NOW());

-- Вставка данных в таблицу Area
INSERT INTO "areas" (id, number, name, lat, lon, status, "createdAt", "updatedAt") VALUES
(gen_random_uuid(), 1, 'Адмиралтейский', '59.9311', '30.3162', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 2, 'Василеостровский', '59.9429', '30.2362', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 3, 'Выборгский', '60.0084', '30.3347', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 4, 'Калининский', '59.9714', '30.4484', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 5, 'Кировский', '59.8609', '30.2045', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 6, 'Колпинский', '59.7522', '30.5905', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 7, 'Красногвардейский', '59.9553', '30.4913', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 8, 'Красносельский', '59.8519', '30.2145', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 9, 'Кронштадтский', '59.9938', '29.7702', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 10, 'Курортный', '60.1434', '29.9803', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 11, 'Московский', '59.8506', '30.3199', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 12, 'Невский', '59.9271', '30.5138', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 13, 'Петроградский', '59.9667', '30.3111', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 14, 'Петродворцовый', '59.9064', '29.7726', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 15, 'Приморский', '60.0000', '30.2025', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 16, 'Пушкинский', '59.7166', '30.3964', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 17, 'Фрунзенский', '59.8556', '30.3774', 'PUBLISHED', NOW(), NOW()),
(gen_random_uuid(), 18, 'Центральный', '59.9321', '30.3505', 'PUBLISHED', NOW(), NOW());

-- Вставка связей в таблицу SectionArea
INSERT INTO "section_area" (id, "sectionId", "areaId", status, "createdAt", "updatedAt") 
SELECT gen_random_uuid(), s.id, a.id, 'PUBLISHED', NOW(), NOW() 
FROM "sections" s 
CROSS JOIN "areas" a;
