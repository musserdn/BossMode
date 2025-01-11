import logo from "asciiart-logo";
import inquirer from "inquirer";
import { viewAllEmployees, viewAllRoles, viewAllDepartments, addDepartment } from "./src/query.js";
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
                    viewAllEmployees()
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
                    break;
                case 'View All Roles':
                    viewAllRoles()
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
                    break;
                case 'View All Departments':
                    viewAllDepartments()
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
                    break;
                case 'Add A Department':
                    inquirer.prompt([
                        {
                            name: 'name',
                            message: 'What is the name of the department?',
                        },
                    ]).then((newDepartment) => {
                        addDepartment(newDepartment)
                            .then(() => console.log('Department Added'))
                            .then(() => mainMenu());
                    })
                        .catch((error) => {
                            console.error('Error in View All Departments case:', error);
                            mainMenu();
                        });
                    break;
                case 'Quit':
                    console.log('Amazing Bossmode, see you again soon!');
                    process.exit();
            }
        })
}