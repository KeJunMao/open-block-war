import * as randomUseragent from "random-useragent";
import fetch from "node-fetch";
import { httpGet } from "./ajax";

export async function getFaceByBilibili(id: string) {
  const url = `https://api.bilibili.com/x/space/acc/info?mid=${id}`;
  const res = await httpGet(url);
  const data = res.data;
  const face = data?.data?.face ?? "";
  if (face) {
    return face;
  }
  throw new Error("no face");
}
export async function getFaceByBilibili2(id: string) {
  const url = `https://api.bilibili.com/x/space/app/index?mid=${id}`;
  const res = await httpGet(url);
  const data = res.data;
  const face = data?.data?.info?.face ?? "";
  if (face) {
    return face;
  }
  throw new Error("no face");
}
export async function getFaceByTenApi(id: string) {
  const url = `https://tenapi.cn/bilibili/?uid=${id}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": randomUseragent.getRandom(),
    },
  });
  const data = await response.json();
  const face = data?.data?.avatar ?? "";
  if (face) {
    return face;
  }
  throw new Error("no face");
}
