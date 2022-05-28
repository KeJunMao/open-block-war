import Game from "../Game/Game";
import { NpcConfig } from "../store/configSlice";
import Npc from "./Npc";
import Team from "./Team";

export default class NpcGroup extends Phaser.GameObjects.Group {
  farms: Map<string, Phaser.Time.TimerEvent> = new Map();
  npcs: Map<string, Npc> = new Map();
  constructor(
    scene: Phaser.Scene,
    public team: Team,
    public configs?: NpcConfig[]
  ) {
    super(scene);
    this.runChildUpdate = true;
    this.scene.add.existing(this);
  }

  init() {
    if (this.configs) {
      this.configs.forEach((config) => {
        this.farms.set(
          config.name,
          this.scene.time.addEvent({
            delay: config.delay,
            callback: () => {
              if (this.npcs.has(config.name)) {
                const rand = Phaser.Math.Between(0, 100);
                if (config.rate >= rand) {
                  this.npcs.get(config.name)?.makeChild();
                  Game.Core.toast?.showMessage(
                    `${this.team.name}增援${config.name}已抵达`
                  );
                }
              } else {
                const npc = new Npc(this.scene, 0, 0, this.team);
                npc.setScale(config.scale);
                npc.setSpeed(config.speed);
                this.scene.load.image(config.name, config.face);
                this.scene.load.once("complete", () => {
                  npc.setFace(config.name);
                });
                this.scene.load.start();
                npc.tp();
                this.npcs.set(config.name, npc);
              }
            },
            callbackScope: this,
            loop: config.loop,
            startAt: config.startAt,
          })
        );
      });
    }
  }

  setDie() {
    this.farms.forEach((v) => v.destroy());
    this.npcs.forEach((v) => {
      v.setDie();
      this.remove(v, true, true);
    });
    this.clear(true, true);
  }
}
