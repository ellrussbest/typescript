# Introduction

---

Decorators are a special kind of declaration that can be attached to **classes**, **methods**, **properties**, or **parameters**.

They allow you to modify or enhance the behavior of the target they are applied to.

# What is a decorator

---

A decorator is a function that can be applied to various elements (classes, methods, properties, etc.) using the `@` symbol.

- **Class Decorators:** Used to modify the behavior of a class.
- **Method Decorators:** Used to modify the behavior of methods.
- **Property Decorators:** Used to modify the behavior of properties.
- **Parameter Decorators:** Used to modify the behaviro of the method parameters.

# Basic Syntax

---

Here's how you typically apply a decorator:

```ts
@classDecorator
class MyClass {
  @methodDecorator
  myMethod() {}
}
```

# 1. Class Decorators

---

A **class decorator** is a function that takes the target class as an argument. It is invoked when the class is defined. e.g.

```ts
function classDecorator(target: Function) {
  console.log(`Class decorated: ${target.name}`);
}

@classDecorator
class MyClass {
  constructor() {
    console.log('MyClass instantiated');
  }
}
```

The class decorator function is called when the class is defined, and it recieves the constructor function `Function` of the class as the `target`.

# 2. Method Decorators

A **Method decorator** is a function that is applied to methods. It takes three arguments:

- `target`: The prototype of the class.
- `propertyKey`: The name of the method.
- `descriptor`: The property descriptor, which is an object containing the method's attributes (like `writable`, `enumerable`, `value`, etc) e.g.

```ts
function methodDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with args: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class MyClass {
  @methodDecorator
  greet(name: string) {
    console.log(`Hello, ${name}`);
  }
}

const myClass = new MyClass();
myClass.greet('John');

// Output:
// Calling greet with args: [ 'John' ]
// Hello, John
```

# 3. Property Decorators

A **property decorator** is applied to a class property. It recieves two arguments:

- **target**: The prototype of the class.
- **propertyKey:** The name of the property.

Property decorators are often used for tasks like validation or modifying the getter/setter behavior. e.g.

```ts
function Validate(target: any, propertyKey: string) {
  let value: string;
  const getter = () => value;
  const setter = (newValue: string) => {
    if (newValue.length > 3) {
      value = newValue;
    } else {
      console.log(`${propertyKey} must be at least 4 characters long.`);
    }
  };
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class MyClass {
  @Validate
  name: string;
}

const myClass = new MyClass();
myClass.name = 'Jo';
console.log(myClass.name); // Outputs error, then nothing

myClass.name = 'John';
console.log(myClass.name); // Outputs: John
```
Here, the @Validate decorator checks if the `name` property is at least 4 characters long. If not, it prevents the value from being set.

# 4. Parameter Decorators
---

A **parameter decorator** can be applied to the parameters of methods. It takes three arguments:
- `target`: The proptype of the class
- `propertyKey`: The method name.
- `parameterIndex`: The index of the parameter in the method's parameter list. e.g.


```ts
function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in method ${propertyKey}`);
}

class MyClass {
  greet(@LogParameter name: string) {
    console.log(`Hello, ${name}`);
  }
}

const myClass = new MyClass();
myClass.greet("John");

// Parameter at index 0 in method greet
// Hello, John

```