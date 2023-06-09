import CircleMaskImage from "phaser3-rex-plugins/plugins/circlemaskimage";
import Game from "../Game/Game";
import Team from "./Team";
import User from "./User";

export default class Player extends Phaser.GameObjects.Container {
  face: CircleMaskImage;
  static MinSpeed: number = 150;
  speed: number = Player.MinSpeed;
  user: User | undefined;
  children: Player[] = [];
  speedCoefficient: number = 0;
  sizeCoefficient: number = 0;
  line?: Phaser.GameObjects.Line;
  flash: Phaser.Tweens.Tween;
  flashStar: Phaser.GameObjects.Image;

  constructor(
    public scene: Phaser.Scene,
    x: number,
    y: number,
    public team: Team,
    public parent?: Player
  ) {
    super(scene, x, y);
    this.face = new CircleMaskImage(scene, 0, 0, "noFace").setOrigin(0);

    this.add(this.face);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.Body.setCollideWorldBounds(true);
    this.Body.setBounce(1, 1);
    this.setDepth(5000);
    if (parent) {
      this.createOrUpdateLine();
    }
    const vec = this.scene.physics.velocityFromAngle(
      Math.random() * 360,
      this.speed
    );
    this.Body.setVelocity(vec.x, vec.y);
    this.setFace("noFace");
    this.flashStar = this.scene.add
      .image(Game.BlockSize / 2, Game.BlockSize / 2, "star")
      .setScale(2)
      .setAlpha(0);
    this.add(this.flashStar);

    this.flash = this.scene.add.tween({
      targets: this.flashStar,
      duration: 100,
      scale: { from: 0, to: 2 },
      alpha: { from: 0, to: 1 },
      yoyo: 1,
      hold: 100,
      loop: 0,
    });
    this.flash.stop();
  }

  speedUp(count = 1) {
    this.speedCoefficient += count;
    // 暂时解除速度限制
    let speed = 220 * Math.log(this.speedCoefficient + 1) + Player.MinSpeed;
    // const speed = this.speed + 50 * count;
    this.setSpeed(speed);
    this.children.forEach((v) => {
      v.setSpeed(speed);
    });
  }

  sizeUp(count = 1) {
    this.sizeCoefficient += count;
    let size = 0.8 * Math.log(this.sizeCoefficient + 1) + 1;
    // let size = this.scale + 0.1 * count;
    this.setBodySize(size);
  }

  setBodySize(size: number) {
    this.setScale(size);
    this.children.forEach((v) => v.setBodySize(size));
  }

  makeChild(count = 1) {
    if (this.team.homeBlock) {
      const { x, y } = this.team.homeBlock;
      for (let i = 0; i < count; i++) {
        const player = new Player(this.scene, x, y, this.team, this);
        // @ts-ignore
        const textureKey = this.face._textureKey;
        player.user = this.user;
        player.setFace(textureKey);
        player.setSpeed(this.speed);
        player.setTeam(this.team);
        player.setScale(this.scale);
        this.children.push(player);
      }
    }
  }

  tp() {
    if (this.team.homeBlock) {
      const { x, y } = this.team.homeBlock;
      this.setPosition(x, y);
      this.children.forEach((p) => p.setPosition(x, y));
    }
  }

  createOrUpdateLine() {
    if (!this.parent) return;
    if (this.line) {
      this.line.setTo(
        this.parent.x + Game.BlockSize / 2,
        this.parent.y + Game.BlockSize / 2,
        this.x + Game.BlockSize / 2,
        this.y + Game.BlockSize / 2
      );
    } else {
      this.line = this.scene.add
        .line(0, 0, 0, 0, 100, 100, 0xffffff)
        .setOrigin(0)
        .setAlpha(0.4)
        .setDepth(this.depth + 1);
    }
  }

  showFlash(count = 1) {
    if (this.parent) {
      this.flash.loop = this.parent.flash.loop;
    } else {
      this.flash.loop = Math.min(this.flash.loopCounter + count, 5);
    }
    if (this.flash.loop < 0) {
      this.flash.loop = 0;
    }
    this.flash.restart();
    this.children.forEach((v) => v.showFlash(count));
  }

  setSpeed(speed: number) {
    this.speed = speed;
    const v = this.Body.velocity.clone().normalize();
    this.Body.setVelocity(v.x * this.speed, v.y * this.speed);
  }

  setFace(faceKey: string) {
    try {
      this.face.setTexture(faceKey);
    } catch (error) {
      return;
    }
    this.face.setDisplaySize(Game.BlockSize, Game.BlockSize);
    this.Body.setCircle(Game.BlockSize / 2);
    this.setScale(1.2);
    this.children.forEach((v) => v.setFace(faceKey));
  }

  setUser(user: User) {
    this.user = user;
  }

  setTeam(team: Team) {
    this.team.players.remove(this);
    this.team = team;
    this.team.players.add(this);
    this.children.forEach((v) => v.setTeam(team));
    if (!this.parent) {
      if (this.user?.team !== team) {
        this.user?.setTeam(team);
      }
    }
  }

  get Body() {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  update(): void {
    this.createOrUpdateLine();
  }
}
