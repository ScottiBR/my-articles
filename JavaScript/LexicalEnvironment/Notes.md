# Porque aprender esses conceitos

Why learn closure when I could be learning Node or React?

Shouldn’t I be spending my time with understanding frameworks - they’re what I actually do on the job 👩🏽‍💻 Why should I learn closure in JavaScript??

Becoming a developer who has mastery over their tools requires understanding what’s going on under-the-hood.

True mastery means understanding the core principles and building up from them. That being said, being a developer is about having to make things work without understanding everything.

They call it choosing your ‘level of abstraction’. You cannot understand everything down to the silicon.

But that’s not the purpose of this course. The purpose of this course is for you take time out of ‘making it work to meet deadlines’ to truly understand a concept that will allow you to accelerate all your future engineering.

Every time you understand something deeply it’s an investment for the future! It’s like building a system that’s more flexible and ready to scale. It’ll take time but it will pay off in the rest of your engineering ⏱.

# porposta

Não falar da compilation phase no primeiro capitulo passar para Execution envirioment
no terceiro falar sobre Execution envirioment
call stack event loop
no quarto hoisting e continua
Lexical Scope e explicar a metafora do prédio do kyle
Closure

# Hoisting é uma metafora

Apesar de ser especificada no TC39, hoisting é an language convention created academicamente to discuss the idea of lexical envirioment, without soo much overhead

```js
console.log(a); //??
console.log(b); //??
var a = b;
var b = 2;
console.log(b); //2
console.log(a); //??
```

```js
var a;
var b;
console.log(a); //undefined
console.log(b); //undefined
a = b;
b = 2;
console.log(b); //2
console.log(a); //undefined
```

# Hoisting move variable declarations and function declarations to the top of our code

that' worng, that's just a easy way to say what the compiler do parsing your code, and managing the lexical scope

# TDZ em outras palavras significa, não encoste nessa variável até ela ser inicializada no tempo de execução

Sabemos como hoisting funciona, e como o lexical scope funciona, então porque o código abaixo está errado?

```js
var teacher = "Kyle";
{
  console.log(teacher); // ReferenceError or TDZ error
  let teacher = "kyle";
}
```

Porque quando o escopo global for compilado, vai alocar um espaço na memoria para teacher com valor undefined, no global scope
depois vai iniciar o block scope, encontrar uma variável teacher nesse bloco, e alocala no TDZ, por isso ao chamar o console, recebemos um reference error

# porque tdz existe? para forçar a utilizarmos Let e Const apenas após a sua inicialização? NÃO

existe por um motivo academico, quando a equipe do ecmascript pensaram em criar const, eles encontraram um dilema, se o const inicializar undefined igual var, e depois assume um valor ao ser inicializado, quer dizer que é uma constante que em determinado periodo tem valor undefined e depois um valor definido, isso está errado constante tem que ser única imutável...
então criaram o TDZ para não permitir esse comportamento, e como o let se encaixava mais nesse contexto adicionaram juntamente no pacode do TDZ

may i quote Allen Wirfs-Brock project editor of the ECMAScript 2015

> [As far as I'm concerned the motivating feature for TDZs is to provide a rational semantics for const. There was significant technical discussion of that topic and TDZs emerged as the best solution. An alternative argument you could make would be to eliminate const.](https://mail.mozilla.org/pipermail/es-discuss/2012-September/024996.html)

mostrar as specs para provar

e eu acho que eles fizeram um trabalho meio duvidosso nesse ponto, porque

```js
const words = "Hello TDC";
words = "Bye TDC"; // Type error

const teachers = ["Hello", "TDC"];
teachers[0] = "bye"; // ['Bye','TDC'];
```

e isso é um problema que já ocorreu no java por exemplo, onde eles tiraram a palavra const para colocar final no lugar, evitando esse tipo de associação de uma constante que pode ser assigned to other value

MINHA OPINIÃO pessoal, é que você só deve usar const em tipos primitivos e imutáveis e não pelo hype do ES6, preffer let instead of const for reassingment variables

um ganho com hoisting é que você pode declarar as funções no final do arquivo, e o core do código no topo, assim não precisa navegar o arquivo inteiro para entender o que o código faz, basta ler as primeiras linhas e se interessar pode verificar as functions no final
MOstrar que é possível refatorar código colocando functions para fora do escopo, seguindo o padrão do clean code fazendo o código ficar mais redable, sem nested functions, mais flat

# prefira function declaration over function expressios em certos casos

Recursividade mutual, mutural recursion

```js
a(1);

function a(x) {
  if (x > 20) return x;
  return b(x + 2);
}

function b(x) {
  return c(x) + 1;
}

function c(x) {
  return a(x * 2);
}
```

https://frontendmasters.com/courses/deep-javascript-v3/lexical-scope-elevator/
https://frontendmasters.com/courses/javascript-foundations/
https://frontendmasters.com/courses/javascript-foundations/challenge-3-hoisting/
