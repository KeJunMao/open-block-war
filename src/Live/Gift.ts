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
        Gift.ApplyLaTiao(user, gift.num);
        break;
      case "小心心":
        Gift.ApplyLaTiao(user, gift.num);
        break;
      case "打call":
        Gift.ApplyDaCall(user, gift.num);
        break;
      case "小花花":
        Gift.ApplyFlower(user, gift.num);
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
    const rand = num * Phaser.Math.Between(4, 7);
    user?.player.makeChild(rand);
    Game.Core.toast?.showMessage(`${user?.name} 投喂打call*${num}幻像+${rand}`);
  }
  static ApplyLaTiao(user: User, num: number) {
    user?.player.speedUp(0.2 * num);
    Game.Core.toast?.showMessage(`${user?.name} 投喂辣条*${num}速度小幅提升`);
  }
}
