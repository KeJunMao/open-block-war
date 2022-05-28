import { MessageToast } from "../Components/MessageToast";
import User from "../Components/User";
import { CardConfig } from "../store/configSlice";
import Core from "./Core";

export default class CardController {
  public configs: CardConfig[] = [];
  public toast!: MessageToast;
  constructor(
    public scene: Phaser.Scene,
    cardsConfig: CardConfig[] | undefined
  ) {
    // 拷贝config
    if (cardsConfig) {
      this.configs = cardsConfig.map((config) => {
        return { ...config };
      });
    }
    this.resetToast();
  }
  draw(user: User, isGold = false) {
    if (!isGold) {
      // 减少积分
      const needScore = 50 + user.slaveGroup.Count * 50;
      if (user.score < needScore) {
        this.toast?.showMessage(
          `${user.name}还需要${needScore - user.score}积分才能发兵`
        );
        return;
      }
      user.score -= needScore;
    }
    const configs = this.getCardConfigs(user.team.name, isGold);
    const config = this.getRandomCard(configs, isGold);
    if (config) {
      this.toast?.showMessage(
        `${user.name}召唤了 ${config.level} · ${config.name}`
      );
      user.slaveGroup.makeSlave({
        name: config.name,
        speed: config.speed,
        scale: config.scale,
        face: config.face,
        level: config.level,
      });
    }
  }
  getRandomCard(configs: CardConfig[], isGold = false) {
    let totalRank = 0;
    const random = Math.random();
    let result: CardConfig | null = null;
    const items = configs
      .slice()
      .map((item) => (totalRank += isGold ? item.goldRate : item.rate) && item);
    let start = 0;
    while (items.length) {
      const item = items.shift();
      if (item) {
        const end = start + (isGold ? item.goldRate : item.rate) / totalRank;
        if (random > start && random <= end) {
          result = item;
          break;
        }
        start = end;
      }
    }
    return result;
  }

  goldDraw(user: User) {
    this.draw(user, true);
  }

  getCardConfigs(team: string, ignoreTeam?: boolean) {
    return this.configs.filter((config) => {
      if (config.disableDraw) {
        return false;
      }
      if (!config.onlyTeam) {
        return true;
      } else {
        if (ignoreTeam) {
          return config.team === team || config.goldIgnoreTeam;
        } else {
          return config.team === team;
        }
      }
    });
  }

  resetToast() {
    if (this.toast) {
      this.toast.destroy(true);
    }
    this.toast = new MessageToast(this.scene, {
      x: this.scene.renderer.width / 2,
      y: 40,
      text: this.scene.add.text(0, 0, "", {
        fontSize: "42px",
        stroke: "#000",
        strokeThickness: 5,
      }),
      duration: {
        hold: 2000,
      },
    }).setDepth(Core.TOAST_DEPTH);
  }
}
