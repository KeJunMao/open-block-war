import Game from "../Game/Game";
import Player from "./Player";
import Team from "./Team";

export default class User {
  isFaceLoadDone = false;
  score = 0;
  sourceTeam: Team;
  constructor(
    public id: number,
    public name: string,
    public team: Team,
    public player: Player,
    public face?: string
  ) {
    this.sourceTeam = team;
    this.load();
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
    this.sourceTeam = team;
    this.score = 0;
    this.player.tp();
  }

  get FaceKey() {
    return `${this.id}-${this.name}`;
  }
}
