const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');

init();


function init() {
  const logoText = logo({ name: 'Employee Manager' }).render();

  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What do you want to do?'
            choices: [
                {
                    name: 'All Employees',
                    value: 'VIEW_EMPLOYEES'
                }
                {
                    name: 'All employees by dept'
                }
            ]
        }
    ])
}

function viewRoles() {
    db.findRoles()
}


function viewDepartments() {
    db.findDepartments()
}

function addEmployee() {
    prompt([
        {
            name: 'first_name',
            message: 'What is their first name?'
        },
        {
            name: 'last_name',
            message: 'What is their last name?'
        }
    ])
}

function quit() {
    console.log('Fare thee well!');
    process.exit();
}