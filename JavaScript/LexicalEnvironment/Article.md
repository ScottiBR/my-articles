To better understand how JavaScript works under the hood, we need to look at how our code are executed. By the end of this post, you should have a clearer understanding about what the interpreter is trying to do, why some functions / variables can be used before they are declared and how their value is really determined.

## How JavaScript actually works under the hood?

There is a temptation to think that JavaScript code is interpreted line-by-line, top-down in order, as the program executes and therefore not compiled. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about the language.

According to our bible [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> JavaScript is a lightweight, **interpreted** language

But that concept diverges a lot, some suggests that is a **compiled** language, a lot of blogs and posts say that is a **hybrid** language, and beginners don't understand anything. The official standard specification says:

> JavaScript is an interpreter-agnostic language

Therefore there is not an official JS Engine for the language, and the community created a lot of Engines to suppress that need.

![JS Engines](https://thepracticaldev.s3.amazonaws.com/i/f245q94qb8yblvdjmcf7.PNG)

Each engine has differently implementation details, but in this article, the focus will be more on the general aspect of code execution. Those engines are responsible for interpreted JavaScript code, but they don't have plenty of time to "compile" before it's executed, like other languages as Java or C# have. Therefore when the JavaScript code runs in a browser (or in Node), the engine goes through a series of steps, and one of those is the Execution Context.

> Execution context is defined as the environment in which the JavaScript code is executed.

During the creation of the execution context, the Engine goes trough the code in two stages, the **compiler or creation phase**, and the **execution phase**. Thus lead to the misunderstanding between interpreted or compiled language.

At the compilation phase, the code is scanned and variables and functions are **hoisted**, all that happening a few microseconds before the execution phase. Knowing that it's essential to understand how some key concepts of how the language works.

## Hoisting

Most commonly, people will explain hoisting as **declarations of variables and functions being moved to top of your code**, while this is what appears to be happening, it’s important to understand exactly what is going on. Because that definition **is a Myth** , a convention created to discuss the idea of lexical environment, without soo much overhead.

```js
foo("Scotti");

function foo(name) {
  console.log(name);
}
```

In this case, the function was called before it's definition, but it works, and seeking an easy explanation for that people starts saying that the function is lifted/moved up at the beginning of the code, like this.

```js
function foo(name) {
  console.log(name);
}

foo("Scotti");
```

But that's incorrect, there's no such thing as lifting functions and variables, you see, the code isn’t moving anywhere. It isn’t magically being moved to the top of the file. What's Actually happening is that at the compiler phase, all functions and variables declarations are **Hoisted** at Memory Heap which is called Lexical Environment. Then the Engine will execute the code from the top to the bottom adding every scope at the Execution Call Stack.

> _Hoisting_ refers to the default behavior of Javascript to process and put all variables and functions declarations into memory first during compile phase of its execution context, regardless where they are written in code.

> _Lexical Environment_ is a data structure that holds identifier-variable mapping on the memory heap.

![Code Compile and Executon](https://thepracticaldev.s3.amazonaws.com/i/rlfc71uocpudolg0ny8l.png)

Difficult? Too many concepts? let's make it more simple. A few seconds before your code it is executed, the compiler will go through every line collecting variables and function declarations and storing those into the memory, so that they can be optimized and utilized even before his declaration in the source code. In other words, lexical environment it's just a fancy way to say "local memory scope".

![Execution Context animated](https://thepracticaldev.s3.amazonaws.com/i/yhpzy8uvjp5ls966n181.gif)

Let's see if those concepts can be put into practice.

```javascript
say("Hello"); // Hello
console.log(world); // world is undefined

function say(word) {
  console.log(word);
}

var world = "World";
```

So in this example, the compiler will run thought the code and find the function `say` and save his reference into the memory, making it available to be called in the execution phase, returning `'Hello'`, but why the `world` variable is undefined?

> JavaScript only hoists variable declarations, initializations are not hoisted.

So the variable declaration `world` will be hoisted at the memory, and at the execution phase the variable is called, but since it isn't initialized yet the returned value is `undefined`, here's another example.

```javascript
var x;

if (x === undefined) {
  console.log("x is not defined");
} else {
  console.log(x);
}

x = "Defined";

//result "x is not defined"
```

Here the `x` variable is stored in memory during the compile phase but with the value of `undefined`, because the **assignment of value to a variable happens only in the execution phase**. so if we switch the declarations of `x`, see what happens.

```javascript
x = "Defined";

if (x === undefined) {
  console.log("x is not defined");
} else {
  console.log(x);
}

var x;

//result "Defined"
```

This time the variable `x` will be hoisted/lifted by the compiler with the value of `undefined`, but when the execution phase starts, the `x` variable will be evaluated at the first line with the value of `Defined` making possible to run the else condition.

There's also a lot of confusion about variables undefined and undeclared (Reference Error), when a variable is undefined, it means that the variable has been declared at the compiler phase, but not initialized, and undeclared are variables that weren't declared at the lexical environment, or the JS Engine doesn't find an available reference for then.

## What happens with ES6 syntax?

So all the features of ES6 like `let` and `const`, what happens with them? are they hoisted? let's see

```javascript
console.log(x); //ReferenceError: x is not defined

let x = "Hello";
```

**All declarations in JavaScript function, var, let, const even classes, are hoisted at the compiler phase**, but while the var declarations are initialized with undefined, `let` and `const` declarations remain uninitialized, so where is`x` at first line of the example? he was in a place that we call "**Temporal Dead Zone**".

![TDZ](https://media1.giphy.com/media/vwT1bQ8zojmWQFx297/giphy.gif?cid=790b76116e2deb8ea24a2671b46cc66742667737a619f163&rid=giphy.gif)

No, nothing like that, let's see what ECMAScript 2015 spec tells us about _TDZ_.

> **NOTE 13.2.1** let and const declarations define variables that are scoped to the running execution context’s LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated **but may not be accessed in any way until the variable’s LexicalBinding is evaluated**. A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer’s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

In other words, `let` and `const` are only initialized when their assignment of value is evaluated, and that happens during the execution phase, so in the example, the `x` variable will be evaluated only after called by `console.log`, that's why throws a ReferenceError.

Now let's see what happens when we introduce the block scope.

```js
var name = "Guilherme";
{
  console.log(name); // ReferenceError or TDZ error
  let name = "Scotti";
}
```

Now the global scope has a `name` variable with the value of 'Guilherme', but when the Engine enters the block scope, it creates another execution context and hoisted the variable `name` into the TDZ of this block context. So, when the `console.log` runs, there's the variable `name` is unreachable.

To put it briefly, TDZ means don't touch that until it is initialized.

![don't touch that](https://media1.giphy.com/media/CvsQzv9hZe2Ry/giphy.gif?cid=790b7611cd36279a241394a3cc080910cf7b857e101a6a6a&rid=giphy.gif)

The whole point of the TDZ is to make it easier to catch errors where accessing a variable before it’s declared in user code leads to unexpected behavior. This happened a lot with ES5 due to hoisting and poor coding conventions. In ES6 it’s easier to avoid.

## Function Expressions or Declarations

There are three ways to define a function in the JavaScript and those are a function declaration (assigning the function value into a variable), function expression, and ES6 Arrow Functions so are they all Hoisted equally?

```javascript
hello(); // "Hello!"
world(); // TypeError: world is not a function
exclamation(); // ReferenceError: exclamation is not defined

function hello() {
  console.log("Hello!");
}

var world = function() {
  console.log("World");
};

const exclamation = () => console.log("!");
```

We already know that Function Declarations are Hoisted during the compile phase, so the `hello()` function is ready to be called at line 1 because it's a function declaration.

At line 2, we call the function `world()`, but actually we are calling the variable `world` that was hoisted with the same rule as any other variable with the default value of `undefined`, Therefore, when the execution reached line 2 and tried to call `world()`, it failed returning a `TypeError` , because undefined is not a function!

That also happens with the arrow function, but with a little difference that ES6 Syntax is initialized only at value evaluation on the execution phase, so there's the Reference error.

## Conclusion

This is an important foundation in the understanding of how JavaScript works under the hood, and the main conclusion that can be drawn is that **all declarations in JavaScript function, var, let, const even classes, are hoisted at the compiler phase, but with different assignments of value**. Variables are hoisted with the value of `undefined`, except `const` and `let` their are only initialized when their assignment of value is evaluated, and that happens during the execution phase, before that they are in **TDZ**.

We also saw that functions declarations are hoisted and evaluated normally, but function expressions are treated exactly like variables. I hope now you guys could glimpse some functionalities that run on our daily code in JS.

In case you want to go deeper at some concept, go to the [References](https://github.com/ScottiBR/my-articles/blob/master/JavaScript/LexicalEnvironment/References.md)

Please post any feedback, questions, or requests for topics. I would also appreciate 👏 if you like the post, so others can find this too.
