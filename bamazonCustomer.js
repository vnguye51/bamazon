require('console.table')
var inquirer = require('inquirer')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "7182011",
    database: "bamazon"
  });
  
connection.connect(function(err){
    if(err){console.log(err)}
    console.log('connected as id' + connection.threadId + '\n')
    printProducts()
})

function printProducts(){
    connection.query('SELECT * FROM products', function(err,res){
        console.table(res)
        promptStart()
    })
}

function promptStart(){
    inquirer.prompt([
        {
            name: 'choice',
            choices: [{name:'Make a purchase',value:0},{name:'Exit',value:1}],
            type: 'list'
        }
    ]).then(function(response){
        if(response.choice == 0){
            promptPurchase()
        }
        else{
            connection.destroy()
        }
    })
}


function promptPurchase(){
    inquirer.prompt([
        {
            message: 'Enter ID of product you wish to buy.\n',
            name: 'id',
            validate: function(val) {
                if (Number.isInteger(parseFloat(val))){
                    return true
                }
                return false
            }
        },
        {
            message: 'How many would you like to purchase?',
            name: 'request',
            validate: function(val) {
                if (Number.isInteger(parseFloat(val))){
                    return true
                }
                return false
            }
        },
    ]).then(function(response){
        logTransaction(response)
    })
}

function logTransaction(response){
    connection.query('SELECT product_name,price,stock_quantity FROM products WHERE item_id=?', response.id, function(err,res){
        if(err){
            console.log(err)
            promptStart()
            return
        }
        var stock = res[0].stock_quantity 
        var price = response.request*res[0].price
        if (response.request > stock){
            console.log('Insufficient quantity')
            promptStart()
            return
        }
        else{
            stock -= response.request
            console.log(stock)
            connection.query('UPDATE products SET ? WHERE ?',
                [
                    {
                        stock_quantity: stock,
                        product_sales: price,
                    },
                    {
                        item_id: response.id
                    }
                ], function(err){
                    if(err){
                        console.log(err)
                        return
                    }
                    console.log('Transaction logged')
                    console.log('You have been billed $' + price.toFixed(2))
                    printProducts()
                }
            )
        } 
    })
}
