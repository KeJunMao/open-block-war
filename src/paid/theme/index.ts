import { ConfigState } from "../../store/configSlice";
import sevenKingDom7 from "./sevenKingDom7";
import war3 from "./war3";
import worldWar2 from "./worldWar2";

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
  fourKingDom: {
    teams: [
      {
        homeX: 2,
        homeY: 2,
        name: "群雄",
        shortName: "群",
        color: 0xff0303,
        joinCommand: ["红"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "魏国",
        shortName: "魏",
        color: 0x0042ff,
        joinCommand: ["蓝"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "蜀国",
        shortName: "蜀",
        color: 0xfffc01,
        joinCommand: ["黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "吴国",
        shortName: "吴",
        color: 0x1ce6b9,
        joinCommand: ["绿"],
      },
    ],
    gameName: "三国大战",
    endTime: 600,
    gifts: {
      打call: {
        min: 1,
        max: 3,
      },
    },
    fansCard: {
      enable: false,
      level: 5,
    },
    autoJoin: false,
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
  warOfFiveDynasties: {
    teams: [
      {
        homeX: 17,
        homeY: 17,
        name: "唐",
        color: 0xf44336,
        joinCommand: ["唐代", "唐朝", "红"],
      },
      {
        homeX: 2,
        homeY: 2,
        name: "宋",
        color: 0x4caf50,
        joinCommand: ["宋代", "宋朝", "绿"],
      },
      {
        homeX: 2,
        homeY: 32,
        name: "元",
        color: 0xffeb3b,
        joinCommand: ["元代", "元朝", "黄"],
      },
      {
        homeX: 32,
        homeY: 32,
        name: "明",
        color: 0x9c27b0,
        joinCommand: ["明代", "明朝", "紫"],
      },
      {
        homeX: 32,
        homeY: 2,
        name: "清",
        color: 0x448aff,
        joinCommand: ["清代", "清朝", "蓝"],
      },
    ],
    gameName: "五朝之争",
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
    gifts: {
      打call: {
        min: 1,
        max: 1,
      },
    },
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
        color: 0xffffff,
        joinCommand: ["红"],
        icon: "/theme/minecraft/icons/main.webp",
        hall: "/theme/minecraft/icons/main.webp",
        tile: "/theme/minecraft/tiles/main.png",
      },
      {
        homeX: 32,
        homeY: 2,
        name: "下界",
        shortName: "下",
        color: 0xffffff,
        joinCommand: ["蓝", "地狱"],
        icon: "/theme/minecraft/icons/xiajie.webp",
        hall: "/theme/minecraft/icons/xiajie.webp",
        tile: "/theme/minecraft/tiles/xiajie.png",
      },
      {
        homeX: 2,
        homeY: 32,
        name: "末地",
        shortName: "末",
        color: 0x000000,
        joinCommand: ["黄"],
        icon: "/theme/minecraft/icons/modi.webp",
        hall: "/theme/minecraft/icons/modi.webp",
        tile: "/theme/minecraft/tiles/modi.png",
      },
      {
        homeX: 32,
        homeY: 32,
        name: "古代城",
        shortName: "古",
        color: 0xffffff,
        joinCommand: ["绿", "古代"],
        icon: "/theme/minecraft/icons/gudai.gif",
        hall: "/theme/minecraft/icons/gudai.gif",
        tile: "/theme/minecraft/tiles/gudai.png",
      },
    ],
    gameName: "我的世界",
    styleTheme: {
      backgroundColor: 0xc6c6c6,
      textColor: 0x000000,
      blockColor: 0xc6c6c6,
    },
  },
  war3,
  sevenKingDom7,
  worldWar2,
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
