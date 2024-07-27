-- ///////////////////////////////////////////// Create Database ///////////////////////////////////////////

CREATE SCHEMA astek_gic;

USE astek_gic;

-- /////////////////////////////////////////////////////////// Cafes ////////////////////////////////////////
CREATE TABLE Cafe (
    id char(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    logo BLOB,  -- Optional field
    location VARCHAR(100) NOT NULL
);
DELIMITER //
CREATE TRIGGER before_cafe_insert
BEFORE INSERT ON cafe
FOR EACH ROW
BEGIN
    DECLARE duplicate_count INT;

    SELECT COUNT(*)
    INTO duplicate_count
    FROM cafe
    WHERE name = NEW.name AND location = NEW.location;

    IF duplicate_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Duplicate cafe entry based on name and location';
    END IF;
END;//
DELIMITER ;

-- /////////////////////////////////////////////////////////// Employees ////////////////////////////////////////

CREATE TABLE Employee (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email_address VARCHAR(100) NOT NULL,
    phone_number VARCHAR(8) NOT NULL CHECK (phone_number LIKE '8%' OR phone_number LIKE '9%'),
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female'))
);


CREATE TABLE employee_id_counter (
prefix VARCHAR(10) PRIMARY KEY,
current_number INT NOT NULL
); 
-- ////////////////////////////////// Default Values for employee id counter table //////////////////////////////

INSERT INTO employee_id_counter (prefix, current_number) VALUES ('UI2000', 1000);

-- ////////////////////////////////// Triggers for employee table  //////////////////////////////

DELIMITER //

CREATE TRIGGER duplicate_employee_check
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    DECLARE duplicate_count INT;

    SELECT COUNT(*)
    INTO duplicate_count
    FROM employee
    WHERE name = NEW.name AND email_address = NEW.email_address;

    IF duplicate_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Name and Email address already exsist';
    END IF;
END;//

CREATE TRIGGER create_employee_id
BEFORE INSERT ON employee
FOR EACH ROW
BEGIN
    DECLARE local_prefix VARCHAR(10);
    DECLARE local_number INT;
    DECLARE new_id VARCHAR(20);

    -- Retrieve the current prefix and number
    SELECT prefix, current_number INTO local_prefix, local_number
    FROM employee_id_counter
    WHERE prefix = 'UI2000'
    FOR UPDATE;

    -- Increment the current number
    SET local_number = local_number + 1;

    -- Update the id_counter table with the new number
    UPDATE employee_id_counter
    SET current_number = local_number
    WHERE prefix = 'UI2000';

    -- Construct the new ID
    SET new_id = CONCAT(local_prefix, LPAD(local_number, 4, '0'));

    -- Set the new ID to the new row
    SET NEW.id = new_id;
END //
DELIMITER ;

-- ///////////////////////////////////////////// EmployeeCafes ///////////////////////////////////////////////////

CREATE TABLE EmployeeCafe (
    employee_id VARCHAR(10),
    cafe_id CHAR(36) ,
    start_date DATE,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(id),
    UNIQUE (employee_id)  -- Ensures an employee can work in only one cafe
);
DELIMITER //
CREATE TRIGGER check_date_before_insert
BEFORE INSERT ON EmployeeCafe
FOR EACH ROW
BEGIN
    IF NEW.start_date > CURRENT_DATE THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'start_date cannot be greater than the current date';
    END IF;
END //
DELIMITER ;
