DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT,
    product_name VARCHAR(255),
    product_sales FLOAT(13,2) DEFAULT 0,
    department_name VARCHAR(255),
    price FLOAT(13,2),
    stock_quantity INT(12),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name,department_name,price,stock_quantity)
    VALUES
        ('Playstation 4', 'gaming', 299.99, 25),
        ('Nintendo Switch','gaming', 250.00,125),
        ('Nintendo 3DS', 'gaming', 180.75, 50),
        ('A Way of Kings', 'books', 28.99, 0),
        ('The Final Empire', 'books', 15.25, 5),
        ('Rurouni Kenshin', 'home video', 10.00, 20),
        ('Finding Nemo', 'home video', 10.00, 20),
        ('VIZIO Television', 'TVs', 200.00, 0),
        ('Hydroflask', 'Sports and Fitness', 30.00, 10),
        ('Logitech Mouse', 'computer', 20.00, 10);

CREATE TABLE departments(
    department_id INT AUTO_INCREMENT,
    department_name VARCHAR(255),
    over_head_costs FLOAT(13,2),
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs)
    VALUES
        ('gaming', 100.0),
        ('books', 200.50),
        ('home video', 1),
        ('TVs', 5),
        ('Sports and Fitness', 30.00),
        ('computer', 300.50);
