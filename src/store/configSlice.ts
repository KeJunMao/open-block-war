import { createSlice } from "@reduxjs/toolkit";
import paid from "../paid";

interface TeamConfig {
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
}

export interface ConfigState {
  gameName: string;
  teams: TeamConfig[];
  liveId: number;
  theme: string;
  styleTheme: any;
}
const initialState: ConfigState = {
  gameName: "",
  teams: [],
  liveId: 1439885,
  theme: "default",
  styleTheme: {},
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
