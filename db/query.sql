\c bossmode_db;

--View all employees
SELECT 
    e.id, 
    e.first_name, 
    e.last_name, 
    r.title, 
    d.name AS department, 
    r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager 
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON m.id = e.manager_id
ORDER BY e.last_name;

--View all Roles
SELECT
    r.id,
    r.title,
    r.salary,
    d.name AS department
FROM role r
INNER JOIN department d ON r.department_id = d.id
ORDER BY r.title;

--View all Departments
SELECT 
    id, 
    name AS department 
FROM department 
ORDER BY department;