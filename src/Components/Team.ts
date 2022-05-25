import Game from "../Game/Game";
import Block from "./Block";
import Player from "./Player";
import User from "./User";

export default class Team {
  players: Phaser.GameObjects.Group;
  blocks: Phaser.GameObjects.Group;
  users: Set<User> = new Set();
  homeBlock: Block | undefined;
  public joinCommand: string[] = [];
  constructor(
    public scene: Phaser.Scene,
    public name: string,
    public color: number,
    public homeX: number,
    public homeY: number,
    joinCommand: string[],
    public shortName?: string,
    public icon?: string,
    public hall?: string
  ) {
    this.players = new Phaser.GameObjects.Group(scene);
    this.blocks = new Phaser.GameObjects.Group(scene);
    this.homeBlock = Game.Core.map?.getBlock(homeX, homeY);
    this.initHomeBlock();
    this.joinCommand = [...joinCommand, this.name];
    if (this.shortName) {
      this.joinCommand.push(this.shortName);
    }
  }

  initHomeBlock() {
    if (this.homeBlock) {
      this.homeBlock?.setFillStyle(this.color);
      this.homeBlock.setTeam(this);
      this.homeBlock?.setIsHome(this.hall);
    }
  }

  makeUser(id: number, name: string) {
    if (!this.homeBlock) return;
    if (this.isDie) return;
    if (this.getUserById(id)) return;
    const { x, y } = this.homeBlock;
    const player = new Player(this.scene, x, y, this);
    player.setTeam(this);
    const user = new User(id, name, this, player);
    player.user = user;
    user.setTeam(this);
  }

  getUserById(id: number) {
    return [...this.users].find((user) => user.id === id);
  }

  static GetUserById(id: number) {
    const teams = Game.Core.teams;
    const users = teams.map((v) => [...v.users]).flat();
    return users.find((user) => user.id === id);
  }

  hasJoinKeyword(text: string) {
    return this.joinCommand.some((c) => text.includes(c));
  }

  obedience(team: Team) {
    if (this.isDie) {
      [...this.users].forEach((user) => {
        user.setTeam(team);
      });
    }
  }

  get isDie() {
    return this.homeBlock?.team !== this;
  }
}
