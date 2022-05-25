import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import formatNumber from "../../../utils/formatNumber";

const UserCard = ({
  name,
  face,
  score,
}: {
  name: string;
  face?: string;
  score: number;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "2rem",
        p: 1,
      }}
    >
      <Box
        sx={{
          width: "5rem",
          height: "5rem",
          mr: 1,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
          }}
          src={face}
          alt=""
        />
      </Box>
      <Box
        sx={{
          fontWeight: "bolder",
        }}
      >
        <Box>{name}</Box>
        <Box
          sx={{
            color: "#eaeb5c",
            textShadow: "2px 2px black",
          }}
        >
          {formatNumber(score)}
        </Box>
      </Box>
    </Box>
  );
};

export default function Users() {
  const users = useSelector((state: RootState) =>
    state.root.teams
      .map((team) => [...team.users])
      .flat()
      .sort((a, b) => b.score - a.score)
  );

  return (
    <Box>
      {[
        users.map((user) => {
          return (
            <UserCard
              score={user.score}
              key={user.id}
              name={user.name}
              face={user.face}
            />
          );
        }),
      ]}
    </Box>
  );
}
