import Block from "../Components/Block";
import GameTime from "../Components/GameTime";
import Map from "../Components/Map";
import { MessageToast } from "../Components/MessageToast";
import Player from "../Components/Player";
import Team from "../Components/Team";
import BilibiliLive from "../Live/Bilibili";
import { store } from "../store";
import { ConfigState } from "../store/configSlice";
import { setTeams, updateTeams, setWinTeam } from "../store/rootSlice";
import { setTodayMvpUsers } from "../store/topSlice";
import CardController from "./CardController";

export default class Core {
  map: Map | undefined;
  config: ConfigState | undefined;
  teams: Team[] = [];
  live: BilibiliLive;
  isGameOver = false;
  toast: MessageToast | undefined;

  static PLAYER_DEPTH = 2000;
  static TOAST_DEPTH = 3000;
  time: GameTime | undefined;
  cardController: CardController | undefined;

  constructor(public game: Phaser.Game, public scene: Phaser.Scene) {
    this.live = new BilibiliLive(store.getState().config.liveId);
  }

  clearUp() {
    this.isGameOver = false;
  }

  async init(scene: Phaser.Scene) {
    this.clearUp();
    this.scene = scene;
    this.config = store.getState().config;
    this.map = new Map(this.scene);
    this.cardController = new CardController(this.scene, this.config.cards);
    this.teams = this.config.teams.map((team) => {
      return new Team(
        this.scene,
        team.name,
        team.color,
        team.homeX,
        team.homeY,
        team.joinCommand,
        team.shortName,
        team.icon,
        team.hall,
        team.tile,
        team.farms
      );
    });

    this.teams.forEach((team) => {
      const players = team.players;
      const npcs = team.farms;
      const otherTeamsBlock = this.teams
        .filter((t) => t !== team)
        .map((t) => t.blocks);
      if (this.map) {
        this.scene.physics.add.collider(
          players,
          [this.map.blocksGroup, ...otherTeamsBlock],
          //@ts-ignore
          this.onPlayerOverlapBlock.bind(this)
        );
        this.scene.physics.add.collider(
          npcs,
          [this.map.blocksGroup, ...otherTeamsBlock],
          //@ts-ignore
          this.onPlayerOverlapBlock.bind(this)
        );
      }
    });
    store.dispatch(setTeams(this.teams));

    this.toast = new MessageToast(this.scene, {
      x: this.scene.renderer.width / 2,
      y: this.scene.renderer.height - 40,
      text: this.scene.add.text(0, 0, "", {
        fontSize: "30px",
        stroke: "#000",
        strokeThickness: 5,
      }),
      duration: {
        hold: 1000,
      },
    }).setDepth(Core.TOAST_DEPTH);
    this.time = new GameTime(this.scene);
    this.asyncTeamsToStore();
  }

  asyncTeamsToStore() {
    this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        store.dispatch(updateTeams());
      },
      loop: true,
    });
  }

  onPlayerOverlapBlock(player: Player, block: Block) {
    block.setTeam(player.team);
    if (player.user) {
      player.user.score += 1;
    }
    this.checkGameOver();
  }

  checkGameOver() {
    const aliveTeams = this.teams.filter((team) => !team.isDie);
    if (aliveTeams.length === 1) {
      this.onGameOver(aliveTeams[0]);
    }
  }

  checkGameOverByTime() {
    const aliveTeams = this.teams.filter((team) => !team.isDie);
    // get max blocks team
    const maxBlocksTeam = aliveTeams.reduce((max, team) => {
      return team.blocks.children.size > max.blocks.children.size ? team : max;
    });
    this.onGameOver(maxBlocksTeam);
  }

  onGameOver(team: Team) {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.scene.scene.pause();
    store.dispatch(setWinTeam(team));
    const mvpUser = team.mvpUser;
    if (mvpUser) {
      store.dispatch(setTodayMvpUsers(mvpUser));
    }
    setTimeout(() => {
      store.dispatch(setWinTeam(undefined));
      this.scene.scene.restart(this.scene);
    }, 8000);
  }

  update() {
    this.teams.forEach((team) => {
      team.players.children.each((player) => player.update());
      team.blocks.children.each((block) => block.update());
    });
  }
}
