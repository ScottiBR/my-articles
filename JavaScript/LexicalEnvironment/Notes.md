That's why JavaScript creates an Execution Context in the following two stages:

- Compilation / Creation Phase
- Execution Phase

At the execution phase, the Engine runs the code line-by-line, top-down in order, and every time a function is about to be executed it's created a context for then and added to the Stack. Once all the code of the function is executed, JS engines pop out that function. Each function call creates a new context, which creates a Lexical Scope where anything declared inside of the function can not be directly accessed from outside the current function scope.

```js
function recursive(i) {
  if (i === 3) {
    return;
  } else {
    recursive(++i);
  }
}
recursive(0);
```

The code simply calls itself 3 times, incrementing the value of ´i´ by 1. Each
time the function foo is called, a new execution context is created. Once a
context has finished executing, it pops off the stack and control returns to
the context below it until the global context is reached again.

![Execution Context](https://davidshariff.com/blog/wp-content/uploads/2012/06/es1.gif)

You can find many resources online defining the term hoisting in JavaScript, explaining that variable and function declarations are hoisted to the top of their function scope. However, none explain in detail why this happens, and armed with your new knowledge about how the interpreter creates the activation object, it is easy to see why. Take the following code example:
