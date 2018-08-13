DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE  bamazon_DB;


CREATE TABLE products(
item_id INT NOT NULL auto_increment,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL (10,2),
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPhone", "Phones", "899.99", "45");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("airPods", "Accessories", "169.99", "78");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad", "Electronics", "379.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad mini", "Electronics", "279.99", "217");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "Electronics", "999.99", "21");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch", "Electronics", "349.99", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple TV", "Electronics", "179.99", "135");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 13", "Computers", "1799.99", "20");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro 15", "Computers", "2099.99", "30");



ALTER USER 'root'@'localhost' IDENTIFIED BY 'password';

SELECT * FROM products;