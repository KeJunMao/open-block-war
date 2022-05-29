import { ConfigState } from "../../store/configSlice";
import war3 from "./war3";

const war3_25048892: Partial<ConfigState> = {
  ...war3,
  gifts: {
    打call: {
      min: 1,
      max: 3,
    },
  },
};

export default war3_25048892;
