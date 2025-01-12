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


-- view employees by manager
SELECT DISTINCT 
    m.id AS manager_id,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM 
    employee e
LEFT JOIN 
    employee m ON e.manager_id = m.id
WHERE 
    e.manager_id IS NOT NULL
ORDER BY 
    manager;


--  view the total utilized budget of a department—in other words, the combined salaries of all employees in that department 
SELECT 
    d.name AS department,
    ROUND(SUM(r.salary * role_count)) AS budget
FROM (
    SELECT 
        e.role_id,
        COUNT(e.id) AS role_count
    FROM 
        employee e
    GROUP BY 
        e.role_id
) role_counts
INNER JOIN 
    role r ON role_counts.role_id = r.id
INNER JOIN 
    department d ON r.department_id = d.id
GROUP BY 
    d.name
ORDER BY 
    department;