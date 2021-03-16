const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "",
  database: "employees_DB",
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}\n`);
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt({
      type: "list",
      message: "Select One of the following options",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Remove a department",
        "Remove a role",
        "Remove an employee",
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
          console.table(res);
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
          console.table(res);
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
          console.table(res);
          startPrompt();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update (enter employee ID)?",
        name: "employeeID",
      },

      {
        type: "input",
        message: "What role would you like to assign to this employee?",
        name: "updatedRole",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE last_name = ?",
        [answer.updatedRole, answer.employeeID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function viewDepartments() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  // show the result to the user (console.table)
}

function viewEmployees() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  // show the result to the user (console.table)
}

function removeRole() {
  connection.query("SELECT * FROM role", (err, items)=>{
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        choices: items.map((item)=> item.title),
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
  })
}

function removeDepartment() {
  connection.query("SELECT * FROM department", (err, items)=>{
    inquirer
      .prompt({
        type: "list",
        message: "Which role would you like to remove?",
        choices: items.map((item)=> item.name),
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
  })
}

function removeEmployee() {
  inquirer
    .prompt({
      type: "input",
      message: "Last name of the employee you'd like to remove?",
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
}

function endPrompt() {
  connection.end();
  process.exit();
}
