import { MessageToast } from "../Components/MessageToast";
import User from "../Components/User";
import Core from "../Game/Core";
import { CardConfig, LevelType } from "../store/configSlice";
import { levelN, levelR, levelSR, levelSSR } from "./LevelType";

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
    const randomLevel = this.getRandomLevel(isGold);
    if (!randomLevel) return;
    if (!isGold) {
      // 减少积分
      const needScore = Math.min(user.slaveGroup.Count * 30, 300);
      if (user.score < needScore) {
        this.toast?.showMessage(
          `${user.name}还需要${needScore - user.score}积分才能发兵`
        );
        return false;
      }
      user.score -= needScore;
    }
    const configs = this.getCardConfigs(user.team.name, isGold);
    const currentLevelConfigs = this.getCardsByLevel(configs, randomLevel);
    const config = this.getRandomCard(currentLevelConfigs);
    if (config) {
      this.toast?.showMessage(
        `${user.name}召唤了 ${config.level.level} · ${config.name}`
      );
      user.slaveGroup.makeSlave({
        name: config.name,
        speed: config.speed,
        scale: config.scale,
        face: config.face,
        level: config.level.level,
      });
      return true;
    }
    return false;
  }

  getRandomCard(configs: CardConfig[]) {
    return configs[Math.floor(Math.random() * configs.length)];
  }

  getCardsByLevel(configs: CardConfig[], level: LevelType) {
    return configs.filter((config) => {
      return config.level.level === level.level;
    });
  }
  getRandomLevel(isGold = false) {
    let totalRank = 0;
    const allLevels = [levelN, levelR, levelSR, levelSSR];
    const levels = allLevels
      .filter((level) => {
        return isGold ? level.goldRate > 0 : level.rate > 0;
      })
      .map((item) => {
        totalRank += isGold ? item.goldRate : item.rate;
        return item;
      });
    const random = Math.random();
    let start = 0;
    let result: LevelType | null = null;
    while (levels.length) {
      const level = levels.shift();
      if (level) {
        const end = start + (isGold ? level.goldRate : level.rate) / totalRank;
        if (random > start && random <= end) {
          result = level;
          break;
        }
        start = end;
      }
    }
    return result;
  }

  goldDraw(user: User) {
    return this.draw(user, true);
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
    }).setDepth(Core.TOAST_DEPTH + 2000);
  }
}
