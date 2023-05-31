class Stack<T> {
  private items: T[] = [];

  push(item: T) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // Output: 2
console.log(stack.pop()); // Output: 1

function reverse<T>(items: T[]): T[] {
  return items.reverse();
}

const numbers = [1, 2, 3, 4, 5];
const reversedNumbers = reverse<number>(numbers);

console.log(reversedNumbers); // Output: [5, 4, 3, 2, 1]