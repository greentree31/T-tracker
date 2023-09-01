use teams;

INSERT INTO department (name)
VALUES  ('Graphics'),
        ('Tech'),
        ('Engineering'),
        ('Management');


INSERT INTO role (title, salary, department_id)
VALUES  ('Graphic Designer', 80000, 1),
        ('Web Developer', 120000, 2),
        ('Editor', 60000, 2),
        ('Technical Writer', 150000, 3),
        ('Operations Manager', 160000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Mina', 'Evans', 1, NULL),
        ('Lauren', 'Grant', 2, NULL),
        ('Chris', 'Farley', 3, NULL),
        ('Jared', 'Jameson', 4, NULL),
        ('Karen', 'Upidy', 5, 5);