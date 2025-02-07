BEGIN;

-- Обновление заголовков и описаний записей в таблице "sections"
UPDATE "sections" 
SET 
  title = 'Реклама в жилых домах'
WHERE number = 1;

UPDATE "sections" 
SET 
  title = 'Реклама в бизнес центрах'
WHERE number = 2;

UPDATE "sections" 
SET 
  title = 'Реклама в торговых центрах'
WHERE number = 3;

UPDATE "sections" 
SET 
  title = 'Реклама в фитнес клубах'
WHERE number = 4;

UPDATE "sections" 
SET 
  title = 'Реклама в ПВЗ'
WHERE number = 5;

COMMIT;