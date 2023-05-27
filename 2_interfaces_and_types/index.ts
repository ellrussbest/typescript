// Example of defining a type alias with `type`:
type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: "John",
  age: 30,
};

// Example of defining an object type with `interface`:
interface PersonObj {
  name: string;
  age: number;
}

const personObj: PersonObj = {
  name: "John",
  age: 30,
};

// Example of defining a union type with `type`:
type Status = "active" | "inactive";

const userStatus: Status = "active";

// Example of defining an intersection type with `type`:
type User = {
  name: string;
  age: number;
};

type Admin = {
  role: "admin";
  permissions: string[];
};

type AdminUser = User & Admin;

const adminUser: AdminUser = {
  name: "John",
  age: 30,
  role: "admin",
  permissions: ["create", "update", "delete"],
};

console.log(adminUser);

// Example of defining a function type with `type`:
type Greeting = (name: string) => string;

const sayHello: Greeting = (name) => `Hello, ${name}!`;
