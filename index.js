const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');

init();

function init() {
  const logoText = logo({ name: 'Team Member Tracker' }).render();
  console.log(logoText);
  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View All Team Members',
          value: 'VIEW_EMPLOYEES'
        },
        {
          name: 'View All Team Members By Department',
          value: 'VIEW_EMPLOYEES_BY_DEPARTMENT'
        },
        {
          name: 'Add Team Member',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'Remove Team Member',
          value: 'REMOVE_EMPLOYEE'
        },
        {
          name: 'View All Roles',
          value: 'VIEW_ROLES'
        },
        {
          name: 'Add Role',
          value: 'ADD_ROLE'
        },
        {
          name: 'Remove Role',
          value: 'REMOVE_ROLE'
        },
        {
          name: 'View All Departments',
          value: 'VIEW_DEPARTMENTS'
        },
        {
          name: 'Add Department',
          value: 'ADD_DEPARTMENT'
        },
        {
          name: 'Remove Department',
          value: 'REMOVE_DEPARTMENT'
        },
        {
          name: 'Quit',
          value: 'QUIT'
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    switch (choice) {
      case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
      case 'VIEW_EMPLOYEES_BY_DEPARTMENT':
        viewEmployeesByDepartment();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'REMOVE_EMPLOYEE':
        removeEmployee();
        break;
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'REMOVE_DEPARTMENT':
        removeDepartment();
        break;
      case 'VIEW_ROLES':
        viewRoles();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'REMOVE_ROLE':
        removeRole();
        break;
      default:
        quit();
    }
  }
  )
}

// TEAM MEMBERS

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => loadMainPrompts());
}

function viewEmployeesByDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department would you like to see team members for?',
          choices: departmentChoices
        }
      ])
        .then(res => db.findAllEmployeesByDepartment(res.departmentId))
        .then(([rows]) => {
          let employees = rows;
          console.log('\n');
          console.table(employees);
        })
        .then(() => loadMainPrompts())
    });
}

function addEmployee() {
    prompt([
      {
        name: 'first_name',
        message: 'What is the team members first name?'
      },
      {
        name: 'last_name',
        message: 'What is the team members last name?'
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: 'list',
              name: 'roleId',
              message: 'What is the team members role?',
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: 'None', value: null });
  
                    prompt({
                      type: 'list',
                      name: 'managerId',
                      message: 'Who is the team members manager?',
                      choices: managerChoices
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.createEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      })
  }

function removeEmployee() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which team member do you want to remove?',
          choices: employeeChoices
        }
      ])
        .then(res => db.removeEmployee(res.employeeId))
        .then(() => console.log('Removed team member from the database'))
        .then(() => loadMainPrompts())
    })
}

function updateEmployeeRole() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Which team members role do you want to update?',
          choices: employeeChoices
        }
      ])
        .then(res => {
          let employeeId = res.employeeId;
          db.findAllRoles()
            .then(([rows]) => {
              let roles = rows;
              const roleChoices = roles.map(({ id, title }) => ({
                name: title,
                value: id
              }));

              prompt([
                {
                  type: 'list',
                  name: 'roleId',
                  message: 'Which role do you want to assign the selected team member?',
                  choices: roleChoices
                }
              ])
                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                .then(() => console.log('Updated team member's role'))
                .then(() => loadMainPrompts())
            });
        });
    })
}

// ROLES

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log('\n');
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}

function addRole() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt([
        {
          name: 'title',
          message: 'What is the name of the role?'
        },
        {
          name: 'salary',
          message: 'What is the salary of the role?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does the role belong to?',
          choices: departmentChoices
        }
      ])
        .then(role => {
          db.createRole(role)
            .then(() => console.log(`Added ${role.title} to the database`))
            .then(() => loadMainPrompts())
        })
    })
}

function removeRole() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }));

      prompt([
        {
          type: 'list',
          name: 'roleId',
          message:
            'Which role do you want to remove? (WARNING: This will also remove team member!!)',
          choices: roleChoices
        }
      ])
        .then(res => db.removeRole(res.roleId))
        .then(() => console.log('Removed role from the database'))
        .then(() => loadMainPrompts())
    })
}

// DEPARTMENTS

function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log('\n');
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

function addDepartment() {
  prompt([
    {
      name: 'name',
      message: 'What is the name of the department?'
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => loadMainPrompts())
    })
}

function removeDepartment() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

      prompt({
        type: 'list',
        name: 'departmentId',
        message:
          'Which department do you want to remove? (WARNING: This will delete all roles and team members in this deparment!!!)',
        choices: departmentChoices
      })
        .then(res => db.removeDepartment(res.departmentId))
        .then(() => console.log(`Removed department from the database`))
        .then(() => loadMainPrompts())
    })
}

// EXIT
function quit() {
  console.log('Fare thee well!');
  process.exit();
}
