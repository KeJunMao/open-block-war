import Game from "../Game/Game";
import { store } from "../store";
import { setTime } from "../store/rootSlice";
import GameTimeWorker from "./GameTime.worker.js?worker&inline";

export default class GameTime {
  public time: number = 0;
  static EndTime: number = 900;
  worker!: Worker;
  constructor(public scene: Phaser.Scene) {
    this.update(0);
    this.initWorker();
  }

  initWorker() {
    this.worker = new GameTimeWorker();
    this.worker.onmessage = (message) => {
      const time = message.data;
      this.update(time);
    };
    this.worker.onerror = (_ev) => {
      this.update(GameTime.EndTime);
    };
  }

  update(time: number) {
    this.time = time;
    if (this.time >= GameTime.EndTime) {
      this.worker.terminate();
      Game.Core.checkGameOverByTime();
    }
    store.dispatch(setTime(this.time));
  }
}
