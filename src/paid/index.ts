import { getThemeConfig } from "./theme";

export class Paid {
  liveIds: {
    [key: number]: {
      name: string;
      id: number;
      gameName: string | null;
      defaultTheme: string;
      themes: string[];
      liveType?: "bilibili" | "douyu";
    };
  };
  constructor() {
    this.liveIds = {
      1439885: {
        name: "KeJun",
        id: 1439885,
        gameName: null,
        defaultTheme: "sevenKingDom7",
        themes: [
          "default",
          "fiveColor",
          "threeKingDom",
          "jiangHu",
          "redAlert",
          "minecraft",
          "war3",
          "sevenKingDom7",
          "warOfFiveDynasties",
        ],
      },
      3553117: {
        name: "斗鱼",
        id: 3553117,
        gameName: null,
        defaultTheme: "war3",
        themes: [
          "default",
          "fiveColor",
          "threeKingDom",
          "jiangHu",
          "redAlert",
          "minecraft",
          "war3",
          "sevenKingDom7",
          "warOfFiveDynasties",
        ],
        liveType: "douyu",
      },
    };
  }

  getLiveIdPaidConfig(liveId: number) {
    return this.liveIds[liveId];
  }
  checkLiveIdHasTheme(liveId: number, theme: string) {
    return this.liveIds[liveId]?.themes?.includes(theme);
  }

  getThemeConfig(theme: string) {
    return getThemeConfig(theme);
  }
}

const paid = new Paid();

export default paid;
