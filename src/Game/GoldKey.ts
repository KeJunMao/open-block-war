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
      id: 233330,
      name: "红色",
      card: {
        level: 1,
        liveId: 233,
      },
    });
    Danmu.Apply({
      text: "蓝",
      id: 233331,
      name: "蓝色",
      card: {
        level: 1,
        liveId: 233,
      },
    });
    Danmu.Apply({
      text: "黄",
      id: 233332,
      name: "黄色",
      card: {
        level: 1,
        liveId: 233,
      },
    });
    Danmu.Apply({
      text: "绿",
      id: 233333,
      name: "绿色",
      card: {
        level: 1,
        liveId: 233,
      },
    });
    Danmu.Apply({
      text: "紫",
      id: 2333334,
      name: "紫色",
      card: {
        level: 1,
        liveId: 233,
      },
    });
  }
  test() {
    this.initUser();
    // this.sendGift({
    //   id: 1,
    //   name: "打call",
    //   num: 100,
    //   uid: 233,
    //   uname: "",
    //   coinType: "",
    //   price: 0,
    // });
    // this.sendGift({
    //   id: 1,
    //   name: "打call",
    //   num: 100,
    //   uid: 2333,
    //   uname: "",
    //   coinType: "",
    //   price: 0,
    // });
    this.sendGift({
      id: 1,
      name: "这个好诶",
      num: 100,
      uid: 233,
      uname: "",
      coinType: "",
      price: 0,
    });
    this.sendGift({
      id: 1,
      name: "这个好诶",
      num: 100,
      uid: 2333,
      uname: "",
      coinType: "",
      price: 0,
    });
  }
}
