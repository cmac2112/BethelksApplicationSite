console.log('index.js loaded');
console.log("docker image ran this and is ouputting this message");

var mysql = require('mysql');

var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE IF NOT EXISTS mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");

        con.query("USE mydb", function (err, result) {
            if (err) throw err;

            var createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL
                )
            `;
            con.query(createUsersTable, function (err, result) {
                if (err) throw err;
                console.log("Users table created");

                var insertUsers = `
                    INSERT INTO users (name, email) VALUES 
                    ('John Doe', 'john@example.com'),
                    ('Jane Smith', 'jane@example.com'),
                    ('Alice Johnson', 'alice@example.com')
                `;
                con.query(insertUsers, function (err, result) {
                    if (err) throw err;
                    console.log("Users inserted");
                });
            });

            var createProductsTable = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    price DECIMAL(10, 2) NOT NULL
                )
            `;
            con.query(createProductsTable, function (err, result) {
                if (err) throw err;
                console.log("Products table created");

                var insertProducts = `
                    INSERT INTO products (name, price) VALUES 
                    ('Product A', 10.99),
                    ('Product B', 20.99),
                    ('Product C', 30.99)
                `;
                con.query(insertProducts, function (err, result) {
                    if (err) throw err;
                    console.log("Products inserted");
                });
            });

            var createOrdersTable = `
                CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    product_id INT,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )
            `;
            con.query(createOrdersTable, function (err, result) {
                if (err) throw err;
                console.log("Orders table created");

                var insertOrders = `
                    INSERT INTO orders (user_id, product_id) VALUES 
                    (1, 1),
                    (2, 2),
                    (3, 3)
                `;
                con.query(insertOrders, function (err, result) {
                    if (err) throw err;
                    console.log("Orders inserted");
                });
            });
        });
    });
});
console.log('index.js finished');
