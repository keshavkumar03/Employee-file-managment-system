## Employee Management System

## Description

This is a command-line interface (CLI) application built using Node.js and MySQL for managing employee data. It allows users to view, add, update, and delete employee information, departments, and roles within a company.

## Features

*   **View Employees:** Displays a list of all employees, including their ID, first name, last name, job title, department, salary, and manager (if applicable).
*   **View Employees by Department:**  Filters and displays employees based on the selected department.
*   **View Employees by Manager:** Filters and displays employees based on the selected manager.
*   **Add Employee:**  Prompts the user for employee details (first name, last name, role, manager, salary) and adds the new employee to the database.
*   **Update Employee Role:** Allows the user to select an employee and update their role.
*   **Update Employee Manager:** Allows the user to select an employee and update their manager.
*   **Delete Employee:**  Removes an employee from the database.
*   **View Departments:** Displays a list of all departments.
*   **Add Department:**  Adds a new department to the database.
*   **Delete Department:**  Removes a department from the database.
*   **View Roles:** Displays a list of all roles, including their ID, title, salary, and department.
*   **Add Role:**  Adds a new role to the database, specifying its title, salary, and department.
*   **Delete Role:**  Removes a role from the database.
*   **View Total Utilized Budget of a Department:** Calculates and displays the total salary expenditure for each department.

## Technologies Used

*   **Node.js:**  JavaScript runtime environment.
*   **MySQL:**  Relational database management system.
*   **Inquirer:**  Node.js library for creating interactive command-line interfaces.
*   **MySQL2:** Node.js driver for connecting to MySQL databases.
*   **Console.table:** Formats data into a readable table in the console.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd employee_file_manager
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Configure the database:**

    *   Create a MySQL database.
    *   Create a `.env` file in the root directory of the project.
    *   Add the following environment variables to the `.env` file, replacing the values with your actual database credentials:

        ```
        DB_HOST=localhost
        DB_USER=your_mysql_username
        DB_PASSWORD=your_mysql_password
        DB_NAME=your_database_name
        DB_PORT=3306
        ```

5.  **Seed the database (optional):**

    *   You can populate the database with sample data by running the `seeds.sql` file located in the `db` folder.  You can do this via your preferred MySQL client or by sourcing the file using the MySQL command line client.

    ```bash
    mysql -u your_mysql_username -p your_database_name < db/seeds.sql
    ```
    (Replace `your_mysql_username` and `your_database_name` with your actual credentials.)

## Usage

1.  **Run the application:**

    ```bash
    node index.js
    ```

2.  **Interact with the CLI:**

    The application will present a menu of options. Use the arrow keys to navigate the menu and press Enter to select an option.  Follow the prompts to perform various employee management tasks.

## Database Schema

The database schema consists of three tables:

*   **departments:**
    *   `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    *   `name` (VARCHAR(30), NOT NULL)

*   **roles:**
    *   `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    *   `title` (VARCHAR(30), NOT NULL)
    *   `salary` (DECIMAL, NOT NULL)
    *   `department_id` (INT, NOT NULL, FOREIGN KEY referencing departments.id)

*   **employees:**
    *   `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
    *   `first_name` (VARCHAR(30), NOT NULL)
    *   `last_name` (VARCHAR(30), NOT NULL)
    *   `role_id` (INT, NOT NULL, FOREIGN KEY referencing roles.id)
    *   `manager_id` (INT, FOREIGN KEY referencing employees.id, NULLABLE)

## Contributing

Contributions are welcome!  Please submit pull requests with detailed explanations of the changes you've made.  Follow these guidelines:

*   Fork the repository.
*   Create a new branch for your feature or bug fix.
*   Write clear and concise commit messages.
*   Test your changes thoroughly.
*   Submit a pull request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.
