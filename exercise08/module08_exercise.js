"use strict";
var AllGreetings;
(function (AllGreetings) {
    let Greetings;
    (function (Greetings) {
        function returnGreeting(greeting) {
            console.log(`The message form namespace Greetings is ${greeting}.`);
        }
        Greetings.returnGreeting = returnGreeting;
    })(Greetings = AllGreetings.Greetings || (AllGreetings.Greetings = {}));
    let GreetingsWithLength;
    (function (GreetingsWithLength) {
        function getLength(message) {
            return message.length;
        }
        function returnGreeting(greeting) {
            let greetingLength = getLength(greeting);
            console.log(`The message form namespace GreetingsWithLength is ${greeting}. It's ${greetingLength} chars long.`);
        }
        GreetingsWithLength.returnGreeting = returnGreeting;
    })(GreetingsWithLength = AllGreetings.GreetingsWithLength || (AllGreetings.GreetingsWithLength = {}));
})(AllGreetings || (AllGreetings = {}));
AllGreetings.Greetings.returnGreeting(`hello`);
AllGreetings.GreetingsWithLength.returnGreeting(`hello2`);
