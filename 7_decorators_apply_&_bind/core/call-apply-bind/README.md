# call, apply & bind

`call`, `apply`, and `bind` are all **methods of JavaScript functions**, and they behave the same way in **TypeScript**, just with **type safety** and possibly additional type annotations.

All three methods let you **explicitly set the value of `this`** inside a function and optionally pass arguments. Here's a breakdown of the differences and their use cases:

---

### 🔹 1. `call()`

**Definition**: Invokes a function immediately with a specified `this` context and arguments passed **individually**.

**Syntax**:

```ts
func.call(thisArg, arg1, arg2, ...)
```

**Example**:

```ts
function greet(this: { name: string }, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Alice" };

greet.call(person, "Hello"); // Output: Hello, Alice
```

**Use case**: When you want to **immediately invoke** a function with a specific `this` value and pass arguments **one by one**.

---

### 🔹 2. `apply()`

**Definition**: Like `call`, but takes arguments as an **array** instead of individually.

**Syntax**:

```ts
func.apply(thisArg, [arg1, arg2, ...])
```

**Example**:

```ts
function greet(this: { name: string }, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Bob" };

greet.apply(person, ["Hi"]); // Output: Hi, Bob
```

**Use case**: Useful when you already have an **array of arguments** you want to pass to a function with a specific `this`.

---

### 🔹 3. `bind()`

**Definition**: Returns a **new function** with a bound `this` value and optionally bound arguments. It does **not invoke the function immediately**.

**Syntax**:

```ts
const boundFunc = func.bind(thisArg, arg1?, arg2?, ...)
```

**Example**:

```ts
function greet(this: { name: string }, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Carol" };

const boundGreet = greet.bind(person, "Hey");

boundGreet(); // Output: Hey, Carol
```

**Use case**: When you want to **store or pass around a function** with a fixed `this` (e.g., event handlers, callbacks).

---

### ✅ TypeScript Notes

In TypeScript, you can specify the expected `this` type in a function using a special first parameter:

```ts
function greet(this: { name: string }, message: string) { ... }
```

This helps TypeScript **enforce correct usage** of `call`, `apply`, and `bind`, and gives you type safety.

---

### ✅ Summary Table

| Method  | Invokes immediately? | Arguments passed as | Returns      | Use case                                  |
| ------- | -------------------- | ------------------- | ------------ | ----------------------------------------- |
| `call`  | ✅ Yes                | List                | Return value | Call function with specific `this` + args |
| `apply` | ✅ Yes                | Array               | Return value | Like `call`, but with argument array      |
| `bind`  | ❌ No                 | List (optional)     | New function | Save function with bound `this`           |

