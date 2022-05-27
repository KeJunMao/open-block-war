import Player from "./Player";
import Team from "./Team";

export default class Npc extends Player {
  public children: Npc[];
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    team: Team,
    parent?: Player
  ) {
    super(scene, x, y, team, parent);
    this.children = [];
    this.setTeam(team);
  }

  makeChild(count = 1) {
    if (this.team.homeBlock) {
      const { x, y } = this.team.homeBlock;
      for (let i = 0; i < count; i++) {
        const npc = new Npc(this.scene, x, y, this.team, this);
        // @ts-ignore
        const textureKey = this.face._textureKey;
        npc.user = this.user;
        npc.setFace(textureKey);
        npc.setSpeed(this.speed);
        npc.setTeam(this.team);
        npc.setScale(this.scale);
        this.children.push(npc);
      }
    }
  }

  setTeam(team: Team): void {
    this.team = team;
    this.team.npcsGroup.add(this);
    this.children.forEach((v) => v.setTeam(team));
  }

  setDie() {
    this.setActive(false);
    this.setVisible(false);
    this.line?.setActive(false);
    this.line?.setVisible(false);
    this.children.forEach((v) => v.setDie());
  }
}
