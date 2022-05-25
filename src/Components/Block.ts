import Game from "../Game/Game";
import Team from "./Team";

export default class Block extends Phaser.GameObjects.Rectangle {
  hp = 0;
  isHome: boolean = false;
  team: Team | undefined;
  hpText: Phaser.GameObjects.Text | undefined;
  teamName: Phaser.GameObjects.Text | undefined;
  tween: Phaser.Tweens.Tween | undefined;
  constructor(scene: Phaser.Scene, x = 0, y = 0) {
    super(scene, x, y, Game.BlockSize, Game.BlockSize);
    this.setOrigin(0, 0);
    this.setFillStyle(0xebffe2);
    this.setStrokeStyle(1, 0x000000, 0.1);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
  }

  setIsHome() {
    this.hp = 5;
    this.isHome = true;
    this.teamName = this.scene.add
      .text(this.x, this.y + 40, `${this.team?.name}`, {
        fontSize: "64px",
        stroke: "#000000",
        strokeThickness: 5,
        fontStyle: "bold",
      })
      .setOrigin(0)
      .setScale(0.8)
      .setAlpha(0.5);
    this.teamName.setX(this.x - this.teamName.width / 4);
    this.hpText = this.scene.add
      .text(this.x + 4, this.y, `${this.hp}`, {
        fontSize: "32px",
        stroke: "#000000",
        strokeThickness: 5,
        fontStyle: "bold",
      })
      .setOrigin(0);
    this.tween = this.scene.tweens.add({
      targets: this.teamName,
      alpha: 0,
      duration: 500,
      yoyo: true,
      repeat: -1,
      hold: 5000,
      delay: 5000,
      repeatDelay: 5000,
    });
  }

  setIsNotHome() {
    this.isHome = false;
    this.hpText?.setActive(false);
    this.hpText?.setVisible(false);
    this.tween?.stop();
    this.teamName?.setActive(false);
    this.teamName?.setVisible(false);
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
  }

  update(): void {
    if (this.hpText) {
      this.hpText.setText(`${this.hp}`);
    }
  }
}
