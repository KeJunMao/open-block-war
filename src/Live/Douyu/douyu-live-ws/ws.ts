import EventEmitter from "events";
import IsomorphicWebSocket from "isomorphic-ws";
import ClientEvent from "./ClientEvent";
import MessageEvent from "./MessageEvent";
import { NiceEventEmitter } from "./common";
import Packet from "./packet";
import STT from "./stt";
import { Buffer } from "buffer";

class WebSocket extends EventEmitter {
  ws: IsomorphicWebSocket;

  constructor(address: string) {
    super();

    const ws = new IsomorphicWebSocket(address);
    this.ws = ws;

    ws.onopen = () => this.emit("open");
    //@ts-ignore
    ws.onmessage = async ({ data }) =>
      this.emit(
        "message",
        Buffer.from(
          await new Response(
            data as unknown as InstanceType<typeof Blob>
          ).arrayBuffer()
        )
      );
    ws.onerror = () => this.emit("error");
    ws.onclose = () => this.emit("close");
  }

  get readyState() {
    return this.ws.readyState;
  }

  send(data: Buffer) {
    this.ws.send(data);
  }

  close(code?: number, data?: string) {
    this.ws.close(code, data);
  }
}

export class LiveWSBase extends NiceEventEmitter {
  ws: InstanceType<typeof WebSocket>;
  clientEvent = new ClientEvent(this);
  messageEvent = new MessageEvent(this);

  constructor(public roomid: number) {
    super();
    //目前已知的弹幕服务器
    const port =
      8500 +
      ((min, max) => Math.floor(Math.random() * (max - min + 1) + min))(1, 5);
    this.ws = new WebSocket(`wss://danmuproxy.douyu.com:${port}/`);
    this.ws.on("open", () => this.clientEvent.connect());
    this.ws.on("message", (data) => this.messageEvent.handle(data));
    this.ws.on("close", () => this.clientEvent.disconnect());
  }

  send(message: unknown) {
    this.ws.send(Packet.Encode(STT.serialize(message)) as Buffer);
  }
}
