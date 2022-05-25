import { KeepLiveWS } from "bilibili-live-ws/src/browser";
import Danmu from "./Danmu";
import Gift from "./Gift";
import { IParseDanmuData, IParseGiftData } from "./type";

export interface ICmd {
  cmd: string;
  info: any[];
  data: any;
}

export interface IDanmuData extends ICmd {}
export interface IGiftData extends ICmd {}

export function parseDanmu(data: IDanmuData) {
  const { info } = data;
  const text: string = info[1];
  const user = info[2];
  const id: number = user[0];
  const name: string = user[1];
  const result: IParseDanmuData = { text, id, name };
  try {
    const faceId: string = info[0][13].emoticon_unique;
    result["faceId"] = faceId;
  } catch (error) {}
  return result;
}

export function parseGift(data: IGiftData) {
  const { data: gift } = data;
  const {
    giftId: id,
    giftName: name,
    num,
    uid,
    uname,
    coin_type: coinType,
    price,
  } = gift;
  const result: IParseGiftData = {
    id,
    name,
    num,
    uid,
    uname,
    coinType,
    price,
  };
  return result;
}

export default class BilibiliLive {
  live: KeepLiveWS;
  constructor(public roomId: number) {
    this.live = new KeepLiveWS(roomId);
    this.live.on("live", () => {
      this?.live?.on("heartbeat", console.log);
    });
    this.live.on("DANMU_MSG", (data) => {
      const danmu = parseDanmu(data);
      Danmu.Apply(danmu);
    });
    this.live.on("SEND_GIFT", (data) => {
      const gift = parseGift(data);
      Gift.Apply(gift);
    });
  }
}
