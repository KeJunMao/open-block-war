import Box from "@mui/material/Box";
import { FC } from "react";
import { useSelector } from "react-redux";
import { colorToString } from "../../../paid/theme";
import { RootState } from "../../../store";
import formatNumber from "../../../utils/formatNumber";

interface TeamProps {
  name: string;
  hp: number;
  blockCount: number;
  playerCount: number;
  userCount: number;
  index: number;
  color: string;
  icon?: string;
  shortName?: string;
}

const Team: FC<TeamProps> = ({
  name,
  hp,
  blockCount,
  index,
  color,
  playerCount,
  userCount,
  icon,
  shortName,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: "2rem",
        backgroundColor: color,
      }}
    >
      <Box
        sx={{
          fontWeight: "bolder",
          width: "1em",
          textAlign: "center",
        }}
      >
        {index + 1}
      </Box>
      {icon ? (
        <Box
          sx={{
            width: "2.5em",
            height: "2.5em",
            backgroundImage: `url(${icon})`,
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></Box>
      ) : (
        <Box
          sx={{
            fontSize: "2em",
            mr: 2,
          }}
        >
          {shortName ? shortName : name}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        <Box
          sx={{
            mr: 1,
          }}
        >
          <Box
            sx={{
              fontSize: "0.5em",
            }}
            component="span"
          >
            城池
          </Box>
          {hp}
        </Box>
        <Box
          sx={{
            mr: 1,
          }}
        >
          <Box
            sx={{
              fontSize: "0.5em",
            }}
            component="span"
          >
            领土
          </Box>
          {formatNumber(blockCount)}
        </Box>
        <Box
          sx={{
            mr: 1,
          }}
        >
          <Box
            sx={{
              fontSize: "0.5em",
            }}
            component="span"
          >
            领主
          </Box>
          {formatNumber(userCount)}
        </Box>
        <Box
          sx={{
            mr: 1,
          }}
        >
          <Box
            sx={{
              fontSize: "0.5em",
            }}
            component="span"
          >
            人口
          </Box>
          {formatNumber(playerCount)}
        </Box>
      </Box>
    </Box>
  );
};

export default function Teams() {
  const teams = useSelector((state: RootState) => state.root.teams);
  return (
    <Box>
      {[...teams]
        .sort((a, b) => b.blocks.children.size - a.blocks.children.size)
        .map((team, index) => {
          return (
            <Team
              key={team.name}
              color={colorToString(team.color)}
              name={team.name}
              shortName={team.shortName}
              hp={team.homeBlock?.hp ?? 0}
              icon={team.icon}
              blockCount={team.blocks.children.size}
              userCount={team.users.size}
              playerCount={team.players.children.size}
              index={index}
            ></Team>
          );
        })}
    </Box>
  );
}
