import { LiveWSBase } from "./ws";

export default class ClientEvent {
  live: LiveWSBase;
  private _heartbeatTask: ReturnType<typeof setInterval> | undefined;
  constructor(live: LiveWSBase) {
    this.live = live;
  }

  connect() {
    this.login();
    this.joinGroup();
    this.heartbeat();
  }

  disconnect() {
    this.logout();
  }

  logout() {
    clearInterval(this._heartbeatTask);
    // return this.live.send({ type: "logout" });
  }

  login() {
    this.live.send({
      type: "loginreq",
      roomid: this.live.roomid,
    });
  }

  joinGroup() {
    this.live.send({
      type: "joingroup",
      rid: this.live.roomid,
      gid: -9999,
    });
  }
  heartbeat() {
    const delay = 45 * 1000;
    this._heartbeatTask = setInterval(
      () => this.live.send({ type: "mrkl" }),
      delay
    );
  }
}
