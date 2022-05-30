import Phaser from "phaser";
import Game from "../Game/Game";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super(MainScene.name);
  }

  create() {
    this.physics.world.setFPS(30);
    Game.Core.init(this);
  }

  update(_time: number, _delta: number): void {
    Game.Core.update();
  }
}
