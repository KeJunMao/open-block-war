import { KeepLiveWSBase, LiveWSBase } from "./ws";

export class LiveWS extends LiveWSBase {
  constructor(roomid: number) {
    super(roomid);
  }
}

export class KeepLiveWS extends KeepLiveWSBase {
  constructor(roomid: number) {
    super(roomid);
  }
}
