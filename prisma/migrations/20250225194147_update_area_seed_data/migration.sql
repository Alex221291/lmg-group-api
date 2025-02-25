INSERT INTO "areas" (id, number, lat, lon, name, status, "createdAt", "updatedAt")
VALUES
    (gen_random_uuid(), 24, 59.827415, 29.398607, 'Ломоносовский', 'PUBLISHED', NOW(), NOW()),
    (gen_random_uuid(), 25, 59.568410, 30.122892, 'Гатчина', 'PUBLISHED', NOW(), NOW());