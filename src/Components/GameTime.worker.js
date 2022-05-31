let timer;
let time = 0;
clearInterval(timer);
timer = setInterval(() => {
  time++;
  postMessage(time);
}, 1000);
