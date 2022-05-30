import { ConfigState } from "../../store/configSlice";

const sevenKingDom7: Partial<ConfigState> = {
  teams: [
    {
      homeX: 21,
      homeY: 2,
      name: "齐国",
      shortName: "齐",
      color: 0xff0000,
      joinCommand: [],
    },
    {
      homeX: 6,
      homeY: 6,
      name: "楚国",
      shortName: "楚",
      color: 0xff7f00,
      joinCommand: [],
    },
    {
      homeX: 2,
      homeY: 21,
      name: "燕国",
      shortName: "燕",
      color: 0x90caf9,
      joinCommand: [],
    },
    {
      homeX: 17,
      homeY: 17,
      name: "秦国",
      shortName: "秦",
      color: 0x00ff00,
      joinCommand: [],
    },
    {
      homeX: 13,
      homeY: 32,
      name: "赵国",
      shortName: "赵",
      color: 0x008080,
      joinCommand: [],
    },
    {
      homeX: 28,
      homeY: 28,
      name: "魏国",
      shortName: "魏",
      color: 0x4b0082,
      joinCommand: [],
    },
    {
      homeX: 32,
      homeY: 13,
      name: "韩国",
      shortName: "韩",
      color: 0x6a0dad,
      joinCommand: [],
    },
  ],
  gameName: "七国争霸",
  gifts: {
    打call: {
      min: 1,
      max: 3,
    },
  },
  endTime: 600,
};

export default sevenKingDom7;
