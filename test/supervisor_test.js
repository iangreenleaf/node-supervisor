var assert = require("assert");
var fs = require("fs");
var child_process = require("child_process");

supervisorProc = child_process.spawn("node", [__dirname + "/../lib/cli-wrapper.js", __dirname + "/../test/server.js"]);

expectedBoots = 2;

supervisorProc.on("exit", function () { assert.equal(expectedBoots, 0, "Server exited early"); })

supervisorProc.stdout.on("data", function (out) {
  if (out.toString().trim() == "Starting server") {
    expectedBoots--;
  }
  if (expectedBoots == 1) {
    fs.utimes(__dirname + "/../test/server.js", Date.now(), Date.now());
  }
  if (expectedBoots == 0) {
    supervisorProc.kill();
  }
});
