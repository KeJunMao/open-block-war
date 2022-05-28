import Game from "../Game/Game";
import Player from "./Player";
import Slaves from "./Slaves";
import Team from "./Team";

export default class User {
  isFaceLoadDone = false;
  score = 0;
  sourceTeam: Team;
  slaveGroup: Slaves;
  constructor(
    public id: number,
    public name: string,
    public team: Team,
    public player: Player,
    public face?: string
  ) {
    this.sourceTeam = team;
    this.load();
    this.slaveGroup = new Slaves(Game.Core.scene, this);
  }

  load() {
    if (this.isFaceLoadDone) {
      this.player.setFace(this.FaceKey);
      return;
    }
    if (this.face) {
      Game.Core.scene.load.image(this.FaceKey, this.face);
      Game.Core.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
        this.isFaceLoadDone = true;
        this.player.setFace(this.FaceKey);
      });
      Game.Core.scene.load.start();
    } else {
      fetch(`/api/b/face/${this.id}`)
        .then((r) => r.json())
        .then((json) => {
          this.face = json.face;
          this.load();
        });
    }
  }

  setTeam(team: Team) {
    this.team.users.delete(this);
    this.team = team;
    this.team.users.add(this);
    if (this.player?.team !== team) {
      this.player?.setTeam(team);
    }
  }

  // 投靠
  obedience(team: Team) {
    if (this.team === team) return;
    if (team.isDie) return;
    this.setTeam(team);
    this.slaveGroup.reset();
    this.sourceTeam = team;
    this.score = 0;
    this.player.tp();
  }

  tp() {
    this.player.tp();
    this.slaveGroup.children.each((player) => {
      //@ts-ignore
      player.tp();
    });
  }

  get FaceKey() {
    return `${this.id}-${this.name}`;
  }
}
