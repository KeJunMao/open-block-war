export default class STT {
  static escape(v: string) {
    return v.toString().replace(/@/g, "@A").replace(/\//g, "@S");
  }

  static unescape(v: string) {
    return v.toString().replace(/@S/g, "/").replace(/@A/g, "@");
  }

  static serialize(raw: any): any {
    if (Object.prototype.toString.call(raw).slice(8, -1) === "Object") {
      return Object.entries(raw)
        .map(([k, v]) => `${k}@=${STT.serialize(v)}`)
        .join("");
    } else if (Array.isArray(raw)) {
      return raw.map((v) => `${STT.serialize(v)}`).join("");
    } else {
      return STT.escape(raw.toString()) + "/";
    }
  }

  static deserialize(raw: string): any {
    if (raw.includes("//")) {
      return raw
        .split("//")
        .filter((e) => e !== "")
        .map((item) => STT.deserialize(item));
    }

    if (raw.includes("@=")) {
      return raw
        .split("/")
        .filter((e) => e !== "")
        .reduce((o, s) => {
          const [k, v] = s.split("@=");
          return (o[k] = v ? STT.deserialize(v) : ""), o;
        }, {} as any);
    } else {
      return STT.unescape(raw);
    }
  }
}
