DROP DATABASE IF EXISTS teams_db;
CREATE DATABASE teams_db;
USE teams_db;

CREATE TABLE department (
    id: INT NOT NULL AUTO_INCREMENT,
    name: VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id: INT NOT NULL AUTO_INCREMENT,
    title: VARCHAR (30),
    salary: DECIMAL,
    department_id: INT NOT NULL,
    PRIMARY KEY (id),
);

CREATE TABLE employee (
    id: INT NOT NULL,
    first_name: VARCHAR(30),
    last_name: VARCHAR(30),
    role_id: INT,
    manager_id: INT
    PRIMARY KEY (id),
)