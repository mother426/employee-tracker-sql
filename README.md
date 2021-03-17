# Employee Tracker SQL

This project serves as an 'employee management system' with the use of your editor's CLI. The program uses the inquirer package to collect user inputs, and MySQL to create the database that will store user inputs. 
## Installation and Usage

To use this application, ensure you have [Node.js](https://nodejs.org/en/) and installed onto your machine. 

This application is not deployed on a live site, in order to install this application, you can fork this repository to a github account of your choice. The button to fork is located towards the top right of this repository. 

![Fork Button](/Assets/forkbutton.png)

Once you have a local copy of this repository on your machine, run the command 'npm i' to install the dependencies needed to run this application (inquirer and mysql). The package.json file will install these dependencies when 'npm i' is entered into the CLI.  

![Dependencies for this App](/Assets/dependencies.png)

After you have opened this repository locally and have all required dependencies, the program can be invoked with the command "npm start". 

![npm start](/Assets/npmstart.png)

When the program is invoked, the CLI will guide the user through the program's actions. The program is able to: create departments, create roles, create employees, view departments, view roles, view employees, delete departments, delete roles, delete employees, and update employee roles. 

## App demonstration 

Program invoked, user select 'View employees':

![View Employees demo](/Assets/viewemployeesdemo.gif)

User select 'View departments':

![View Departments Demo](/Assets/viewdepartment.gif)

User select 'View roles':

![View Roles Demo](/Assets/viewroles.gif)

User select 'Add Employee':

![Add employee demo](/Assets/newemployee.gif)

User select 'Add department':

![Add department demo](/Assets/newdepartment.gif)

User select 'Add role':

![Add role demo](/Assets/newrole.gif)

User select 'Remove employee', 'Remove Department', 'Remove role':

![Remove Demo](/Assets/removedemo.gif)

User select 'Update Employee Role':

![Update role demo](/Assets/updaterole.gif)

NOTE: the update role will change a chosen employee's role_id as demonstrated in the GIF above. The role_id corresponds with the id in the 'role' table. 

## Technologies Used for this project
 - [Node.js](https://nodejs.org/en/)
 - [MySQL](https://www.mysql.com/)
 - [JavaScript](https://www.javascript.com/)