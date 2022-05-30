import { ConfigState } from "../../store/configSlice";
import war3 from "./war3";

const war3_25048892: Partial<ConfigState> = {
  ...war3,
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
};

export default war3_25048892;
