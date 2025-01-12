# BossMode

## Description
Our advanced Employee Manager is a sophisticated content management system (CMS) designed to streamline the organization and management of employee data. With this tool, you can effortlessly store and manage information across roles, departments, and managerial hierarchies.

The system features an intuitive, user-friendly menu interface that allows you to interact seamlessly with a centralized PostgreSQL database. This database is built on a robust schema, incorporating three key tables:

1. Department – Manage department-level information.
2. Role – Store details like job titles and salaries.
3. Employee – Maintain employee records, including reporting relationships.

Our solution handles all the complexity for you:

- Queries: Retrieve data with powerful and efficient SQL queries.
- Joins: Seamlessly combine data across tables to gain actionable insights.
- Inserts, Updates, and Deletes: Manage your data with precise control, ensuring accuracy and flexibility.

Whether you’re building reports, updating employee details, or scaling your organization’s structure, the Employee Manager has you covered. It's designed to save time, reduce errors, and keep your data organized—all in one centralized location.

### Limitations
The following features have not yet been implemented in release `1.5.123`
- Update employee managers; and
- Delete departments, roles, and employees.

 ## Table of Contents
 - [Installation](#installation)
 - [Usage](#usage)
 - [Credits](#credits)
 - [License](#license)
 - [Badges](#badges)
 - [Tests](#tests)
 - [Questions](#questions)
  

  ## [Installation](#installation)
  1. Clone this repo locally;
  2. Install dependencies by running `npm i` in your terminal from the root;
  3. `cd` to `db` folder to setup postgres tables by `psql -U postgres` in your terminal.  Run `\i schema.sql` and `\i seeds.sql` and `\q` to quit; and
  4. Run `npm run start` to begin program.

  ## [Usage](#usage)
  Use this to view current employee data, add employees, add roles, add departments or update an employee role.  View a demo of the application here: [Youtube Demo Video](https://youtube.com/playlist?list=PLp5-kLRcKJPc3IzxO8tBtEfKaW1WGHQDz&si=fa7l1BIK_Ir-TNPB).
  
  > 1. Use the up or down arrow to move the the option of your choice.
  > 2. View options will provide you with the current data or prompt your for a specifc manager or department.
  > 3. Add or Update options will have prompts. Type in each field and hit enter. 
  > 4. Select Quit to exit out of program and back to the terminal prompt.
  > 5. Your data is safely stored in the postgres database and will be there the next time you start up bossmode.

  ### Application Screenshot
  ![BossMode Screenshot](.//Assets/bossmode.png)

  ## [Credits](#credits)
  - [asciiart-logo](https://www.npmjs.com/package/asciiart-logo)
  - [cli-table3](https://www.npmjs.com/package/cli-table3)
  - [dotenv](https://www.npmjs.com/package/dotenv)
  - [Inquirer.js](https://www.npmjs.com/package/inquirer)
  - [node-postres](https://www.npmjs.com/package/pg)
  - In Dev
      - [nodemon](https://www.npmjs.com/package/nodemon)
  
  ## [License](#license)
  This project is licensed under the MIT - see the [LICENSE](LICENSE) file for details.

  ## [Badges](#badges)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  ## [Tests](#tests)
   Follow [Usage](#usage) and run application locally. Console logs are provided if any errors occur for tracing.
  
  ## [Questions](#questions)
  If you have any questions, please feel free to reach out to me at musserdn@gmail.com or visit my [GitHub Profile](https://github.com/musserdn/).