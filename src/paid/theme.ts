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
        joinCommand: [],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蓝",
        color: 0x0042ff,
        joinCommand: [],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "黄",
        color: 0xfffc01,
        joinCommand: [],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "绿",
        color: 0x1ce6b9,
        joinCommand: [],
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
        joinCommand: [],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蓝",
        color: 0x0042ff,
        joinCommand: [],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "黄",
        color: 0xfffc01,
        joinCommand: [],
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
        joinCommand: [],
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
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "蜀",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 18,
        homeY: 32,
        name: "吴",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
    ],
    gameName: "三国大战",
  },
  jiangHu: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "少林",
        shortName: "少",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "武当",
        shortName: "武",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "明教",
        shortName: "明",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "丐帮",
        shortName: "丐",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
    ],
    gameName: "江湖传说",
  },
  redAlert: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "苏军",
        shortName: "苏",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "盟军",
        shortName: "盟",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 18,
        homeY: 32,
        name: "尤里",
        shortName: "尤",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
    ],
    gameName: "红色警戒",
  },
  minecraft: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "主世界",
        shortName: "主",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "下届",
        shortName: "下",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "末地",
        shortName: "末",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "古代城",
        shortName: "古",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
    ],
    gameName: "我的世界",
  },
  war3: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "人族",
        shortName: "人",
        color: 0xff0303,
        joinCommand: ["红"],
        icon: "/theme/war3/icons/hum.png",
        hall: "/theme/war3/halls/hum.png",
      },
      {
        homeX: 32,
        homeY: 2,
        name: "兽族",
        shortName: "兽",
        color: 0x0042ff,
        joinCommand: ["蓝"],
        icon: "/theme/war3/icons/orc.png",
        hall: "/theme/war3/halls/orc.png",
      },
      {
        homeX: 2,
        homeY: 32,
        name: "不死",
        shortName: "死",
        color: 0x000000,
        joinCommand: ["黄"],
        icon: "/theme/war3/icons/ud.png",
        hall: "/theme/war3/halls/ud.png",
      },
      {
        homeX: 32,
        homeY: 32,
        name: "暗夜",
        shortName: "暗",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
        icon: "/theme/war3/icons/ne.png",
        hall: "/theme/war3/halls/ne.png",
      },
    ],
    gameName: "魔兽争霸",
    styleTheme: {
      backgroundColor: 0x333333,
      textColor: 0xffffff,
      blockColor: 0x333333,
    },
  },
};

export function getThemeConfig(theme: string) {
  return themes[theme] ? themes[theme] : themes.default;
}

export function colorToString(color: number, defaultColor: string = "#ffffff") {
  if (color !== undefined) {
    return "#" + color.toString(16).padStart(6, "0");
  }
  return defaultColor;
}
