# bamazon
* A database app mimicking shopping transactions

## Pre-Word
---------------
* required modules can be installed using the package.json
* A .env file is required  to run this app. It requires the fields: HOST, USER, ROOT, and PASSWORD referring to the connection to a database.
* Prior to using the app run schema.sql to generate a databse

## bamazonCustomer.js
-----------
* Running the customer app will immediately bring up a table of items and prompt you to make a purchase or close the app.

![customer1](/readme_assets/Customer1.png)

------------------
* "Make a purchase" will then prompt you to enter the product ID and amount.
* If there is an insufficient quantity then you are prompted to choose again
* If it is successful then the transaction is logged and you are billed and returned to the "Make a purchase" choice.

![customer2](/readme_assets/Customer2.png)

![customer3](/readme_assets/Customer3.png)


## bamazonManager.js
-------------
* The manager app gives you four choices

![manager1](/readme_assets/Manager1.png)

----------------
* "View Products" gives a table of all items and includes product_sales

![manager2](/readme_assets/Manager2.png)

-------------------
*  "View Low Inventory" gives a table of items with a stock less than or equal to 10

![manager3](/readme_assets/Manager3.png)

--------------------
* "Add to Inventory" prompts you to enter the ID of the item you want to add to and prints the updated table when successful

![manager4](/readme_assets/Manager4.png)

----------------
* "Add new Product" prompts you to enter the product info and inserts that row into the table and prints a table with the newly added info.

![manager5](/readme_assets/Manager5.png)


## bamazonSupervisor.js
------------------------
* The supervisor app gives you two options

![supervisor1](/readme_assets/Supervisor1.png)

-----------------------
* "View" gives a list of all departments with their profits, sales, and costs

![supervisor2](/readme_assets/Supervisor2.png)

--------------------------
* Create new department adds a new department to the database

![supervisor3](/readme_assets/Supervisor3.png)



