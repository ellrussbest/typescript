// For you to effectively work with axios using type script it's better when you add @types/node as a dev dependency e.g.
// npm install --save-dev @types/node

import axios from "axios";

// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
    const todo = res.data as Todo;

    const id = todo.id;
    const title = todo.title;
    const completed = todo.completed;

    logTodo(id, title, completed);
    
});


const logTodo = (id: number, title: string, completed: boolean) => {
    console.log(`
            This id is ${id}
            The title if ${title}
            Is it finished? ${completed}
        `);
}
