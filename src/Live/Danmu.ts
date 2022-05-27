import Team from "../Components/Team";
import User from "../Components/User";
import Game from "../Game/Game";
import { IParseDanmuData } from "./type";

export default class Danmu {
  static Apply(danmu: IParseDanmuData) {
    if (Game.Core.isGameOver) return;
    const user = Team.GetUserById(danmu.id);
    if (user) {
      Danmu.ApplyTp(danmu, user);
      Danmu.ApplyFace(user);
      Danmu.ApplyObedience(danmu, user);
    } else {
      const team = Game.Core.teams.find((team) =>
        team.hasJoinKeyword(danmu.text)
      );
      if (team) {
        team.makeUser(danmu.id, danmu.name);
        return;
      }
    }
  }
  static ApplyObedience(danmu: IParseDanmuData, user: User) {
    if (!danmu.text.startsWith("投靠")) {
      return;
    }

    let [, teamKeyword] = danmu.text.split(" ");
    const team = Game.Core.teams.find((team) =>
      team.hasJoinKeyword(teamKeyword)
    );
    if (team) {
      user.obedience(team);
    }
  }

  static ApplyTp(danmu: IParseDanmuData, user: User) {
    const text = danmu.text.toLocaleLowerCase();
    if (text === "tp" || text == "b") {
      user.player.tp();
    }
  }

  static ApplyFace(user: User) {
    const rand = Phaser.Math.Between(0, 10);
    const tuo = [52240619, 39615326, 1526202214];
    if (tuo.includes(user.id)) {
      if (rand < 2) {
        user?.player.makeChild(1);
        Game.Core?.toast?.showMessage(`${user.name} 获取了兵力+1`);
      } else if (rand < 4) {
        user?.player.speedUp(0.2);
        Game.Core?.toast?.showMessage(`${user.name} 获取了速度小幅提升`);
      } else {
        user?.player.speedUp(0.02);
        Game.Core?.toast?.showMessage(`${user.name} 获取了速度微微提升了`);
      }
      return;
    }
    if (rand === 1) {
      user?.player.makeChild(1);
      Game.Core?.toast?.showMessage(`${user.name} 获取了兵力+1`);
    } else if (rand === 2) {
      user?.player.speedUp(0.2);
      Game.Core?.toast?.showMessage(`${user.name} 获取了速度小幅提升`);
    } else if (rand === 3) {
      user?.player.sizeUp(0.2);
      Game.Core?.toast?.showMessage(`${user.name} 获取了体积小幅变大`);
    } else {
      user?.player.speedUp(0.02);
      Game.Core?.toast?.showMessage(`${user.name} 获取了速度微微提升了`);
    }
  }
}
