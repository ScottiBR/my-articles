To better understand how JavaScript works under the hood, we need to look at how our code is compiled, how variables and functions are Hoisted into the Lexical Environment at the compiler phase?

## How the code is compiled?

There's a temptation to think that JavaScript is interpreted line-by-line, top-down in order, as the program executes. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about your program.

JavaScript runs over an engine (Chrome and NodeJS have the V8 Engine) who is responsible for interpreted the code, but those engines don't have plenty of time to compile and run all optimization tasks before it's executed, like other languages like Java or C# have.

That's why JavaScript creates an Execution Context in the following two stages:

1. Compilation / Creation Phase
2. Execution Phase

At the compilation phase, the code is scanned and variables and functions are hoisted, all that happening a few microseconds before the execution phase.

At the execution phase, the Engine runs the code line-by-line, top-down in order, and every time a function is about to be executed it's created a context for then and added to the Stack. Once all the code of the function is executed, JS engines pop out that function.

Each function call creates a new context, which creates a Lexical Scope where anything declared inside of the function can not be directly accessed from outside the current function scope.

```js
function foo(i) {
  if (i === 3) {
    return;
  } else {
    foo(++i);
  }
}
foo(0);
```

The code simply calls itself 3 times, incrementing the value of ´i´ by 1. Each time the function foo is called, a new execution context is created. Once a context has finished executing, it pops off the stack and control returns to the context below it until the global context is reached again.

![Execution Context](https://davidshariff.com/blog/wp-content/uploads/2012/06/es1.gif)

Knowing that compile and execution phase is distinct, it's essential to understand how some key concepts of how the language works.

## Hoisting is a Myth?

Despite it is specified at TC39, hoisting is a convention created to discuss the idea of lexical environment, without soo much overhead.

Let's see why

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

But that's incorrect, there's no such thing as lifting functions and variables. Actually, in the compiler phase, all functions and variables declarations are **Hoisted** at Memory Heap which is called Lexical Environment. Then the Engine will execute the code from the top to the bottom adding every scope at the Execution Call Stack.

![Code Compile and Executon](https://thepracticaldev.s3.amazonaws.com/i/rlfc71uocpudolg0ny8l.png)

> _Hoisting_ refers to the default behavior of Javascript to process and put all variables and functions declarations into memory first during compile phase of its execution context, regardless where they are written in code.

> _Lexical Environment_ is a data structure that holds identifier-variable mapping on the memory heap.

Difficult? Too many concepts? let's make it more simple. A few seconds before your code it is executed, the compiler will go through every line collecting variables and function declarations and storing those into the memory, so that they can be optimized and utilized even before his declaration in the source code. In other words, lexical environment it's just a fancy way to say "local memory scope".

Let's see if those concepts can be put into practice.

```javascript
sayHello(); // Hello
console.log(world); // world is undefined

var world = "World";

function sayHello() {
  console.log("Hello");
}
```

So in this example, the compiler will run thought the code and find the function `sayHello` and save his reference into the memory, making it available to be called in the execution phase, returning `'Hello'`.

A similar execution also happens with the variable `world` it will be hoisted at the memory, and at the execution phase the variable is called, but since it isn't initialized yet the returned value is `undefined`, here's another example.

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
var teacher = "Guilherme";
{
  console.log(teacher); // ReferenceError or TDZ error
  let teacher = "Scotti";
}
```

Now the global scope has a `teacher` variable with the value of 'Guilherme', but when the Engine enters the block scope, it creates another execution context and hoisted the variable `teacher` into the TDZ of this block context. So, when the `console.log` runs, there's the variable `teacher` is unreachable.

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
