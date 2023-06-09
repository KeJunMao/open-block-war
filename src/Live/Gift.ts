import Team from "../Components/Team";
import User from "../Components/User";
import Game from "../Game/Game";
import { IParseGiftData } from "./type";

export default class Gift {
  static Apply(gift: IParseGiftData) {
    if (Game.Core.isGameOver) return;
    const user = Team.GetUserById(gift.uid);
    if (!user) return;
    switch (gift.name) {
      case "辣条":
      case "荧光棒":
        Gift.ApplyLaTiao(user, gift.num);
        break;
      case "小心心":
        Gift.ApplyLaTiao(user, gift.num);
        break;
      case "打call":
      case "弱鸡":
        Gift.ApplyDaCall(user, gift.num);
        break;
      case "小花花":
      case "大气":
        Gift.ApplyFlower(user, gift.num);
        break;
      // 30758
      case "这个好诶":
      case "666":
        Gift.ApplyNiu(user, gift.num);
        break;
      case "i了i了":
      case "钻石":
        Gift.ApplyIleIle(user, gift.num);
        break;
      default:
        Gift.ApplyGift(user, gift);
        break;
    }
    setTimeout(() => {
      user?.player.showFlash(gift.num);
    });
  }
  static ApplyGift(user: User, gift: IParseGiftData) {
    if (gift.coinType === "!gold") {
      return;
    }
    if (gift.coinType === "gold") {
      const totalPrice = Math.floor((gift.price * gift.num) / 100);
      const rand = Phaser.Math.Between(0, totalPrice);
      const other = totalPrice - rand;
      const speedNum = rand > other ? rand : other;
      const makeChildNum = totalPrice - speedNum;
      if (makeChildNum > 0) {
        user?.player.makeChild(makeChildNum);
      }
      if (speedNum > 0) {
        user?.player.speedUp(speedNum);
      }
      Game.Core.toast?.showMessage(
        `${user?.name} 投喂${gift.name}*${gift.num}兵力+${makeChildNum}速度大幅提升`
      );
    } else {
      Gift.ApplyLaTiao(user, gift.num);
    }
  }
  static ApplyFlower(user: User, num: number) {
    user?.player.speedUp(num);
    Game.Core.toast?.showMessage(`${user?.name} 投喂小花花*${num}速度大幅提升`);
  }
  static ApplyDaCall(user: User, num: number) {
    const callConfig = Game.Core.config?.gifts["打call"] ?? {
      min: 1,
      max: 3,
    };
    const rand = num * Phaser.Math.Between(callConfig.min, callConfig.max);
    user?.player.makeChild(rand);
    Game.Core.toast?.showMessage(`${user?.name} 投喂打call*${num}幻像+${rand}`);
  }
  static ApplyLaTiao(user: User, num: number) {
    user?.player.speedUp(0.2 * num);
    Game.Core.toast?.showMessage(`${user?.name} 投喂辣条*${num}速度小幅提升`);
  }

  static ApplyNiu(user: User, num: number) {
    user?.player.sizeUp(num);
    Game.Core.toast?.showMessage(`${user?.name} 投喂这个好诶*${num}体积提升`);
  }

  static ApplyIleIle(user: User, num: number) {
    for (let i = 0; i < num; i++) {
      Game.Core.cardController?.goldDraw(user);
    }
  }
}
