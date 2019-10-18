To better understand how JavaScript works under the hood, we need to look at how our code are executed. By the end of this post, you should have a clearer understanding about what the interpreter is trying to do, why some functions / variables can be used before they are declared and how their value is really determined.

## How JavaScript actually works under the hood?

There is a temptation to think that JavaScript code is interpreted line-by-line, top-down in order, as the program executes and therefore not compiled. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about the language.

According to our bible [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> JavaScript is a lightweight, **interpreted** language

But that concept diverges a lot, some suggests that is a **compiled** language, a lot of blogs and posts say that is a **hybrid** language, and beginners don't understand anything. The official standard specification says:

> JavaScript is an interpreter-agnostic language

Therefore there is not an official JS Engine for the language, and the community created a lot of Engines to suppress that need.

## JS Engines

![JS Engines](https://thepracticaldev.s3.amazonaws.com/i/f245q94qb8yblvdjmcf7.PNG)

Each engine has differently implementation details, but in this article, the focus will be more on the general aspect of code execution. Those engines are responsible for interpreted JavaScript code, but they don't have plenty of time to "compile" before it's executed, like other languages as Java or C# have. Therefore when the JavaScript code runs in a browser (or in Node), the engine goes through a series of steps, and one of those is the Execution Context.

## Execution Context

> Execution context is defined as the environment in which the JavaScript code is executed.

During the creation of the execution context, the Engine goes trough the code in two stages, the **compiler or creation phase**, and the **execution phase**. Thus lead to the misunderstanding between interpreted or compiled language.

At the compilation phase, the code is scanned and variables and functions are **hoisted**, all that happening a few microseconds before the execution phase. Knowing that it's essential to understand how some key concepts of how the language works.

## Conclusion

JavaScript is a language how is interpreted by

In case you want to go deeper at some concept, go to the [References](https://github.com/ScottiBR/my-articles/blob/master/JavaScript/Hoisting/References.md)

Please post any feedback, questions, or requests for topics. I would also appreciate 👏 if you like the post, so others can find this too.
