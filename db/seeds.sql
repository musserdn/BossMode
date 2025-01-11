\c bossmode_db

INSERT INTO department (name)
VALUES ('Engineering'),
('Sales'),
('Finance'),
('Legal'),
('Product'),
('Marketing'),
('Human Resources'),
('Operations'),
('Properties'),
('Supply Chain');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
('Senior Software Engineer', 120000, 1),
('Sales Associate', 50000, 2),
('Sales Manager', 80000, 2),
('Accountant', 60000, 3),
('Finance Manager', 90000, 3),
('Legal Assistant', 50000, 4),
('Legal Counsel', 80000, 4),
('Product Manager', 100000, 5),
('Marketing Associate', 60000, 6),
('Marketing Manager', 90000, 6),
('HR Assistant', 50000, 7),
('HR Manager', 80000, 7),
('Operations Associate', 60000, 8),
('Operations Manager', 90000, 8),
('Property Manager', 100000, 9),
('Supply Chain Associate', 60000, 10),
('Supply Chain Manager', 90000, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Smith', 1, NULL),
('Bob', 'Johnson', 2, 1),
('Charlie', 'Brown', 3, NULL),
('David', 'White', 4, 3),
('Eve', 'Black', 5, NULL),
('Frank', 'Green', 6, 5),
('Grace', 'Blue', 7, NULL),
('Hank', 'Orange', 8, 7),
('Ivy', 'Purple', 9, NULL),
('Jack', 'Red', 10, 9),
('Kelly', 'Yellow', 11, NULL),
('Larry', 'Pink', 12, 11),
('Mandy', 'Cyan', 13, NULL),
('Nancy', 'Magenta', 14, 13),
('Oscar', 'Lime', 15, NULL),
('Patty', 'Teal', 16, 15),
('Quincy', 'Maroon', 17, NULL),
('Randy', 'Olive', 18, 17);