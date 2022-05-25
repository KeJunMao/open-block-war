import * as randomUseragent from "random-useragent";
import fetch from "node-fetch";

export async function getFaceByBilibili(id: string) {
  const url = `https://api.bilibili.com/x/space/acc/info?mid=${id}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": randomUseragent.getRandom(),
    },
  });
  const data = await response.json();
  const face = data?.data?.face ?? "";
  return face;
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
  return face;
}
