import { pool, connectToDb } from './connection.js';

await connectToDb();

export async function viewAllEmployees() {
    console.log('You selected View All Employees');
    try {
        const { rows } = await pool.query("SELECT e.id, e.first_name, e.last_name, r.title,d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id ORDER BY e.last_name;");
        console.log('viewAllEmployees query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllEmployees query:', err);
        throw err;
    }
};

export async function viewAllRoles() {
    console.log('You selected View All Roles');
    try {
        const { rows } = await pool.query("SELECT r.id,r.title,r.salary,d.name AS department FROM role r INNER JOIN department d ON r.department_id = d.id ORDER BY r.title;");
        console.log('viewAllRoles query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllRoles query:', err);
        throw err;
    }
};

export async function viewAllDepartments() {
    console.log('You selected View All Employees');
    try {
        const { rows } = await pool.query("SELECT id, name AS department FROM department ORDER BY department;");
        console.log('viewAllDepartments query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllDepartments query:', err);
        throw err;
    }
};

export async function addDepartment(newDepartment) {
    console.log('You selected Add Department');
    try {
        const { rows } = await pool.query("INSERT INTO department (name) VALUES ($1)", [newDepartment.name]);
        console.log('addDepartment function executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing insert addDepartment:', err);
        throw err;
    }
};