import EventEmitter from "events";
import IsomorphicWebSocket from "isomorphic-ws";
import ClientEvent from "./ClientEvent";
import MessageEvent from "./MessageEvent";
import { NiceEventEmitter, relayEvent } from "./common";
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
    return new Promise((resolve, reject) => {
      if (this.readyState !== IsomorphicWebSocket.OPEN) {
        return;
      }
      this.ws.send(data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
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
    this.ws.on("open", () => {
      this.clientEvent.connect();
      this.emit("open");
      // console.log("open");
    });
    this.ws.on("message", (data) => {
      this.messageEvent.handle(data);
    });
    this.ws.on("close", () => {
      this.clientEvent.disconnect();
      this.emit("close");
      // console.log("close");
    });
    this.ws.on("error", () => {
      this.clientEvent.disconnect();
      this.emit("error");
      // console.log(error);
    });
  }

  send(message: unknown) {
    return this.ws.send(Packet.Encode(STT.serialize(message)) as Buffer);
  }

  close() {
    this.ws.close();
  }
}

export class KeepLiveWSBase extends NiceEventEmitter {
  connection!: InstanceType<typeof LiveWSBase>;
  timeout: number = 90 * 1000;
  interval: number = 100;
  closed: boolean = false;
  constructor(public roomid: number) {
    super();
    this.connect();
  }

  connect(reconnect = true) {
    if (reconnect) {
      // console.log("reconnect");
      this.connection?.close();
      this.connection = new LiveWSBase(this.roomid);
    }
    const connection = this.connection;

    let timeout = setTimeout(() => {
      connection.close();
    }, this.timeout);

    connection.on(relayEvent, (eventName: string, ...params: any[]) => {
      if (eventName !== "error") {
        this.emit(eventName, ...params);
      }
    });

    connection.on("error", (e: any) => this.emit("e", e));
    connection.on("close", () => {
      if (!this.closed) {
        setTimeout(() => this.connect(), this.interval);
      }
    });

    connection.on("close", () => {
      clearTimeout(timeout);
    });
  }
  close() {
    this.closed = true;
    this.connection.close();
  }
}
