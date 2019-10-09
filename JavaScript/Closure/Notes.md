# Closure is common

Muita entrevistas de emprego constumam perguntar o que é closure
closure é tão comun no nosso dia a dia, mas ao mesmo tempo tão abstrato de definir numa frase, que as pessoas ficam confusas com essa pergunta

para entender closure é necessário entender lexical scope primeiro

# Lexical Scope

> The lexing phase of compilation is essentially able to know where and how all identifiers are declared, and thus predict how they will be looked-up during execution.
> Kyle simpson

```js
function b() {
  var result = 3;
}
function a() {
  var result = 2;
  b();
}
var result = 1;
a();
```

# Outher enviorment

```js
function b() {
  console.log(result);
}

function a() {
  var result = 2;
}

var result = 1;
a();
```

> Reference over a variable, not a value

```js
let speaker = "scotti";

function callSpeaker() {
  console.log(speaker);
}

speaker = "Guilherme";
callSpeaker();
```

**metafora do espelho**
Pense no escopo como um espelho, onde a função está dentro do espelho, podendo enxergar todo o environment de fora, porém ao olharmos de fora, vemos apenas o reflexo, impossibilitando de enxergar o conteúdo interno

```js
function speaker() {
  var lastName = "Scotti";
}
speaker();
console.log(lastName);
```

# ES6

```js
var speaker = "Guilherme";
function name() {
  console.log(speaker);
  // ReferenceError or TDZ error
  let speaker = "Scotti";
}
name();
```

# Closure Definition

> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

```js
function say() {
  let hello = "Hello";

  return function() {
    console.log(hello);
  };
}

var hello = "Hello World";

const sayHelloWorld = say();

sayHelloWorld();
// Hello

//-----//
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}

wait("Hello, closure!");

//-------//

function celebrityName(first) {
  var intro = "This is ";

  return function lastName(last) {
    return intro + first + " " + last;
  };
}
var intro = "Hello ";
const mjName = celebrityName("Michael");
mjName("Jackson");
//This is Michael Jackson
```

curring leva closure

fetch leva closure

```js
function foo() {
  // 'scope of foo' aka lexical scope for bar
  var memory = "hello closure";
  return function bar() {
    console.log(memory);
  };
}
var memory = null,
  baz = foo();
baz(); // 'hello closure'
```

```js
function b() {
  //console.log(result);
  var result = 3;
}
function a() {
  var result = 2;
  b();
}
var result = 1;
a();
```

https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md
https://medium.com/@nickbalestra/javascripts-lexical-scope-hoisting-and-closures-without-mystery-c2324681d4be
https://javascript.info/closure
https://github.com/ericdouglas/traduz-ai/blob/master/javascript/004-entenda-closures-no-javaScript-com-facilidade.md
https://medium.com/@stephanowallace/javascript-mas-afinal-o-que-s%C3%A3o-closures-4d67863ca9fc
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#Lexical_scoping
