import { createSlice } from "@reduxjs/toolkit";
import Team from "../Components/Team";

export interface RootDataState {
  teams: Team[];
  winTeam: Team | undefined;
}
const initialState: RootDataState = {
  teams: [],
  winTeam: undefined,
};

export const rootSlice = createSlice({
  name: "live",
  initialState,
  reducers: {
    setTeams: (state, action) => {
      state.teams = action.payload;
    },
    updateTeams: (state) => {
      state.teams = [...state.teams];
    },
    setWinTeam: (state, action) => {
      state.winTeam = action.payload;
    },
  },
});

export const { setTeams, updateTeams, setWinTeam } = rootSlice.actions;

export default rootSlice.reducer;
