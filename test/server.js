console.log("Starting server");

var loop = function() {
  process.nextTick(loop);
}
loop();
