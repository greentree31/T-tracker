const connection = require("./connection");
require('dotenv').config();

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  //members
  findAllMembers() {
    return this.connection.promise().query(
        "SELECT member.id, member.first_name, member.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM member LEFT JOIN role on member.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN member manager on manager.id = member.manager_id;"
      );
     
  }
  createMember(member) {
    return this.connection.promise().query("INSERT INTO member SET ?", member);
  }
  updateMemberRole(memberId, role_id) {
    return this.connection.promise().query("UPDATE member SET role_id = ? WHERE id = ?", [role_id, memberId,]);
  }

  //roles
  findAllRoles() {
    return this.connection.promise().query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;");
  }

  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

  //department
  viewDepartmentBudgets() {
    return this.connection.promise().query("SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM member LEFT JOIN role on member.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;");
  }

  findAllDepartments() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM department;");
  }

  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
}

module.exports = new DB(connection);
