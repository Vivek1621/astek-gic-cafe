 INSERT INTO EmployeeCafe (employee_id, cafe_id, start_date) VALUES
('UI20001001', (SELECT id FROM Cafe WHERE name = 'Cafe Delight'), '2023-04-06'),
('UI20001002', (SELECT id FROM Cafe WHERE name = 'Cafe Delight'), '2023-05-07'),
('UI20001003', (SELECT id FROM Cafe WHERE name = 'Cafe Delight'), '2022-11-09'),
('UI20001004', (SELECT id FROM Cafe WHERE name = 'Cafe Delight'), '2020-02-02'),
('UI20001005', (SELECT id FROM Cafe WHERE name = 'Java Junction'), '2020-04-02'),
('UI20001006', (SELECT id FROM Cafe WHERE name = 'Java Junction'), '2022-11-01'),
('UI20001007', (SELECT id FROM Cafe WHERE name = 'Java Junction'), '2018-04-28'),
('UI20001008', (SELECT id FROM Cafe WHERE name = 'Caffeine Haven'), '2023-06-22'),
('UI20001009', (SELECT id FROM Cafe WHERE name = 'Caffeine Haven'), '2023-03-18'),
('UI20001010', (SELECT id FROM Cafe WHERE name = 'Caffeine Haven'), '2023-05-06'),
('UI20001011', (SELECT id FROM Cafe WHERE name = 'Perk Up Cafe'), '2020-03-06'),
('UI20001012', (SELECT id FROM Cafe WHERE name = 'Perk Up Cafe'), '2019-07-07'),
('UI20001013', (SELECT id FROM Cafe WHERE name = 'Perk Up Cafe'), '2022-11-09'),
('UI20001014', (SELECT id FROM Cafe WHERE name = 'Brewed Awakenings'), '2020-06-15'),
('UI20001015', (SELECT id FROM Cafe WHERE name = 'Brewed Awakenings'), '2020-03-23'),
 ('UI20001016', '', null),
 ('UI20001017', '', null),
 ('UI20001018', '', null),
 ('UI20001019', '', null),
 ('UI20001020', '', null),
 ('UI20001021', '', null);