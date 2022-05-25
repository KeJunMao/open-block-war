import Game from "../Game/Game";
import Player from "./Player";
import Team from "./Team";

export default class User {
  isFaceLoadDone = false;
  score = 0;
  constructor(
    public id: number,
    public name: string,
    public team: Team,
    public player: Player,
    public face?: string
  ) {
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

  get FaceKey() {
    return `${this.id}-${this.name}`;
  }
}
