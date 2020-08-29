(function() {
  var messages = {
    doLargeLoop: function() {
      var i,
        sum = 0,
        start,
        end;
      console.log("Worker Thread: starting large loop");
      start = Date.now();
      for (i = 0; i < 10000000000; i++) {
        sum += i;
      }
      end = Date.now();
      postMessage(
        `Elapsed time ${((end - start) / 1000).toFixed(2)} sec, sum=${sum}`
      );
    }
  };

  onmessage = function(msg) {
    if (messages.hasOwnproperty(msg.data)) {
      messages[msg.data]();
    }
  };
})();
