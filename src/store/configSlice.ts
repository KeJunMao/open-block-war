import { createSlice } from "@reduxjs/toolkit";
import paid from "../paid";

export interface FarmConfig {
  rate: number;
  name: string;
  speed: number;
  scale: number;
  delay: number;
  face: string;
  startAt?: number;
  loop?: boolean;
}

export interface LevelType {
  level: string;
  rate: number;
  goldRate: number;
}

export interface CardConfig {
  name: string;
  level: LevelType;
  speed: number;
  scale: number;
  face: string;
  team: string;
  // 是否唯一
  unique?: boolean;
  // 是否只有本队可以抽取
  onlyTeam?: boolean;
  // 氪佬是否无视队伍
  goldIgnoreTeam?: boolean;
  // 禁用抽取
  disableDraw?: boolean;
}

export interface TeamConfig {
  homeX: number;
  homeY: number;
  name: string;
  color: number;
  tile?: string;
  homeTile?: string;
  joinCommand: string[];
  icon?: string;
  hall?: string;
  shortName?: string;
  farms?: FarmConfig[];
}

export interface GiftConfig {
  [key: string]: any;
}

export interface ConfigState {
  gameName: string;
  teams: TeamConfig[];
  liveId: number;
  theme: string;
  styleTheme: any;
  gifts: GiftConfig;
  cards?: CardConfig[];
}

const initialState: ConfigState = {
  gameName: "",
  teams: [],
  liveId: 1439885,
  theme: "default",
  styleTheme: {},
  gifts: {},
};

export const configSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setLiveId: (state, action) => {
      const liveIdConfig = paid.getLiveIdPaidConfig(action.payload);
      if (liveIdConfig) {
        state.liveId = liveIdConfig.id;
      }
    },
    setTheme: (state, action) => {
      const liveIdConfig = paid.getLiveIdPaidConfig(state.liveId);
      let theme = action.payload ?? liveIdConfig.defaultTheme;
      if (!paid.checkLiveIdHasTheme(state.liveId, theme)) {
        theme = liveIdConfig.defaultTheme;
      }
      const themeConfig = paid.getThemeConfig(theme);
      state.theme = theme;
      for (let key in themeConfig) {
        // @ts-ignore
        state[key] = themeConfig[key];
      }
    },
  },
});

export const { setLiveId, setTheme } = configSlice.actions;

export default configSlice.reducer;
