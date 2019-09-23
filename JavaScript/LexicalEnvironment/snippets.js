/*var teacher = "Guilherme";
{
  console.log(teacher); // ReferenceError or TDZ error
  let teacher = "Scotti";
}
*/

hello();
function hello() {
  console.log("Hello");
  world();
}

function world() {
  console.log("World");
}
