To better understand how JavaScript works under the hood, we need to look at how our code are executed. By the end of this post, you should have a clearer understanding about what the interpreter is trying to do, why some functions / variables can be used before they are declared and how their value is really determined.

[TL;DR](#markdown-header-conclusion)

## How JavaScript actually works under the hood?

There is a temptation to think that JavaScript code is interpreted line-by-line, top-down in order, as the program execute and therefore not compiled. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about the language.

> JavaScript is a lightweight, **interpreted** language [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

But that concept diverges a lot, some academics suggests that is a **compiled** language, a lot of blogs and posts say that is a **hybrid** language. The official standard specification says:

> JavaScript is an interpreter-agnostic language

Therefore the language is interpreted but, there isn't an official JS Engine for the language, and the community created a lot of Engines to suppress that need.

## JS Engines

![JS Engines](https://thepracticaldev.s3.amazonaws.com/i/f245q94qb8yblvdjmcf7.PNG)

Each engine has differently implementation details, but dive deep into those details isn't the goal here, the focus will be more on the general aspect of code execution. Those engines are responsible for interpreted JavaScript code, but they don't have plenty of time to "compile" before it's executed, like other languages as Java or C# have. Therefore when the JavaScript code runs in a browser (or in Node), the engine start processing the code going through a series of steps, and one of those steps are the Execution Context.

## Execution Context

> Execution context is defined as the environment in which the JavaScript code is executed.

When code is run in JavaScript, the environment in which it is executed is very important, by environment i mean variables, objects, _this_, functions, and envery Execution context in JavaScript must be one of these three types:

- **Global Environment** : The main execution context in which JS code start its execution when the bundle first loads in the browser.
- **Function Environment** : Is the context created by the execution of code inside a function, and have access to the global Environment.
- **Eval** : Execution context inside eval function.

Additionally, during the creation of the execution context the Engine goes trough the code in two stages:

- **Compilation / Creation Phase**
- **Execution Phase**

At the compilation phase, the Engine scans the code line-by-line, top-down in order to create the Scope Chain, Hoist variables and functions and determine the value of "_this_". In fact all that happening a few microseconds before the execution phase, thus lead to the misunderstanding between interpreted or compiled language, knowing that it's essential to understand how some key concepts of how the language works.

After the compilation phase is complete, the execution of the code starts, let's vizualize it with an example:

```js
//The code simply calls itself 3 times, incrementing the value of ´i´ by 1.
function recursive(i) {
  if (i === 3) {
    return;
  } else {
    recursive(++i);
  }
}
recursive(0);
```

![Execution Context](https://davidshariff.com/blog/wp-content/uploads/2012/06/es1.gif)

Every time a function is about to be executed it's created a context for then and added to the Stack. Once all the code of the function is executed, JS engines pop out that function. Each function call creates a new context, which creates a Lexical Scope where anything declared inside of the function can not be directly accessed from outside the current function scope.

## Conclusion

JavaScript it is a interpreted language but, there isn't an official JS Engine, therefore the community created a lot of Engines to suppress that need. Those Engines are responsable for interpreting the code and create the Execution context which is the environment where the code are executed.

Those environments are created in two stages, Compilation and Execution stage, and their are responsible for creating the Scope Chain, hoist variables and functions, and execute the code.

In case you want to dive deeper at some concept, go to the [References](https://github.com/ScottiBR/my-articles/blob/master/JavaScript/Hoisting/References.md)

Please post any feedback, questions, or requests for topics. I would also appreciate 👏 if you like the post, so others can find this too.
