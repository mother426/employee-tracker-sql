// Require inquirer and sql to use this program
const inquirer = require("inquirer");
const mysql = require("mysql");

// connection for this program's server
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_DB",
});
// connect message and start prompt when program is started
connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  console.log("Welcome to the employee tracker :)");
  startPrompt();
});
// Intitial prompt that will dictate where the program functions flow
function startPrompt() {
  inquirer
    .prompt({
      type: "list",
      message: "Select one of the following options to get started:",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employee",
        "Add role",
        "Add department",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
        "Update employee role",
        "Quit",
      ],
      name: "option",
    })
    .then(function (result) {
      switch (result.option) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Remove a department":
          removeDepartment();
          break;
        case "Remove a role":
          removeRole();
          break;
        case "Remove an employee":
          removeEmployee();
          break;
        default:
          endPrompt();
      }
    });
}
// functions for program defined below
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Name of this department?",
      name: "name",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.name],
        function (err, res) {
          if (err) throw err;
          startPrompt();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of this role?",
        name: "role",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the department id number for this role?",
        name: "id",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.role, answer.salary, answer.id],
        function (err, res) {
          if (err) throw err;
          startPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is this employee's first name?",
        name: "firstname",
      },
      {
        type: "input",
        message: "What is this employee's last name?",
        name: "lastname",
      },
      {
        type: "input",
        message: "What is this employee's role id number?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is this employee's manager id number?",
        name: "managerID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstname, answer.lastname, answer.roleID, answer.managerID],
        function (err, res) {
          if (err) throw err;
          startPrompt();
        }
      );
    });
}

function updateEmployeeRole() {
  connection.query("SELECT * FROM employee", (err, employees) => {
    inquirer
      .prompt({
        type: "list",
        message: "Which employee would you like to update?",
        choices: employees.map((item) => {
          return { name: item.last_name, value: item.role_id };
        }),
        name: "employee",
      })
      .then(function (employee) {
        connection.query("SELECT * FROM role", (err, roles) => {
          inquirer
            .prompt({
              type: "list",
              message: "What role would you like to assign to this employee?",
              choices: roles.map((item) => {
                return { name: item.title, value: item.id };
              }),
              name: "roleChoice",
            })
            .then(function (answer) {
              console.log(Object.values(employee));
              console.log(Object.values(answer));
              connection.query(
                `UPDATE employee SET role_id = ? WHERE role_id = ?`,
                [Object.values(answer), Object.values(employee)],
                (err, res) => {
                  if (err) throw err;
                  startPrompt();
                }
              );
            });
        });
      });
  });
}

function viewDepartments() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function viewRoles() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function removeRole() {
  connection.query("SELECT * FROM role", (err, items) => {
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        choices: items.map((item) => item.title),
        name: "name",
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM role WHERE ?",
          {
            title: answer.name,
          },
          (err, res) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
}

function removeDepartment() {
  connection.query("SELECT * FROM department", (err, items) => {
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        choices: items.map((item) => item.name),
        name: "department",
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM department WHERE ?",
          {
            name: answer.department,
          },
          (err, res) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
}

function removeEmployee() {
  connection.query("SELECT * FROM employee", (err, items) => {
    inquirer
      .prompt({
        type: "list",
        message: "Last name of the employee you'd like to remove?",
        choices: items.map((item) => item.last_name),
        name: "lastName",
      })
      .then(function (answer) {
        connection.query(
          "DELETE FROM employee WHERE ?",
          {
            last_name: answer.lastName,
          },
          (err, res) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
  });
}

function endPrompt() {
  connection.end();
  process.exit();
}
