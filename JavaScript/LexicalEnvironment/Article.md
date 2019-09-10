# JavaScript Compiler and Lexical Environment

To better understand how JavaScript works under the hood, we need to look at how our code is compiled, how variables and functions are Hoisted into the Lexical Environment at the compiler phase?

## How the code is compiled?

There's a temptation to think that JavaScript is interpreted line-by-line, top-down in order, as the program executes. While that is substantially true, there's one part of that assumption which can lead to incorrect thinking about your program.

You could be surprised by the fact that JavaScript is an interpreted language, but uses a Just-In-Time (JIT) compiler to ensure the fastest performance, although, the JS engines don't get the luxury (like other compilers) of having plenty of time to compile your code and run all optimization tasks, because JavaScript compilation doesn't happen in a build step ahead of time, actually, it happens a few microseconds before the code are executed by Js Engine which creates the executable bytecode, and that's what we call compile phase.

In the compiler phase, all functions, and variable declarations are hoisted at Memory Heap which is called Lexical Environment. Then the Engine will execute the code from the top to the bottom adding every command at the Execution Call Stack.

![Code Compile and Executon](https://thepracticaldev.s3.amazonaws.com/i/rlfc71uocpudolg0ny8l.png)

## Hoisting and Lexical Environment

Let's contextualize what is those complex words.

> _Hoisting_ refers to the default behavior of Javascript to process and put all variables and functions declarations into memory first during compile phase of its execution context, regardless where they are written in code.

> _Lexical Environment_ is a data structure that holds identifier-variable mapping on the memory heap.

Difficult to understand? Too many concepts? let's make it more simple. A few seconds before your code it is executed, the compiler will go through every line collecting variables and function declarations and storing those into the memory, so that they can be optimized and utilized even before his own declaration in the source code.

Let's see if those concepts can be put into practice.

```javascript
f1(); // Hello
console.log(x); // undefined

var x = "World";

function f1() {
  console.log("Hello");
}
```

So in this example, the compiler will run thought the code and find the function **f1** and save his reference into the memory, making it available to be called in the execution phase, after that, the **x** variable will be allocated in memory, but with the value of **undefined**. The execution phases start, and **f1** is called and return **Hello** because it's available on memory, and then the variable **x** is called, but since it isn't initialized yet, the returned value is **undefined**, here's another example.

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

Again the **x** variable is stored in memory during the compile phase but with the value of **undefined**, because the **assignment of value to a variable happens only in the execution phase**. so if we switch the declarations of **x**, see what happens.

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

This time the variable **x** will be hoisted/lifted by the compiler with the value of **undefined**, but when the execution phase starts, the **x** variable will be evaluated at the first line with the value of **"Defined"** making possible to run the else condition.

## And what happens with ES6 syntax?

So all the features of ES6 like `let` and `const`, what happens with them? are they hoisted? let's see

```javascript
console.log(x); //ReferenceError: x is not defined

let x = "Hello";
```

All declarations in JavaScript (function, var, let, const even classes), are hoisted at the compiler phase, but while the var declarations are initialized with undefined, `let` and `const` declarations remain uninitialized, so where are **x** at first line of the example? he was in a place that we call "**Temporal Dead Zone**".

![TDZ](https://media1.giphy.com/media/vwT1bQ8zojmWQFx297/giphy.gif?cid=790b76116e2deb8ea24a2671b46cc66742667737a619f163&rid=giphy.gif)

No, nothing like that, let's see what ECMAScript 2015 spec tells us about _TDZ_.

> **NOTE 13.2.1** let and const declarations define variables that are scoped to the running execution context’s LexicalEnvironment. The variables are created when their containing Lexical Environment is instantiated **but may not be accessed in any way until the variable’s LexicalBinding is evaluated**. A variable defined by a LexicalBinding with an Initializer is assigned the value of its Initializer’s AssignmentExpression when the LexicalBinding is evaluated, not when the variable is created. If a LexicalBinding in a let declaration does not have an Initializer the variable is assigned the value undefined when the LexicalBinding is evaluated.

In other words, `let` and `const` are only initialized when their assignment of value is evaluated, and that happens during the execution phase by the JS Engine, so in the example, the **x** variable will be evaluated only after called by `console.log`, that's why throws a ReferenceError.

## Function Expressions or Declarations

There are three ways to define a function in the JavaScript and those are a function declaration, function expression, and ES6 Arrow Functions so are they all Hoisted equally?

```javascript
hello(); // "Hello!"
world(); // TypeError: world is not a function
exclamation(); // ReferenceError: exclamation is not defined

//Function Declaration
function hello() {
  console.log("Hello!");
}

//Function Expression
var world = function() {
  console.log("World");
};

//ES6 Arrow Function
const exclamation = () => console.log("!");
```

We already know that Function Declarations are Hoisted during the compile phase, so the `hello()` function is ready to be called, but only function declarations are hoisted in JavaScript, and we can see that inline 2, when we call `world()` and it returns world is not a function, that happens when the variable declaration (var world) was hoisted with a value undefined. However, the variable initialisation (`= function () { console.log(World!) }`) wasn’t hoisted. Therefore, when the execution reached line 2 and tried to call `world()`, it failed, because undefined is not a function!

That also happens with arrow functions, but remember `const exclamation` is hoisted as a variable, but it isn't available to be used until their value are evaluated, so there's the Reference error.

## Conclusion

This is an important foundation in the understanding of how JavaScript works under the hood, and the main conclusion that can be drawn is that **all declarations in JavaScript function, var, let, const even classes, are hoisted at the compiler phase, but with different assignments of value**. Variables are hoisted with the value of `undefined`, except `const`and `let` their are only initialized when their assignment of value is evaluated, and that happens during the execution phase, before that they are in **TDZ**. We also saw that functions declarations are hoisted and evaluated normally, but function expressions are treated exactly like variables. I hope now you guys could glimpse some functionalities that run on our daily code in JS.

In case you want to go deeper at some concept, go to the [References](https://github.com/ScottiBR/my-articles/blob/master/JavaScript/LexicalEnvironment/References.md)

Please post any feedback, questions, or requests for topics. I would also appreciate 👏 if you like the post, so others can find this too.
