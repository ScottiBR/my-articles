To better understand how JavaScript works under the hood, we need to look at how our code is executed. By the end of this post, you should have a clearer understanding of what is Execution Context, and why it is so important to understand some core principles of JavaScript like Hoisting and Closure.

This article is part of a series about JavaScript there I’m writing for myself during my learning journey, if this post isn't comprehensive enough, I strongly suggest you dig into my references, there will be a plenty amount of content that worth to be read.

[TL;DR](#markdown-header-conclusion)

## How JavaScript actually works under the hood?

First of all, how JavaScript is executed at our browsers? It is a compiled language or interpreted? That concept diverges a lot, some academics suggest that JavaScript is a **compiled** language, a lot of blogs and posts say that is a **hybrid** language and one of the most reliable specifications says:

> JavaScript is a lightweight, **interpreted** language [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

 I’m not a _compiler-guy_, so I won’t go deeper into details but, it is important to know this to better understand some of the logic behind the language.

There is a temptation to think that JavaScript code is interpreted line-by-line, top-down in order, as the program executes and therefore not compiled. However, while that is substantially true, there's one part of that assumption that can lead to incorrect thinking about the language, and that's what we are gonna see.

JavaScript is an interpreter-agnostic language, therefore the language is interpreted but, there isn't an official JS Engine designed for the language, due to that fact Web Browser vendors created a lot of Engines which essentially make all the magic happens.

## JS Engines

![JS Engines](https://thepracticaldev.s3.amazonaws.com/i/f245q94qb8yblvdjmcf7.PNG)

Each engine has differently implementation details, but dive deep into those details isn't the goal here, the focus will be more on the general aspect of code execution. Those engines are responsible for interpreted JavaScript code, but they don't have plenty of time to "compile" before it's executed, like other languages as Java or C# have. Therefore when the JavaScript code runs in a browser (or in Node), the engine starts processing the code going through a series of steps, and one of those steps is the Execution Context.

## Execution Context

> The Execution Context is defined as the environment in which the JavaScript code is executed.

When code is run in JavaScript, the environment in which it is executed is very important, by the environment I mean variables, objects, _this_, functions, and every Execution Context in JavaScript must be one of these three types:

- **Global Environment**: The main execution context in which JS code starts its execution when the bundle first loads at the browser.
- **Function Environment**: Is the context created by the execution of the code inside a function, and that environment has access to the global Environment.
- **Eval**: Execution context inside eval function.

However, to create these kinds of contexts, the Engine must go through a series of stages and we are going to focus on the two most important stages: 

- **Compilation / Creation Phase**
- **Execution Phase**

At the compilation phase, the Engine scans the code line-by-line, top-down in order, to create the Scope Chain, Hoist variables and functions and determine the value of "_this_". Essentially, all that happening a few microseconds before the execution phase, thus leading to the misunderstanding between interpreted or compiled language, knowing that it's essential to understand how some key concepts of how the language works.

After the compilation phase is complete, the execution of the code starts, let's visualize it with an example:


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

[*Image and code from David Shariff*](http://davidshariff.com/blog/what-is-the-execution-context-in-javascript/)


Every time a function is about to be executed it's created a context for then and added to the Stack. Once all the code of the function is executed, JS engines pop out that function. Each function call creates a new context, which creates a Lexical Scope where anything declared inside of the function can not be directly accessed from outside the current function scope.

## Conclusion


JavaScript is an interpreter-agnostic language, therefore the language is interpreted but, there isn't an official JS Engine designed for the language, due to that fact Web Browser vendors created a lot of Engines which are responsible for interpreting the code and create the Execution context which is the environment where the code is executed.

Those environments are created in two stages, the Compilation, and the Execution stage, and they are responsible for creating the Scope Chain, hoist variables and functions, and execute the code.

Now that you know more about Execution Context, it's time to move to the next chapter of this series of articles and learn more about Hoisting. did you know that the term "hoisting" doesn't exist at EcmaScript Specification until ES6 release?

In case you want to dive deeper at some concept, go to the [References](https://github.com/ScottiBR/my-articles/blob/master/JavaScript/Hoisting/References.md)

Please post any feedback, questions, or requests for topics. I would also appreciate 👏 if you like the post, so others can find this too.
