"use strict";
/*  Module 7: Working with external libraries
    Lab Start */
Object.defineProperty(exports, "__esModule", { value: true });
/*  TODO Add the import statement. */
var LoansPrograms = require("./module07_loan-programs.js");
/*  TODO Update the function calls. */
// let interestOnlyPayment = calculateInterestOnlyLoanPayment({principle: 30000, interestRate: 5});
// let conventionalLoanPayment = calculateConventionalLoanPayment({principle: 30000, interestRate: 5, months: 180});
// Update the function calls.
var interestOnlyPayment = LoansPrograms.calculateInterestOnlyLoanPayment({ principle: 30000, interestRate: 5 });
var conventionalLoanPayment = LoansPrograms.calculateConventionalLoanPayment({ principle: 30000, interestRate: 5, months: 180 });
console.log(interestOnlyPayment); //* Returns "The interest only loan payment is 125.00" 
console.log(conventionalLoanPayment); //* Returns "The conventional loan payment is 237.24"
