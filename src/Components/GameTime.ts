import Game from "../Game/Game";
import { store } from "../store";
import { setTime } from "../store/rootSlice";

export default class GameTime {
  public time: number = 0;
  static EndTime: number = 900;
  worker!: Worker;
  constructor(public scene: Phaser.Scene) {
    this.initWorker();
  }

  initWorker() {
    if (this.worker) {
      this.worker.terminate();
    }
    this.worker = new Worker(new URL("./GameTime.worker.js", import.meta.url));
    this.worker.postMessage({});
    this.worker.onmessage = (message) => {
      const time = message.data;
      this.update(time);
    };
  }

  reset() {
    this.initWorker();
  }

  updateTime() {
    // this.time -= GameTime.EndTime / 4;
    // this.time = Math.max(this.time, 0);
  }

  update(time: number) {
    this.time = time;
    store.dispatch(setTime(this.time));
    if (this.time >= GameTime.EndTime) {
      Game.Core.checkGameOverByTime();
    }
  }
}
