import { ConfigState } from "../store/configSlice";

const themes: {
  [key: string]: Partial<ConfigState>;
} = {
  default: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "红",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蓝",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "黄",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "绿",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
    ],
    gameName: "四色大战",
  },
  fiveColor: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "红",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蓝",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "黄",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "绿",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
      {
        homeX: 17,
        homeY: 17,
        name: "紫",
        color: 0x800080,
        joinCommand: ["紫"],
      },
    ],
    gameName: "五色大战",
  },
  threeKingDom: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "魏",
        color: 0xff0303,
        joinCommand: ["魏", "红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蜀",
        color: 0x0042ff,
        joinCommand: ["蜀", "蓝"],
      },
      {
        homeX: 18,
        homeY: 32,
        name: "吴",
        color: 0x1ce6b9,
        joinCommand: ["吴", "绿"],
      },
    ],
    gameName: "三国大战",
  },
};

export function getThemeConfig(theme: string) {
  return themes[theme] ? themes[theme] : themes.default;
}
