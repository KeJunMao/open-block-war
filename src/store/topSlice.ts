import { createSlice } from "@reduxjs/toolkit";

interface TodayMvpUser {
  id: number;
  name: string;
  face: string;
  count: number;
  _time: string;
}

export interface TopState {
  todayMvpUsers: TodayMvpUser[];
}

const initialState: TopState = {
  todayMvpUsers: [],
};

export const topSlice = createSlice({
  name: "top",
  initialState,
  reducers: {
    setTodayMvpUsers(state, action) {
      // 过滤不是今天的数据
      state.todayMvpUsers = state.todayMvpUsers.filter((user) => {
        return user._time === new Date().toJSON().split("T")[0];
      });
      if (!action.payload) {
        return;
      }
      const { id } = action.payload;
      const user = state.todayMvpUsers.find((u) => u.id === id);
      if (user) {
        user.count += 1;
        user._time = new Date().toJSON().split("T")[0];
        user.face = action.payload.face as string;
        user.name = action.payload.name;
      } else {
        state.todayMvpUsers.push({
          id,
          name: action.payload.name,
          face: action.payload.face as string,
          count: 1,
          _time: new Date().toJSON().split("T")[0],
        });
      }
      state.todayMvpUsers = state.todayMvpUsers.sort(
        (a, b) => b.count - a.count
      );
    },
  },
});

export const { setTodayMvpUsers } = topSlice.actions;

export default topSlice.reducer;
