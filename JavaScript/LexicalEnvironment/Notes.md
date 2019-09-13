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
