const { prompt } = require("inquirer");
const db = require("./db");

init();

function loadPrompts() {
    prompt([
        {
            type: "",
            name: "",
            message: ""
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
            name: "first_name",
            message: "What is their first name?"
        },
        {
            name: "last_name",
            message: "What is their last name?"
        }
    ])
}

function quit() {
    console.log("Fare thee well!");
    process.exit();
}