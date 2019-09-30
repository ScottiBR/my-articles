/*var teacher = "Guilherme";
{
  console.log(teacher); // ReferenceError or TDZ error
  let teacher = "Scotti";
}
*/
function say() {
  var hello = "Hello";

  return function sayHello() {
    console.log(hello);
  };
}
var hello = "Hello World";
const sayHelloWorld = say();
sayHelloWorld();
