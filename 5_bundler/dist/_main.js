var webpack_modules = {
  "./src/messages.js": (module) => {
    module.exports = "Hi there";
  },
};

function webpack_require(moduleId) {
  var moduleFn = webpack_modules[moduleId];
  var module = { exports: {} };
  moduleFn(module);
  return module.exports;
}

const message = webpack_require("./src/message.js");
console.log(message);
