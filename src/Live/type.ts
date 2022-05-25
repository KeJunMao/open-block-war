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
}

export interface IParseEntryData {
  id: number;
  name: string;
  face: string;
}
