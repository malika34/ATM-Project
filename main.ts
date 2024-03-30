#!/usr/bin/env node

import inquirer from "inquirer"; // Importing the inquirer library for user input
import chalk from "chalk"; // Importing the chalk library for styling console output

// Initializing variables
let myBalance = 200000; // Dollar
let myPinCode = 1122; // Predefined PIN code

// Prompting the user to enter their PIN code
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter your pin code"
    }
]);

// Verifying the entered PIN code
if (pinAnswer.pin === myPinCode) {
    console.log(chalk.green("Your pincode is correct!!")); // Styling message with chalk

    // Prompting the user to select an operation
    let operationAnwers = await inquirer.prompt([
        {
            name: "operations",
            type: "list",
            message: "What you want to do",
            choices: ["Withdraw", "Checkbalance", "Fastcash"]
        }
    ]);
    console.log(operationAnwers);

    // Handling different operations based on user choice
    if (operationAnwers.operations === "Withdraw") {

        // If user chooses to withdraw, prompt for withdrawal amount
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "Enter your amount"
            }
        ]);

        // Deducting withdrawal amount from balance
        myBalance -= amountAns.amount;
        console.log(`Your remaining balance is: ${myBalance}`);

        // Checking for insufficient funds
        if (amountAns.amount > myBalance) {
            console.log(chalk.red("Insufficient funds. Please enter a smaller amount.")); // Styling message with chalk
        };
    } else if (operationAnwers.operations === "Checkbalance") {

        // If user chooses to check balance, display the current balance
        console.log(chalk.yellow(`Your balance is: ${myBalance}`)); // Styling message with chalk
    }
    else if (operationAnwers.operations === "Fastcash") {
        // If user chooses fastcash, prompt for fastcash amount
        let fastCash = await inquirer.prompt([
            {
                name: "amount",
                type: "list",
                message: "Please select your fastcash amount",
                choices: [5000, 10000, 20000, 25000]
            }
        ]);

        // Check if fastcash amount exceeds balance
        if (fastCash.amount > myBalance) {
            console.log(chalk.red("Insufficient funds. Please enter a smaller amount."));
        }

        // Deduct fastcash amount from balance
        myBalance -= fastCash.amount;
        console.log(`You have withdrawn ${fastCash.amount} using fastcash. Your remaining balance is ${myBalance}`);
    }
    else {

        // If balance is insufficient, display error message
        console.log(chalk.red("Insufficient funds. Please enter a smaller amount.")); // Styling message with chalk
    };
}

else {

    // If entered PIN code is incorrect, display error message
    console.log(chalk.red("Please enter a correct pincode"));
};
