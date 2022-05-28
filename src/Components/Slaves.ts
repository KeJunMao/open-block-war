import Game from "../Game/Game";
import Npc from "./Npc";
import Team from "./Team";
import User from "./User";

export interface Slave {
  name: string;
  speed: number;
  scale: number;
  face: string;
  level: string;
}

export default class Slaves extends Phaser.GameObjects.Group {
  npcs: Map<string, Npc> = new Map();
  collider!: Phaser.Physics.Arcade.Collider;

  constructor(public scene: Phaser.Scene, public user: User) {
    super(scene);
    this.runChildUpdate = true;
    this.scene.add.existing(this);
    this.addCollider();
  }

  addCollider() {
    const otherTeamsBlock = Team.GetOtherTeams(this.user.team).map(
      (team) => team.blocks
    );
    if (Game.Core.map) {
      this.collider = this.scene.physics.add.collider(
        this,
        [Game.Core.map.blocksGroup, ...otherTeamsBlock],
        //@ts-ignore
        Game.Core.onPlayerOverlapBlock.bind(Game.Core)
      );
    }
  }

  makeSlave(slave: Slave) {
    const slaveId = `${slave.name}-${slave.level}`;
    if (this.npcs.has(slaveId)) {
      this.npcs.get(slaveId)?.makeChild();
    } else {
      const npc = new Npc(
        this.scene,
        0,
        0,
        this.user.team,
        this,
        this.user.player
      );
      npc.setScale(slave.scale);
      npc.setSpeed(slave.speed);
      this.scene.load.image(slave.name, slave.face);
      this.scene.load.once("complete", () => {
        npc.setFace(slave.name);
      });
      this.scene.load.start();
      npc.tp();
      this.npcs.set(slaveId, npc);
    }
  }

  get Count() {
    let count = 0;
    this.npcs.forEach((npc) => {
      count += npc.children.length + 1;
    });
    return count;
  }

  reset() {
    this.npcs.forEach((v) => {
      v.setDie();
      this.remove(v, true, true);
    });
    this.clear(true, true);
    this.npcs.clear();
    this.collider.destroy();
    this.addCollider();
  }
}
