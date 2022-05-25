import Phaser from "phaser";
import Core from "./Core";

export default class Game extends Phaser.Game {
  static Core: Core;
  static BlockSize = 32;
  constructor(config?: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
