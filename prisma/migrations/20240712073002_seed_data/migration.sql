INSERT INTO "Tariff" (id, "timeInterval", savings, options,  price)
VALUES 
('327df335-b73f-4bcb-970a-cc26ece8f32b', '1 час', 0, 'Большая циклорама@#$Дизайнерская мебель@#$Разнообразные аксессуары@#$Комфортабельная гримерка', 4500),
('06084dca-7c0d-4af2-b2dd-d8a10e96a20d', '> 2 часов', 14, 'Большая циклорама@#$Дизайнерская мебель@#$Разнообразные аксессуары@#$Комфортабельная гримерка', 1200),
('d7b83558-5add-49ba-b6d8-1310ad27788a', '3-4 часа', 28, 'Большая циклорама@#$Дизайнерская мебель@#$Разнообразные аксессуары@#$Комфортабельная гримерка', 1000),
('62a3ca95-e306-4648-9fcd-7a1c8de8d50c', '> 5 часов', 35, 'Большая циклорама@#$Дизайнерская мебель@#$Разнообразные аксессуары@#$Комфортабельная гримерка', 900);


-- Equipment
INSERT INTO "Picture" (id, picture, type)
VALUES 
('49f014c7-9c01-400c-ace6-490896838b9d', null,  null),
('57adae36-64ab-4d77-ba70-8dd272877bac', null,  null),
('ca97fb08-becf-4e27-8edf-5c098205809e', null,  null),
('a18bfbca-f558-4b21-a15f-e6c73aed1561', null,  null);

INSERT INTO "Equipment" (id, title, description, type, "pictureId")
VALUES 
('574689ee-ff18-44f6-8bd9-b52eb6cb26d9', 'Godox Sk300II', 'Комплект студийного света', 'EQUIPMENT', '49f014c7-9c01-400c-ace6-490896838b9d'),
('36336b49-eff3-4c9a-b205-7d9d7532bdf5', 'Fotokvant BF-300B', 'Светодиодный осветитель', 'EQUIPMENT', '57adae36-64ab-4d77-ba70-8dd272877bac'),
('757aa8df-1622-4f0f-8de2-99c6cd65e9f0', 'от 60х60см до 80х120см', 'Софтбоксы', 'EQUIPMENT', 'ca97fb08-becf-4e27-8edf-5c098205809e'),
('48537786-e138-40a1-a6c6-25e4ca6412a5', '120 и 140см', 'Октабоксы', 'EQUIPMENT', 'a18bfbca-f558-4b21-a15f-e6c73aed1561');

-- Favor
INSERT INTO "Picture" (id, picture, type)
VALUES 
('704d7014-cc95-401d-a73e-4dbebdeaf560', null,  null),
('5cf6ccce-cd32-4982-8d8c-131d5c59ed3c', null,  null),
('e4ac75e8-06d0-4aef-aa5f-dd4c97046034', null,  null),
('a8a28bb0-3d89-4050-a511-760ad1aee4af', null,  null);

INSERT INTO "Favor" (id, title, description, "order", count, "pictureId")
VALUES 
('5579ebb6-4375-4fb5-a1d1-402d85bed752', 'Платья в аренду', 'У нас много одежды для ваших сьемок', 0, '38 платьев', '704d7014-cc95-401d-a73e-4dbebdeaf560'),
('602c57b2-fac5-491b-bf8b-6097f252a0de', 'Аренда оборудования', 'У нас много оборудования!', 1, '60 оборудований', '5cf6ccce-cd32-4982-8d8c-131d5c59ed3c'),
('db3eeb4a-bb1b-4dd2-a77c-450d107ed490', 'Ассистент на сьемку', '1000 ₽ / час   9000 ₽ / 10 часов', 2, '', 'e4ac75e8-06d0-4aef-aa5f-dd4c97046034'),
('e01fb4f0-edbb-4ef3-9f09-4765cdcf51f8', 'Аренда реквизита', 'У нас много классного реквезита для ваших сьемок', 3, '38 предметов', 'a8a28bb0-3d89-4050-a511-760ad1aee4af');


-- Filming
INSERT INTO "Picture" (id, picture, type)
VALUES 
('382a4a5c-8555-4329-ab6e-3212d9aafdc0', null,  null),
('e463a386-5475-48ae-800a-4d59b49a5e4e', null,  null),
('4916e275-059e-44d9-9c08-59d371fca9d6', null,  null),
('af60e668-47c1-41fb-9893-0df48cb625bd', null,  null);

INSERT INTO "Filming" (id, title, description, "order", price, "otherPrice", "pictureId")
VALUES
('d398b7cf-6007-47f1-a3de-acfa9b2ebafd', 'Аренда фотостудии',  'Хит', 0, 900, null, '382a4a5c-8555-4329-ab6e-3212d9aafdc0'),
('4bd77d27-c9eb-4178-bba4-4773fb48a4aa', 'Фотограф Дарья',  '8 лет опыта', 1, 4500, 1000, 'e463a386-5475-48ae-800a-4d59b49a5e4e'),
('821d31bd-53e3-4bd7-92af-f2c6b72177fa', 'Фотограф Александр', '14 лет опыта', 2, 7500, 1000, '4916e275-059e-44d9-9c08-59d371fca9d6'),
('cbda57c3-013f-4c50-b576-782f0a3df626', 'Абонимент на фотосъемку',  '', 3, 900, null, 'af60e668-47c1-41fb-9893-0df48cb625bd');

-- NEWS
INSERT INTO "Picture" (id, picture, type)
VALUES ('b486a497-82aa-419a-9921-b3a567fff653', null, null);

INSERT INTO "News" (id, title, description, date, subject, time, "pictureId")
VALUES ('8f1fc584-faf7-470c-b07c-66ee74c393fc', 'Студийные источники света: как использовать разные виды оборудования', 
'Солнечный свет довольно просто задействовать в создании фото и видео, однако в зависимости от места, погодных условий и времени суток он может создавать совершенно непредсказуемый оттенок и уровень контрастности. Обрести полный контроль над процессом съёмки в студии помогают искусственные источники света. Конечно, с ними связан ряд сложностей: высокие цены, особенности транспортировки и прочие неудобства.', 
'2024-06-15T00:00:00.000Z', 'Оборудование', 5, 'b486a497-82aa-419a-9921-b3a567fff653');



-- Collage Header
INSERT INTO "Picture" (id, picture, type)
VALUES 
('96a5e263-4731-459b-88ce-cfffda3f53f6', null,  null),
('08034fcd-4403-4768-81bc-c9f9828726db', null,  null),
('8bd95fd0-9b5f-4e0d-a1b1-fff95281db5b', null,  null);

INSERT INTO "Collage" (id, "pictureId", type, "order")
VALUES 
('8a318dd3-199d-4e89-99c9-560611a8b859', '96a5e263-4731-459b-88ce-cfffda3f53f6',  'HEADER', 0),
('b5ee4bc4-7722-4a92-bf2e-46c1f98aad27', '08034fcd-4403-4768-81bc-c9f9828726db',  'HEADER', 1),
('a0412569-d16f-442b-aaa8-203a936fe560', '8bd95fd0-9b5f-4e0d-a1b1-fff95281db5b',  'HEADER', 2);

-- Collage FOOTER
INSERT INTO "Picture" (id, picture, type)
VALUES 
('a8b2aef7-2b3d-462d-8bcd-79cea4e9a4f6', null,  null),
('7b8e5a80-a42e-4bb2-b38a-6f2e20e08265', null,  null),
('8126ed39-f55b-4790-ab0c-490686ff66dc', null,  null),
('6f13ab40-791e-49cc-bf37-25bfa986de7e', null,  null),
('6dfaee3f-7a5d-40ed-add3-438afdb1a7cc', null,  null),
('00ec2c25-bbb9-4bda-8a54-aabf84d131e1', null,  null),
('b0bb4c39-9909-471d-8049-c33fca3f1fce', null,  null);

INSERT INTO "Collage" (id, "pictureId", type, "order")
VALUES 
('fabca99c-fe0b-44b8-bdec-28a89f4f963b', 'a8b2aef7-2b3d-462d-8bcd-79cea4e9a4f6',  'FOOTER', 0),
('e8c80cc6-5eaf-4f2e-9ce1-02ff4527158b', '7b8e5a80-a42e-4bb2-b38a-6f2e20e08265',  'FOOTER', 1),
('449a9ef3-1a87-4e38-8803-a5376df5f407', '8126ed39-f55b-4790-ab0c-490686ff66dc',  'FOOTER', 2),
('6232a1e3-7126-4521-b331-3b9bd7ab2d82', '6f13ab40-791e-49cc-bf37-25bfa986de7e',  'FOOTER', 3),
('a8f67e9b-32d1-47d3-9f9b-6fd03cf3c3a3', '6dfaee3f-7a5d-40ed-add3-438afdb1a7cc',  'FOOTER', 4),
('b199c17c-7610-45e5-9d1a-adec34e4dc04', '00ec2c25-bbb9-4bda-8a54-aabf84d131e1',  'FOOTER', 5),
('a95d7a0b-cbe3-4b00-a131-494cba599516', 'b0bb4c39-9909-471d-8049-c33fca3f1fce',  'FOOTER', 6);

-- Collage Favor
INSERT INTO "Picture" (id, picture, type)
VALUES 
('b5c0926f-28a2-4a20-9674-999c63f009d0', null,  null),
('d362daf0-53c4-4c0f-8f71-3698d72d4372', null,  null);

INSERT INTO "Collage" (id, "pictureId", type, "order")
VALUES 
('95159e47-a80c-43fc-b505-2f13ce388ae8', 'b5c0926f-28a2-4a20-9674-999c63f009d0',  'HEADER', 0),
('cb4d59c2-4cef-4d35-9929-5f2e8479abcb', 'd362daf0-53c4-4c0f-8f71-3698d72d4372',  'HEADER', 1);

-- Promotion
INSERT INTO "Picture" (id, picture, type)
VALUES 
('e4aee6e7-97ff-4d33-8806-67c8d1446a83', null,  null),
('76b3a45f-d170-435e-b5e7-79b1f28c66e5', null,  null),
('3219c218-c74f-40fc-953c-417463eaac7b', null,  null),

('24716174-9237-466d-87a0-6c230cd8112c', null,  null),
('991ff55d-84ed-4015-8aca-98223cf40ed3', null,  null),
('a9c29a8a-1a21-47c8-870e-245e9072b179', null,  null);

INSERT INTO "Promotion" (id, title, description, savings, subject, time, date, "pictureId")
VALUES 
('cf581cd3-6ea9-4593-871a-4619121cba61', 'В ваш День Рождения подарим скидку -20%', 
'На аренду фотостудии и вещей или -5% на фотосессию у штатного фотографа (пакет)', 
 20, 'Акции', 3, '2024-07-10T00:00:00.000Z', 'e4aee6e7-97ff-4d33-8806-67c8d1446a83'),
('65d959fc-2d67-41cc-a6ce-6c762aa590ac', 'В ваш День Рождения подарим скидку -20%', 
'На аренду фотостудии и вещей или -5% на фотосессию у штатного фотографа (пакет)', 
 20, 'Акции', 3, '2024-07-08T00:00:00.000Z', '76b3a45f-d170-435e-b5e7-79b1f28c66e5'),
 ('86912941-10d8-431a-bc90-2714e9371780', 'В ваш День Рождения подарим скидку -20%', 
'На аренду фотостудии и вещей или -5% на фотосессию у штатного фотографа (пакет)', 
 20, 'Акции', 3, '2024-07-06T00:00:00.000Z', '3219c218-c74f-40fc-953c-417463eaac7b'),


 ('8f1fc584-faf7-470c-b07c-66ee74c393fc', 'Бронировании любого зала от 3-х часов', 
'От 6-ти часов скидка -25%. От 9-ти часов -30%. Действительно только по будням. Применяется автоматически.', 
 25, 'Акции', 7, '2024-07-09T00:00:00.000Z', '24716174-9237-466d-87a0-6c230cd8112c'),
 ('8c02a089-957b-4364-9f68-780b6b547059', 'Бронировании любого зала от 3-х часов', 
'От 6-ти часов скидка -25%. От 9-ти часов -30%. Действительно только по будням. Применяется автоматически.', 
 25, 'Акции', 7, '2024-07-07T00:00:00.000Z', '991ff55d-84ed-4015-8aca-98223cf40ed3'),
 ('b9c8c831-2085-4a7f-8958-521d5bbd628f', 'Бронировании любого зала от 3-х часов', 
'От 6-ти часов скидка -25%. От 9-ти часов -30%. Действительно только по будням. Применяется автоматически.', 
 25, 'Акции', 7, '2024-07-05T00:00:00.000Z', 'a9c29a8a-1a21-47c8-870e-245e9072b179');


 -- Equipment дубликаты разных типов
INSERT INTO "Picture" (id, picture, type)
VALUES 
('6eaa5312-b822-4fb1-99b0-1d8641d19566', null,  null),
('96f55754-30cb-4fb9-befc-35c486e49ffe', null,  null),
('42c9423a-4fb9-4de7-9936-72e0416e3636', null,  null),
('0f9ba1eb-7e61-4dee-abe7-7fa47c940aed', null,  null);

INSERT INTO "Equipment" (id, title, description, type, "pictureId")
VALUES 
('94e5aeb7-1eda-4b98-82cf-b4e8d635fb4e', 'Платье', 'Красное', 'DRESS', '6eaa5312-b822-4fb1-99b0-1d8641d19566'),
('3cc7d72a-1221-4166-9b09-d3345191cc1c', 'Платье', 'Чёрное', 'DRESS', '96f55754-30cb-4fb9-befc-35c486e49ffe'),
('c0f601f0-ecda-4c03-9de7-4fa196e5c9da', 'Платье', 'Зелёное', 'DRESS', '42c9423a-4fb9-4de7-9936-72e0416e3636'),
('e6686743-2300-437d-890b-ee90fc44dc5c', 'Платье', 'Синее', 'DRESS', '0f9ba1eb-7e61-4dee-abe7-7fa47c940aed');

INSERT INTO "Picture" (id, picture, type)
VALUES 
('c376534f-2bfa-4bcf-970b-9b76fdc682c0', null,  null),
('f20ab86c-5c46-4c4d-808f-062073e0cb54', null,  null),
('288d0e4c-a695-4c2e-a796-8ff2decacb97', null,  null),
('e2cc3de5-077d-4b71-9323-96be0fc17b44', null,  null);

INSERT INTO "Equipment" (id, title, description, type, "pictureId")
VALUES 
('419af6fd-c011-4cc6-a77f-15894088b2dc', 'Кресло', 'Красное', 'REQUISITE', 'c376534f-2bfa-4bcf-970b-9b76fdc682c0'),
('a6160f48-373a-4408-92e8-2dc991073a08', 'Кресло', 'Чёрное', 'REQUISITE', 'f20ab86c-5c46-4c4d-808f-062073e0cb54'),
('d572fcae-002e-466c-a672-84867c7a3855', 'Кресло', 'Зелёное', 'REQUISITE', '288d0e4c-a695-4c2e-a796-8ff2decacb97'),
('56572e10-b81d-4417-bf28-4c732a6b9be1', 'Кресло', 'Синее', 'REQUISITE', 'e2cc3de5-077d-4b71-9323-96be0fc17b44');