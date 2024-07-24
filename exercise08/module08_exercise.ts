namespace AllGreetings {
  export namespace Greetings {
    export function returnGreeting(greeting: string) {
      console.log(`The message form namespace Greetings is ${greeting}.`);
    }
  }
  export namespace GreetingsWithLength {
    function getLength(message: string): number {
      return message.length;
    }

    export function returnGreeting(greeting: string) {
      let greetingLength = getLength(greeting);
      console.log(`The message form namespace GreetingsWithLength is ${greeting}. It's ${greetingLength} chars long.`)
    }
  }
}

AllGreetings.Greetings.returnGreeting(`hello`);
AllGreetings.GreetingsWithLength.returnGreeting(`hello2`);

import greet = AllGreetings.Greetings;
greet.returnGreeting(`bonjour`);
