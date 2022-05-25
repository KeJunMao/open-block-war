import Game from "../Game/Game";
import Block from "./Block";

export default class Map {
  public blocks: Block[][] = [];
  public blocksGroup: Phaser.GameObjects.Group;
  constructor(public scene: Phaser.Scene) {
    this.blocksGroup = new Phaser.GameObjects.Group(scene);
    for (let i = 0; i < this.scene.renderer.width / Game.BlockSize; i++) {
      const row = [];
      for (let j = 0; j < this.scene.renderer.height / Game.BlockSize; j++) {
        const block = new Block(
          this.scene,
          i * Game.BlockSize,
          j * Game.BlockSize
        );
        this.blocksGroup.add(block);
        row.push(block);
      }
      this.blocks.push(row);
    }
  }

  public getBlock(x: number, y: number): Block | undefined {
    if (x < 0 || y < 0) {
      return undefined;
    }
    if (x >= this.blocks.length || y >= this.blocks[0].length) {
      return undefined;
    }
    return this.blocks[x][y];
  }

  public getMaxX(): number {
    return this.blocks.length;
  }

  public getMaxY(): number {
    return this.blocks[0].length;
  }
}
