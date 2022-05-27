import Game from "../Game/Game";
import { store } from "../store";
import Team from "./Team";

export default class Block extends Phaser.GameObjects.Rectangle {
  hp = 0;
  isHome: boolean = false;
  team: Team | undefined;
  hpText: Phaser.GameObjects.Text | undefined;
  teamName: Phaser.GameObjects.Text | undefined;
  tween: Phaser.Tweens.Tween | undefined;
  hall: Phaser.GameObjects.Image | undefined;
  tile: Phaser.GameObjects.Image | undefined;
  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y, Game.BlockSize, Game.BlockSize);
    this.setOrigin(0, 0);
    const blockColor = store.getState().config.styleTheme.blockColor;
    this.setFillStyle(blockColor !== undefined ? blockColor : 0xebffe2);
    this.setStrokeStyle(1, 0x000000, 0.1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
  }

  setTile(tile: string) {
    if (this.tile) {
      this.tile.setTexture(tile);
    } else {
      this.setVisible(false);
      this.tile = this.scene.add
        .image(0, 0, tile)
        .setDisplaySize(Game.BlockSize, Game.BlockSize)
        .setDepth(this.depth + 1);
      Phaser.Display.Align.In.Center(this.tile, this);
    }
  }

  setIsHome(hall?: string) {
    if (hall) {
      this.scene.load.image(hall, hall);
      this.scene.load.once("complete", () => {
        this.hall = this.scene.add
          .image(0, 0, hall)
          .setSize(Game.BlockSize * 2, Game.BlockSize * 2)
          .setDisplaySize(Game.BlockSize * 2, Game.BlockSize * 2)
          .setDepth(this.depth + 2);
        Phaser.Display.Align.In.Center(this.hall, this);
        this._setIsHome();
      });
      this.scene.load.start();
    } else {
      this._setIsHome();
    }
  }

  _setIsHome() {
    this.hp = 5;
    this.isHome = true;
    this.teamName = this.scene.add
      .text(0, 0, `${this.team?.name}`, {
        fontSize: "48px",
        stroke: "#000000",
        strokeThickness: 5,
        fontStyle: "bold",
      })
      .setOrigin(0)
      .setAlpha(0.5)
      .setDepth(this.depth + 2);
    Phaser.Display.Align.To.BottomCenter(
      this.teamName,
      this.hall ? this.hall : this
    );
    this.hpText = this.scene.add
      .text(0, 0, `${this.hp}`, {
        fontSize: "32px",
        stroke: "#000000",
        strokeThickness: 5,
        fontStyle: "bold",
      })
      .setOrigin(0)
      .setDepth(this.depth + 3);
    Phaser.Display.Align.In.Center(this.hpText, this);
    // if (!this.team?.icon) {
    //   this.tween = this.scene.tweens.add({
    //     targets: this.teamName,
    //     alpha: 0,
    //     duration: 500,
    //     yoyo: true,
    //     repeat: -1,
    //     hold: 5000,
    //     delay: 5000,
    //     repeatDelay: 5000,
    //   });
    // }
  }

  setIsNotHome() {
    this.isHome = false;
    this.hpText?.setActive(false);
    this.hpText?.setVisible(false);
    this.tween?.stop();
    this.teamName?.setActive(false);
    this.teamName?.setVisible(false);
    this.hall?.setActive(false);
    this.hall?.setVisible(false);
  }

  setTeam(team: Team) {
    const oldTeam = this.team;
    if (this.isHome) {
      this.hp--;
      if (this.hp <= 0) {
        this._setTeam(team);
        this.setIsNotHome();
        oldTeam?.obedience(team);
      }
    } else {
      this._setTeam(team);
    }
  }

  private _setTeam(team: Team) {
    this.team?.blocks.remove(this);
    Game.Core.map?.blocksGroup.remove(this);
    this.setFillStyle(team.color);
    this.team = team;
    team.blocks.add(this);
    // set tile
    if (team.tile) {
      this.setTile(team.tile);
    }
  }

  update(): void {
    if (this.hpText) {
      this.hpText.setText(`${this.hp}`);
    }
  }
}
