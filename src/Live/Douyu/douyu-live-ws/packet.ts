import "fast-text-encoding";

export default class Packet {
  static HEADER_LEN_SIZE = 4;
  static HEADER_LEN_TYPECODE = 2;
  static HEADER_LEN_ENCRYPT = 1;
  static HEADER_LEN_PLACEHOLDER = 1;
  static HEADER_LEN_TOTAL =
    Packet.HEADER_LEN_SIZE * 2 +
    Packet.HEADER_LEN_TYPECODE +
    Packet.HEADER_LEN_ENCRYPT +
    Packet.HEADER_LEN_PLACEHOLDER;

  static concat(..._args: any) {
    const arr = [];
    for (let n = 0; n < arguments.length; n++) arr[n] = arguments[n];

    return arr.reduce(function (arr, buf) {
      const message = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
      const t = new Uint8Array(arr.length + message.length);
      t.set(arr, 0);
      t.set(message, arr.length);
      return t;
    }, new Uint8Array(0));
  }

  static Encode(data: any) {
    const encoder = new TextEncoder();
    const body = Packet.concat(encoder.encode(data), Uint8Array.of(0));
    const messageLength = body.length + Packet.HEADER_LEN_SIZE * 2;
    const r = new DataView(
      new ArrayBuffer(body.length + Packet.HEADER_LEN_TOTAL)
    );

    r.setUint32(0, messageLength, true);
    r.setUint32(4, messageLength, true);
    r.setInt16(8, 689, true);
    r.setInt16(10, 0, true);

    return (
      new Uint8Array(r.buffer).set(body, Packet.HEADER_LEN_TOTAL), r.buffer
    );
  }

  static Decode(buf: any, callback: any) {
    const decoder = new TextDecoder();
    let readLength = 0;
    let buffer = Packet.concat(new ArrayBuffer(0), buf).buffer;
    (async () => {
      while (buffer.byteLength > 0) {
        if (0 === readLength) {
          if (buffer.byteLength < 4) return;

          readLength = new DataView(buffer).getUint32(0, true);
          buffer = buffer.slice(4);
        }

        if (buffer.byteLength < readLength) return;

        const message = decoder.decode(buffer.slice(8, readLength - 1));
        buffer = buffer.slice(readLength);
        readLength = 0;
        callback(message);
      }
    })();
    while (buffer.byteLength > 0) {
      if (0 === readLength) {
        if (buffer.byteLength < 4) return;

        readLength = new DataView(buffer).getUint32(0, true);
        buffer = buffer.slice(4);
      }

      if (buffer.byteLength < readLength) return;

      const message = decoder.decode(buffer.slice(8, readLength - 1));
      console.log(message);
      buffer = buffer.slice(readLength);
      readLength = 0;
      callback(message);
    }
  }
}
