"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGreeting = returnGreeting;
// Returns the value of a parameter and the parameter length to the console.
function returnGreeting(greeting) {
    var greetingLength = getLength(greeting);
    console.log("The message from namespace GreetingsWithLength is ".concat(greeting, ". It is ").concat(greetingLength, " characters long."));
}
function getLength(message) {
    return message.length;
}
