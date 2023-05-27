"use strict";
// For you to effectively work with axios using type script it's better when you add @types/node as a dev dependency e.g.
// npm install --save-dev @types/node
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then(function (response) { return response.json(); })
    .then(function (json) { return console.log(json); });
axios_1.default.get("https://jsonplaceholder.typicode.com/todos/1").then(function (res) {
    var todo = res.data;
    var id = todo.id;
    var title = todo.title;
    var completed = todo.completed;
    console.log("\n        This id is ".concat(id, "\n        The title if ").concat(title, "\n        Is it finished? ").concat(completed, "\n    "));
});
