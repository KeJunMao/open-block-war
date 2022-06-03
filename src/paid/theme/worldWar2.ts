import { ConfigState } from "../../store/configSlice";

const worldWar2: Partial<ConfigState> = {
  teams: [
    {
      homeX: 21,
      homeY: 2,
      name: "苏联",
      shortName: "苏",
      color: 0xff0000,
      joinCommand: [],
    },
    {
      homeX: 6,
      homeY: 6,
      name: "英国",
      shortName: "英",
      color: 0xff7f00,
      joinCommand: [],
    },
    {
      homeX: 2,
      homeY: 21,
      name: "法国",
      shortName: "法",
      color: 0x90caf9,
      joinCommand: [],
    },
    {
      homeX: 17,
      homeY: 17,
      name: "美国",
      shortName: "美",
      color: 0x00ff00,
      joinCommand: [],
    },
    {
      homeX: 13,
      homeY: 32,
      name: "德国",
      shortName: "德",
      color: 0x008080,
      joinCommand: [],
    },
    {
      homeX: 28,
      homeY: 28,
      name: "意大利",
      shortName: "意",
      color: 0x4b0082,
      joinCommand: [],
    },
    {
      homeX: 32,
      homeY: 13,
      name: "波兰",
      shortName: "波",
      color: 0x6a0dad,
      joinCommand: [],
    },
  ],
  gameName: "二战模拟器",
  gifts: {
    打call: {
      min: 1,
      max: 3,
    },
  },
  endTime: 600,
};

export default worldWar2;
