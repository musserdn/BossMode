import logo from "asciiart-logo";
import inquirer from "inquirer";
import { queryAllEmployees, queryAllRoles, queryAllDepartments, queryAddDepartment, queryAddRole, queryAddEmployee, queryUpdateEmployeeRole, queryAllManagers, queryAManager, queryADepartment, queryDepartmentBudget } from "./src/query.js";
import CliTable3 from "cli-table3";

start();

function start() {
    console.log(
        logo({
            name: 'Bossmode',
            font: 'Big Money-sw',
            lineChars: 10,
            padding: 1,
            margin: 1,
            borderColor: 'grey',
            logoColor: 'bold-cyan',
            textColor: 'green',
        })
            .right('version 1.5.123')
            .emptyLine()
            .center('The ultimate employee manager solution')
            .render()
    );
    mainMenu();
};

function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'mainMenu',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update An Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add A Department',
                    'View Employees by Manager',
                    'View Employees by Department',
                    'View Budget by Department',
                    'Quit'
                ],
            },
        ])
        .then((select) => {
            switch (select.mainMenu) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Employee':
                    AddEmployees();
                    break;
                case 'Update An Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'Add A Department':
                    addDepartment();
                    break;
                case 'View Employees by Manager':
                    ViewEmployeesbyManager();
                    break;
                case 'View Employees by Department':
                    ViewEmployeesbyDepartment();
                    break;
                case 'View Budget by Department':
                    ViewDepartmentBudget();
                    break;
                case 'Quit':
                    console.log('Amazing Bossmode, see you again soon!');
                    process.exit();
                default:
                    console.error('Invalid Selection, try again');
                    mainMenu();
            }
        })
};


// Breaking out each case into a separate function
function viewAllEmployees() {
    queryAllEmployees()
        .then((rows) => {
            const table = new CliTable3({
                head: ['ID', 'First Name', 'Last Name', 'Title', 'Department', 'Salary', 'Manager'],
                colWidths: [5, 20, 20, 30, 20, 20, 20],
                chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
            });
            rows.forEach(row => {
                table.push([
                    row.id,
                    row.first_name,
                    row.last_name,
                    row.title,
                    row.department,
                    row.salary,
                    row.manager
                ]);
            });
            console.log(table.toString());
            mainMenu();
        })
        .catch((error) => {
            console.error('Error in View All Employees case:', error);
            mainMenu();
        });
};


async function AddEmployees() {
    try {
        const roles = await queryAllRoles();
        const employees = await queryAllEmployees();
        const roleList = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        const managerList = employees.map(emp => ({
            name: emp.first_name + ' ' + emp.last_name,
            value: emp.id
        }));

        managerList.unshift({ name: 'None', value: null });

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the new employee:',
                validate: input => input ? true : 'First name cannot be empty.'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the new employee:',
                validate: input => input ? true : 'Last name cannot be empty.'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the role for the new employee:',
                choices: roleList
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select the manager for the new employee:',
                choices: managerList
            },
        ]);

        const newEmployee = await queryAddEmployee(answers);
        console.log("New Employee:", newEmployee);
        mainMenu();

    } catch (error) {
        console.error('Error in Add Employee:', error);
        mainMenu();
    }
};

async function updateEmployeeRole() {
    try {
        const roles = await queryAllRoles();
        const employees = await queryAllEmployees();
        const roleList = roles.map(role => ({
            name: role.title,
            value: role.id
        }));
        const EmployeeList = employees.map(emp => ({
            name: emp.first_name + ' ' + emp.last_name,
            value: emp.id
        }));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Select the employee to update:',
                choices: EmployeeList
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role for the employee:',
                choices: roleList
            },
        ]);

        const UpdateEmployeeRole = await queryUpdateEmployeeRole(answers);
        console.log("Update Employee Role:", UpdateEmployeeRole);
        mainMenu();

    } catch (error) {
        console.error('Error in update Employee Role:', error);
        mainMenu();
    }
};

function viewAllRoles() {
    queryAllRoles()
        .then((rows) => {
            const table = new CliTable3({
                head: ['ID', 'Title', 'Department', 'Salary'],
                colWidths: [5, 30, 20, 20],
                chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
            });
            rows.forEach(row => {
                table.push([
                    row.id,
                    row.title,
                    row.department,
                    row.salary
                ]);
            });
            console.log(table.toString());
            mainMenu();
        })
        .catch((error) => {
            console.error('Error in View All Roles case:', error);
            mainMenu();
        });
};

async function addRole() {
    try {
        const departments = await queryAllDepartments();


        const departmentList = departments.map(dept => ({
            name: dept.department,
            value: dept.id
        }));

        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the new role:',
                validate: input => input ? true : 'Title cannot be empty.'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Enter the salary for the new role:',
                validate: input => !isNaN(input) ? true : 'Please enter a valid number.'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Select the department for the new role:',
                choices: departmentList
            },
        ]);

        const newRole = await queryAddRole(answers);
        console.log("New Role:", newRole);
        mainMenu();

    } catch (error) {
        console.error('Error in Add Role prompt:', error);
        mainMenu();
    }
};

async function viewAllDepartments() {
    try {
        const rows = await queryAllDepartments();
        const table = new CliTable3({
            head: ['ID', 'Department'],
            colWidths: [5, 30],
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
        });
        rows.forEach(row => {
            table.push([
                row.id,
                row.department
            ]);
        });
        console.log(table.toString());
        mainMenu();

    } catch (error) {
        console.error('Error in View All Departments case:', error);
        mainMenu();
    }
};

async function addDepartment() {
    try {
        const answers = await inquirer.prompt([
            {
                name: 'name',
                message: 'What is the name of the department?',
            },
        ])
        const newDepartment = await queryAddDepartment(answers);
        console.log('New Department:', newDepartment);
        mainMenu();
    } catch (error) {
        console.error('Error in View All Departments case:', error);
        mainMenu();
    }
};

async function ViewEmployeesbyManager() {
    try {
        const managers = await queryAllManagers();
        const managerList = managers.map(emp => ({
            name: emp.manager,
            value: emp.manager_id
        }));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select a manager:',
                choices: managerList
            },
        ]);
        console.log(answers.manager_id);
        const rows = await queryAManager(answers.manager_id);
        const table = new CliTable3({
            head: ['First Name', 'Last Name'],
            colWidths: [20, 20],
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
        });
        rows.forEach(row => {
            table.push([
                row.first_name,
                row.last_name
            ]);
        });
        console.log(table.toString());
        mainMenu();

    } catch (error) {
        console.error('Error in Viewing Employees by Manager:', error);
        mainMenu();
    }
};

async function ViewEmployeesbyDepartment() {
    try {
        const dept = await queryAllDepartments();
        const deptList = dept.map(depts => ({
            name: depts.department,
            value: depts.id
        }));

        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Select a Department:',
                choices: deptList
            },
        ]);
        console.log(answers.department);
        const rows = await queryADepartment(answers.department);
        const table = new CliTable3({
            head: ['First Name', 'Last Name'],
            colWidths: [20, 20],
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
        });
        rows.forEach(row => {
            table.push([
                row.first_name,
                row.last_name
            ]);
        });
        console.log(table.toString());
        mainMenu();

    } catch (error) {
        console.error('Error in Viewing Employees by Department:', error);
        mainMenu();
    }
};

async function ViewDepartmentBudget() {
    try {
        const rows = await queryDepartmentBudget();
        const table = new CliTable3({
            head: ['Department', 'Total Utilized Budget'],
            colWidths: [30, 30],
            chars: { 'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
        });
        rows.forEach(row => {
            table.push([
                row.department,
                row.budget
            ]);
        });
        console.log(table.toString());
        mainMenu();

    } catch (error) {
        console.error('Error in Viewing Budget by Department:', error);
        mainMenu();
    }
};