interface Person {
  lastName?: string;
  firstName?: string;
  fullName: () => string;
}

const person: Person = {
  fullName: function () {
    return `${this.firstName} ${this.lastName}`;
  },
};

const person1 = {
  firstName: 'John',
  lastName: 'Doe',
};

const person2 = {
  firstName: 'Jane',
  lastName: 'Doe',
};

console.log(person.fullName.call(person1));
console.log(person.fullName.call(person2));

const obj = { name: 'john' };

let greeting = function (this: { name: string }, a: string, b: string) {
  return `${a} ${this.name}. ${b}`;
};

console.log(greeting.call(obj, 'Hello', 'How are you?'));
console.log(greeting.apply(obj, ['Hello', 'How are you?']));
console.log(greeting.bind(obj, 'Hello', 'How are you?')());
