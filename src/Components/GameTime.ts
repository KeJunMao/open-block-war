import Game from "../Game/Game";
import { store } from "../store";
import { setTime } from "../store/rootSlice";

export default class GameTime {
  public time: number = 0;
  static EndTime: number = 900;
  constructor(public scene: Phaser.Scene) {
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.update,
      callbackScope: this,
      loop: true,
    });
  }

  reset() {
    this.time = 0;
  }

  updateTime() {
    this.time += GameTime.EndTime / 4;
    this.time = Math.min(this.time, GameTime.EndTime);
  }

  update() {
    this.time += 1;
    store.dispatch(setTime(this.time));
    if (this.time >= GameTime.EndTime) {
      this.scene.time.removeAllEvents();
      Game.Core.checkGameOverByTime();
    }
  }
}
