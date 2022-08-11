import Danmu from "../Danmu";
import Gift from "../Gift";
import { IParseDanmuData, IParseGiftData } from "../type";
import { KeepLiveWS } from "./douyu-live-ws/browser";

interface IDanmuData {
  type: string;
  txt: string;
  uid: string;
  nn: string;
  ic: string;
}

interface IGiftData {
  gfid: string;
  gfcnt: string;
  uid: string;
  nn: string;
}

export function parseGift(data: IGiftData) {
  // 辣条===824荧光棒
  // 小花花 === 大气
  // 打call === 弱鸡
  // 这个好诶 === 666
  // i了i了 === 666
  console.log(data);

  let name = "礼物";

  switch (data.gfid) {
    case "824":
      name = "荧光棒";
      break;
    case "20541":
      name = "大气";
      break;
    case "20001":
      name = "弱鸡";
      break;
    case "20542":
      name = "666";
      break;
    case "21998":
      name = "钻石";
      break;
  }

  const result: IParseGiftData = {
    id: Number(data.gfid),
    name,
    num: Number(data.gfcnt),
    uid: Number(data.uid),
    uname: data.nn,
    coinType: "!gold",
    price: 1000,
  };
  return result;
}

export function parseDanmu(data: IDanmuData) {
  const result: IParseDanmuData = {
    id: Number(data.uid),
    name: data.nn,
    text: data.txt,
    face: `https://apic.douyucdn.cn/upload/${data.ic}_middle.jpg`,
  };

  return result;
}

export default class DouyuLive {
  live: KeepLiveWS;
  constructor(public roomId: number) {
    this.live = new KeepLiveWS(roomId);
    // this.live.on("message", (data) => {
    //   console.log(data);
    // });
    this.live.on("chatmsg", (data) => {
      const danmu = parseDanmu(data);
      Danmu.Apply(danmu);
    });
    this.live.on("dgb", (data) => {
      const gift = parseGift(data);
      Gift.Apply(gift);
    });
  }
}
