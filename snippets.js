for (var i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
// 5 5 5 5 5
/*for (let i = 0; i < 5; ++i) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}*/
// 0 1 2 3 4
