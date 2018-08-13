// REQUIRED VARIABLES**********************************************************

var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

// SQL CONNECTION**************************************************************

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_DB'
    
});

connection.connect(function(err) {
    console.log("connected as id: " + connection.threadId);
    firstPrompt();
});


// FIRST PROMPT**************************************************************


function firstPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            readInv();
        } else {
            console.log("Come back soon!");
            connection.end();
        }
    });
}

//READ THE INVENTORY*********************************************************
//make a table

function readInv() {
    var table1 = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [8, 25, 25, 25, 10]
    });

    listInv();

    function listInv() {
        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var id = res[i].item_id,
                    product = res[i].product_name,
                    department = res[i].department_name,
                    price = res[i].price,
                    quantity = res[i].stock_quantity;

                table1.push(
                    [id, product, department, price, quantity]
                );
            }
            // console.log("");
            console.log("");
            console.log(" Current Inventory \n");
            // console.log("");
            console.log(table1.toString());
            console.log("");
            orderPrompt();
        });
    }
}

//ORDER PROMPT************************************************************

function orderPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "order",
        message: "Would you like to place an order?",
        default: true

    }]).then(function(user) {
        if (user.order === true) {
            purchasePrompt();
        } else {
            console.log("That's cool, please keep shopping until you're ready!");
            // return;
            // readInv();
            firstPrompt();
        };
    });
}


//PURCHASE PROMPT*********************************************************

function purchasePrompt() {
    inquirer.prompt([{

        type: "input",
        name: "inputId",
        message: "Please enter the inventory ID number of the product you would like to purchase.",
    },
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to purchase?",
        }

    ]).then(function(purchase) {
        connection.query("SELECT * FROM products WHERE item_id=?", purchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (purchase.quantity < res[i].stock_quantity) {
                    console.log("");
                    console.log("");
                    console.log("Great! We have plenty in stock.\n")
                    console.log("You have selected for purchase:");
                    console.log("_______________________________\n");
                    console.log("Item: " + res[i].product_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + purchase.quantity);
                    console.log("_______________________________\n");
                    console.log("Order Total: " + purchase.quantity * res[i].price);
                    console.log("");

                    //vars to update DB
                    var newStock = (res[i].stock_quantity - purchase.quantity);
                    var purchaseId = (purchase.inputId);
                    completePurchase(newStock, purchaseId);

                } else {
                    console.log("_______________________________\n");
                    console.log("Sorry, we don't have that many in stock.\n");
                    console.log("Please choose a different product or a lower quantity.\n");
                    console.log("_______________________________\n");
                    readInv();

                }
            }
        })

    });
}


//COMPLETE PURCHASE, UPDATE THE DATABASE*********************************************************

function completePurchase(newStock, purchaseId) {
    inquirer.prompt([{

        type: "confirm",
        name: "completePurchase",
        message: "Would you like to complete your purchase?",
        default: true

    }]).then(function(confirm) {

        if (confirm.completePurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{

                stock_quantity: newStock
            },
                {
                    item_id: purchaseId
                }]);

            console.log("Your order is complete! Thank you for your purchase.\n");
            connection.end();
            // firstPrompt();

        } else {
            console.log("_______________________________\n");
            console.log("Please keep shopping until you're ready.\n");
            console.log("_______________________________\n");
            firstPrompt();
        }
    });
}