import Danmu from "../Live/Danmu";
import Gift from "../Live/Gift";
import { IParseDanmuData, IParseGiftData } from "../Live/type";
import Game from "./Game";

export default class GoldKey {
  constructor(public game?: Game) {}

  sendDanmu(danmu: IParseDanmuData) {
    Danmu.Apply(danmu);
  }

  sendGift(gift: IParseGiftData) {
    Gift.Apply(gift);
  }

  initUser() {
    Danmu.Apply({
      text: "红",
      id: 233,
      name: "红色",
    });
    Danmu.Apply({
      text: "蓝",
      id: 2333,
      name: "蓝色",
    });
    Danmu.Apply({
      text: "黄",
      id: 23333,
      name: "黄色",
    });
    Danmu.Apply({
      text: "绿",
      id: 233333,
      name: "绿色",
    });
    Danmu.Apply({
      text: "紫",
      id: 233333,
      name: "紫色",
    });
  }
}
