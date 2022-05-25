import Phaser from "phaser";
import Core from "../Game/Core";
import Game from "../Game/Game";
import MainScene from "./MainScene";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(PreloadScene.name);
  }

  preload() {
    this.load.image("noFace", "http://i0.hdslb.com/bfs/face/member/noface.jpg");
    this.load.image("star", "/img/star.png");
  }

  create() {
    Game.Core = new Core(this.game, this);
    this.scene.start(MainScene.name);
  }
}
