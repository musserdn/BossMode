import { pool, connectToDb } from './connection.js';

await connectToDb();

export async function queryAllEmployees() {
    console.log('You selected View All Employees');
    try {
        const { rows } = await pool.query(`
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
        ORDER BY e.last_name;`);
        console.log('viewAllEmployees query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllEmployees query:', err);
        throw err;
    }
};

export async function queryAddEmployee(newEmployee) {
    console.log('You selected Add Employee');
    try {
        const query = `
            INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [newEmployee.first_name, newEmployee.last_name, newEmployee.role_id, newEmployee.manager_id];
        const { rows } = await pool.query(query, values);
        console.log('addEmployee function executed successfully');
        return rows[0]; // Return the inserted role
    } catch (err) {
        console.error('Error executing insert addEmployee:', err);
        throw err;
    }
};

export async function queryUpdateEmployeeRole(newEmployeeRole) {
    console.log('You selected Update An Employee Role');
    try {
        const query = `
            UPDATE employee
            SET role_id = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [newEmployeeRole.role_id, newEmployeeRole.id];
        const { rows } = await pool.query(query, values);
        console.log('queryUpdateEmployeeRole function executed successfully');
        return rows[0]; // Return the inserted role
    } catch (err) {
        console.error('Error executing insert queryUpdateEmployeeRole:', err);
        throw err;
    }
};


export async function queryAllRoles() {
    console.log('You selected View All Roles');
    try {
        const { rows } = await pool.query(`
            SELECT
                r.id,
                r.title,
                 r.salary,
                d.name AS department
            FROM role r
            INNER JOIN department d ON r.department_id = d.id
            ORDER BY r.title;`);
        console.log('viewAllRoles query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllRoles query:', err);
        throw err;
    }
};

export async function queryAllDepartments() {
    console.log('You selected View All Departments');
    try {
        const { rows } = await pool.query(`
            SELECT 
                id, 
                name AS department 
            FROM department
            ORDER BY department;`);
        console.log('viewAllDepartments query executed successfully');
        return rows;
    } catch (err) {
        console.error('Error executing viewAllDepartments query:', err);
        throw err;
    }
};

export async function queryAddDepartment(newDepartment) {
    console.log('You selected Add Department');
    try {
        const { rows } = await pool.query(`
            INSERT INTO department (name)
            VALUES ($1) 
            RETURNING *`, [newDepartment.name]);
        console.log('queryAddDepartment function executed successfully');
        return rows[0];
    } catch (err) {
        console.error('Error executing insert addDepartment:', err);
        throw err;
    }
};

export async function queryAddRole(newRole) {
    console.log('You selected Add Role');
    try {
        const query = `
            INSERT INTO role (title, salary, department_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [newRole.title, newRole.salary, newRole.department_id];
        const { rows } = await pool.query(query, values);
        console.log('addRole function executed successfully');
        return rows[0]; // Return the inserted role
    } catch (err) {
        console.error('Error executing insert addRole:', err);
        throw err;
    }
}