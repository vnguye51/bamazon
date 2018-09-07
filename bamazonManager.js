require("dotenv").config();
require('console.table')
var inquirer = require('inquirer')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "bamazon"
  });
  
connection.connect(function(err){
    if(err){console.log(err)}
    console.log('connected as id' + connection.threadId + '\n')
    inquiry()
})

function inquiry(){
    inquirer.prompt([
        {
            message: 'Choose an action',
            type: 'list',
            choices: [{name:'View Products for Sale',value:0},{name:'View Low Inventory',value:1},{name:'Add to Inventory',value:2},{name:'Add new Product', value: 3},{name:'Exit',value:4}],
            name: 'choice'
        }
    ]).then(function(response){
        if(response.choice == 0){
            viewAll()
        } 
        else if(response.choice == 1){
            viewLow()
        }
        else if(response.choice == 2){
            addExisting()
        }
        else if(response.choice==3){
            addNew()
        }
        else{
            connection.destroy()
        }
    })
}

function viewAll(){
    connection.query('SELECT * FROM products', function(err,res){
        if(err){
            console.log(err)
            inquiry()
        }
        console.table(res)
        inquiry()
    })
}

function viewLow(){
    connection.query('SELECT * FROM products WHERE stock_quantity<=10', function(err,res){
        if(err){
            console.log(err)
            inquiry()
        }
        console.table(res)
        inquiry()
    })
}

function addExisting(){
    inquirer.prompt([
        {
            message: 'Enter ID of product to update.\n',
            name: 'id',
            validate: function(val) {
                if (Number.isInteger(parseFloat(val))){
                    return true
                }
                return false
            }
        },
        {
            message: 'How many would you like to add?',
            name: 'add',
            validate: function(val) {
                if (Number.isInteger(parseFloat(val))){
                    return true
                }
                return false
            }
        },
    ]).then(function(response){
        connection.query('SELECT price,stock_quantity FROM products WHERE item_id=?', response.id, function(err,res){
            if(err){
                console.log(err)
                inquiry()
                return
            }
            var stock = res[0].stock_quantity
            stock += +response.add 
            connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                        stock_quantity: stock
                    },
                    {
                        item_id: response.id
                    }
                ], function(err){
                    if(err){
                        console.log(err)
                        inquiry()
                        return
                    }
                    console.log('Store updated.')
                    viewAll()
                })
        })
    })
}

function addNew(){
    inquirer.prompt([
        {
            message: 'Enter product name',
            name: 'name',
            validate: function(val) {
                if (val.length > 0){
                    return true
                }
                return false
            }
        },
        {
            message: 'Enter department name',
            name: 'department',
            validate: function(val) {
                if (val.length > 0){
                    return true
                }
                return false
            }
        },
        {
            message: 'Enter price',
            name: 'price',
            validate: function(val) {
                if (!isNaN(val)){
                    return true
                }
                return false
            }
        },
        {
            message: 'Enter stock_quantity',
            name: 'stock',
            validate: function(val) {
                if (Number.isInteger(parseFloat(val))){
                    return true
                }
                return false
            }
        }]).then(function(response){
            connection.query('INSERT INTO products SET ?',
            {
                product_name: response.name,
                department_name: response.department,
                price: response.price,
                stock_quantity: response.stock
            }, viewAll)
        })
}