import { KeepLiveWS } from "bilibili-live-ws/src/browser";
import Danmu from "./Danmu";
// import Entry from "./Entry";
import Gift from "./Gift";
// import Interact from "./Interact";
import {
  IParseDanmuData,
  IParseEntryData,
  IParseGiftData,
  IParseInteractData,
} from "./type";

export interface ICmd {
  cmd: string;
  info: any[];
  data: any;
}

export interface IDanmuData extends ICmd {}
export interface IGiftData extends ICmd {}
export interface IEntryData extends ICmd {}
export interface IInteractData extends ICmd {}

export function parseDanmu(data: IDanmuData) {
  const { info } = data;
  const text: string = info[1];
  const user = info[2];
  const card = info[3];
  const id: number = user[0];
  const name: string = user[1];
  const cardLevel: number = card[0] ?? 0;
  const cardLiveId: number = card[3] ?? 0;
  const result: IParseDanmuData = {
    text,
    id,
    name,
    card: {
      level: cardLevel,
      liveId: cardLiveId,
    },
  };
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

export function parseEntry(_data: IEntryData) {
  const { data } = _data;
  const face = data.face;
  const uid = data.uid;
  const copy_writing = data.copy_writing;
  const name = copy_writing.replace(/^.*?<%(.+)%>.*?$/, "$1");
  const result: IParseEntryData = {
    face,
    id: uid,
    name,
  };
  return result;
}

export function parseInteract(_data: IInteractData) {
  const { data } = _data;
  const uid = data.uid;
  const uname = data.uname;
  const result: IParseInteractData = {
    id: uid,
    name: uname,
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
    // this.live.on("ENTRY_EFFECT", (data) => {
    //   const entry = parseEntry(data);
    //   Entry.Apply(entry);
    // });
    // this.live.on("INTERACT_WORD", (data) => {
    //   const interact = parseInteract(data);
    //   Interact.Apply(interact);
    // });
  }
}
