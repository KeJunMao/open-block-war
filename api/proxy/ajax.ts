import axios, { AxiosProxyConfig } from "axios";
// 代理服务器
const proxyHost = "PROXY_HOST";
const proxyPort = 9020;

// 代理隧道验证信息
const proxyUser = "PROXY_USERNAME";
const proxyPass = "PROXY_PASSWORD";

var proxy: AxiosProxyConfig = {
  host: proxyHost,
  port: proxyPort,
  auth: {
    username: proxyUser,
    password: proxyPass,
  },
};

export const httpGet = (url: string) => {
  return axios.get(url, {
    // 未配置代理时，不使用代理
    proxy: proxyHost === "PROXY_HOST" ? undefined : proxy,
  });
};
