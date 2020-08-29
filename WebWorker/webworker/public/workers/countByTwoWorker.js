self.onmessage = function(event) {
  let intervalID = null;
  let count = event.data;

  intervalID = setInterval(() => {
    count += 2;
    if (count > 30) {
      clearInterval(intervalID);
    }
    self.postMessage(count);
  }, 2000);
};
