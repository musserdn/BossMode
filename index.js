import logo from "asciiart-logo";
import inquirer from "inquirer";
import { queryAllEmployees, queryAllRoles, queryAllDepartments, queryaddDepartment, queryaddRole } from "./src/query.js";
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
}

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
                    'Quit'
                ],
            },
        ])
        .then((select) => {
            switch (select.mainMenu) {
                case 'View All Employees':
                    viewAllEmployees();
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
                case 'Quit':
                    console.log('Amazing Bossmode, see you again soon!');
                    process.exit();
                default:
                    console.error('Invalid Selection, try again');
                    mainMenu();
            }
        })
}


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
}

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
}

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

        console.log(answers);
        const newRole = await queryaddRole(answers);
        console.log("New Role:", newRole);
        mainMenu();

    } catch (error) {
        console.error('Error in Add Role prompt:', error);
        mainMenu();
    }
}

function viewAllDepartments() {
    queryAllDepartments()
        .then((rows) => {
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
        })
        .catch((error) => {
            console.error('Error in View All Departments case:', error);
            mainMenu();
        });
}

function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of the department?',
        },
    ]).then((newDepartment) => {
        queryaddDepartment(newDepartment)
            .then(() => console.log('Department Added'))
            .then(() => mainMenu());
    })
        .catch((error) => {
            console.error('Error in View All Departments case:', error);
            mainMenu();
        });
}
