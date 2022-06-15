import Team from "../../Components/Team";
import { IParseEntryData } from "../type";

export default class Entry {
  static Apply(entry: IParseEntryData) {
    const team = Team.GetMinPlayerTeam();
    if (team) {
      team.makeUser(entry.id, entry.name);
      return;
    }
  }
}
