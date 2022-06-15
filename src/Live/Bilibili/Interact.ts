import Team from "../../Components/Team";
import { IParseInteractData } from "../type";

export default class Interact {
  static Apply(interact: IParseInteractData) {
    const team = Team.GetMinPlayerTeam();
    if (team) {
      team.makeUser(interact.id, interact.name);
      return;
    }
  }
}
