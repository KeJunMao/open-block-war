import Game from "../Game/Game";
import Player from "./Player";
import Team from "./Team";

export default class Npc extends Player {
  public children: Npc[];
  faceBg: Phaser.GameObjects.Arc;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    team: Team,
    public group: Phaser.GameObjects.Group,
    parent?: Player
  ) {
    super(scene, x, y, team, parent);
    this.children = [];
    this.setTeam(team);
    let bgColor = 0xffffff;
    if (this.parent instanceof Npc) {
      bgColor = this.parent.faceBg.fillColor;
    }
    this.faceBg = this.scene.add.circle(
      this.face.displayWidth / 2,
      this.face.displayWidth / 2,
      Game.BlockSize / 2 + 5,
      bgColor
    );

    // Phaser.Display.Align.In.Center(faceBg, this);
    this.add(this.faceBg);
    this.sendToBack(this.faceBg);
  }

  makeChild(count = 1) {
    if (this.team.homeBlock) {
      const { x, y } = this.team.homeBlock;
      for (let i = 0; i < count; i++) {
        const npc = new Npc(this.scene, x, y, this.team, this.group, this);
        npc.user = this.user;
        // @ts-ignore
        const textureKey = this.face._textureKey;
        npc.user = this.user;
        npc.setFace(textureKey);
        npc.setSpeed(this.speed);
        npc.setTeam(this.team);
        npc.setScale(this.scale);
        npc.line?.setAlpha(0.1);
        this.children.push(npc);
      }
    }
  }

  setTeam(team: Team): void {
    this.team = team;
    this.group.add(this);
    this.children.forEach((v) => v.setTeam(team));
  }

  setDie() {
    this.setActive(false);
    this.setVisible(false);
    this.line?.setActive(false);
    this.line?.setVisible(false);
    this.children.forEach((v) => v.setDie());
  }

  setColorByLevel(level: string) {
    switch (level) {
      case "R":
        this.faceBg.setFillStyle(0x1eff00);
        break;
      case "SR":
        this.faceBg.setFillStyle(0xa334ee);
        break;
      case "SSR":
        this.faceBg.setFillStyle(0xff8000);
        break;

      default:
        break;
    }
  }
}
