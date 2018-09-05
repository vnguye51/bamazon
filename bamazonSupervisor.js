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
            choices: [{name:'View Products Sales by Department',value:0},{name:'Create New Department',value:1},{name:'Exit',value:2}],
            name: 'choice'
        }
    ]).then(function(response){
        if(response.choice == 0){
            viewSales()
        } 
        else if(response.choice == 1){
            createDepartment()
        }
        else{
            connection.destroy()
        }
    })
}

function viewSales(){
    var query = `SELECT products.department_name,SUM(product_sales) AS product_sales,departments.over_head_costs,SUM(product_sales)-departments.over_head_costs AS total_profit
        FROM products
        LEFT JOIN departments ON departments.department_name=products.department_name
        GROUP BY department_name
        `
    connection.query(query,function(err, res){
        if(err){
            console.log(err)
            inquiry()
            return
        }
        console.table(res)
        inquiry()
    })
}

function createDepartment(){
    inquirer.prompt([
        {
            message: 'Enter new department name',
            name: 'name',
            validate: function(val) {
                if (val.length > 0){
                    return true
                }
                return false
            }
        },
        {
            message: 'Enter overhead costs',
            name: 'price',
            validate: function(val) {
                if (!isNaN(val)){
                    return true
                }
                return false
            }
        }
    ]).then(function(response){
        connection.query('INSERT INTO departments SET ?',
        {
            department_name: response.name,
            over_head_costs: response.price
        }, function(err){
            if(err){
                console.log(err)
            }
            inquiry()
        })
    })
}