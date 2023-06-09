import Game from "../Game/Game";
import { FarmConfig } from "../store/configSlice";
import Block from "./Block";
import Farms from "./Farms";
import Player from "./Player";
import User from "./User";

export default class Team {
  players: Phaser.GameObjects.Group;
  blocks: Phaser.GameObjects.Group;
  users: Set<User> = new Set();
  homeBlock: Block | undefined;
  public joinCommand: string[] = [];
  farms: Farms;
  constructor(
    public scene: Phaser.Scene,
    public name: string,
    public color: number,
    public homeX: number,
    public homeY: number,
    joinCommand: string[],
    public shortName?: string,
    public icon?: string,
    public hall?: string,
    public tile?: string,
    public npcsConfig?: FarmConfig[]
  ) {
    this.players = new Phaser.GameObjects.Group(scene);
    this.blocks = new Phaser.GameObjects.Group(scene);
    this.homeBlock = Game.Core.map?.getBlock(homeX, homeY);
    this.joinCommand = [...joinCommand, this.name];
    this.farms = new Farms(this.scene, this, this.npcsConfig);
    if (this.shortName) {
      this.joinCommand.push(this.shortName);
    }
    this.loadTile();
  }

  loadTile() {
    if (!this.tile) {
      this.initHomeBlock();
      return;
    }
    this.scene.load.image(this.tile, this.tile);
    this.scene.load.once("complete", () => {
      this.initHomeBlock();
      this.initFarms();
    });
    this.scene.load.start();
  }

  initHomeBlock() {
    if (this.homeBlock) {
      this.homeBlock?.setFillStyle(this.color);
      this.homeBlock.setTeam(this);
      this.homeBlock?.setIsHome(this.hall);
    }
  }

  initFarms() {
    this.farms.init();
  }

  makeUser(id: number, name: string, face?: string) {
    if (!this.homeBlock) return;
    if (this.isDie) return;
    if (Team.GetUserById(id)) return;
    const { x, y } = this.homeBlock;
    const player = new Player(this.scene, x, y, this);
    player.setTeam(this);
    const user = new User(id, name, this, player, face);
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

  static GetMinPlayerTeam() {
    const teams = Game.Core.teams;
    const minTeam = [...teams].sort(
      (a, b) => a.players.children.size - b.players.children.size
    )[0];
    return minTeam;
  }

  static GetOtherTeams(team: Team) {
    return Game.Core.teams.filter((t) => t !== team);
  }

  hasJoinKeyword(text: string) {
    return this.joinCommand.some((c) => c === text);
  }

  obedience(team: Team) {
    if (this.isDie) {
      [...this.users].forEach((user) => {
        user.setTeam(team);
        user.slaveGroup.reset();
      });
      this.farms?.setDie();
    }
  }

  get mvpUser(): User | undefined {
    return [...this.users]
      .filter((u) => u.sourceTeam === u.team)
      .sort((a, b) => b.score - a.score)[0];
  }

  get isDie() {
    return this.homeBlock?.isHome === false;
  }
}
