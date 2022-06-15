export interface IParseGiftData {
  id: number;
  name: string;
  num: number;
  coinType: string;
  price: number;
  uid: number;
  uname: string;
}
export interface IParseDanmuData {
  text: string;
  id: number;
  name: string;
  faceId?: string;
  card?: {
    level: number;
    liveId: number;
  };
  face?: string;
}

export interface IParseEntryData {
  id: number;
  name: string;
  face: string;
}
export interface IParseInteractData {
  id: number;
  name: string;
}
