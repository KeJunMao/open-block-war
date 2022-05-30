self.onmessage = (_message) => {
  let time = 0;
  setInterval(() => {
    time++;
    postMessage(time);
  }, 1000);
};
