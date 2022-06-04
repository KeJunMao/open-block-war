import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { FC, useState } from "react";
import { ChromePicker } from "react-color";
import { useSelector } from "react-redux";
import { colorToString } from "../../../paid/theme";
import { RootState } from "../../../store";
import { ConfigState } from "../../../store/configSlice";
import formatNumber from "../../../utils/formatNumber";

interface TeamProps {
  name: string;
  hp: number;
  blockCount: number;
  playerCount: number;
  userCount: number;
  index: number;
  color: string;
  isDie: boolean;
  icon?: string;
  shortName?: string;
  tile?: string;
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
  tile,
  isDie,
}) => {
  const [teamColor, setTeamColor] = useState(color);
  const [teamName, setTeamName] = useState(name);
  const [teamShortName, setTeamShortName] = useState(shortName);
  const [open, setOpen] = useState(false);
  const config = useSelector((state: RootState) => state.config);
  const localConfigString =
    localStorage.getItem(`${config.liveId}_${config.theme}`) ?? "{}";
  const localConfig: Partial<ConfigState> = JSON.parse(localConfigString);

  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const save = () => {
    localStorage.setItem(
      `${config.liveId}_${config.theme}`,
      JSON.stringify(localConfig)
    );
  };

  const resetTeamConfig = () => {
    delete localConfig.teams;
    save();
    handleClose();
  };

  const handleSaveAndClose = () => {
    localConfig.teams = localConfig.teams ? localConfig.teams : config.teams;
    localConfig.teams = localConfig.teams.map((v) => {
      if (v.name === name) {
        return {
          ...v,
          name: teamName ? teamName : name,
          shortName: teamShortName ? teamShortName : shortName,
          color: parseInt(teamColor.replace("#", ""), 16),
        };
      }
      return v;
    });
    const set = new Set(localConfig.teams.map((v) => v.name));
    if (set.size === localConfig.teams.length) {
      save();
      handleClose();
    } else {
      setError("保存失败！阵营重复");
    }
  };

  return (
    <>
      <Dialog open={open} fullWidth onClose={handleClose}>
        <DialogTitle>阵营设置</DialogTitle>
        <Alert
          sx={{
            display: error ? "flex" : "none",
          }}
          severity="error"
        >
          {error}
        </Alert>
        <DialogContent
          sx={{
            "& .chrome-picker": {
              boxShadow: "none !important",
            },
          }}
        >
          <DialogContentText
            sx={{
              mb: 2,
            }}
          >
            刷新后生效
          </DialogContentText>
          <Box
            sx={{
              "& > :not(style)": { mb: 2 },
            }}
          >
            <TextField
              fullWidth
              label="阵营名称"
              defaultValue={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
              helperText="地图显示"
            />
            <TextField
              fullWidth
              label="阵营简称"
              defaultValue={teamShortName}
              onChange={(e) => {
                setTeamShortName(e.target.value[0]);
              }}
              helperText="左侧显示"
            />
          </Box>
          <DialogContentText
            sx={{
              mb: 2,
            }}
          >
            颜色设置
          </DialogContentText>
          <ChromePicker
            color={teamColor}
            onChange={(color) => {
              setTeamColor(color.hex);
            }}
            disableAlpha
          ></ChromePicker>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetTeamConfig}>重置并关闭</Button>
          <Button onClick={handleSaveAndClose}>保存并关闭</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontSize: "2rem",
          backgroundColor: color,
          backgroundImage: `url(${tile})`,
          backgroundSize: "contain",
          color: tile ? color : "inherit",
        }}
        onClick={() => setOpen(true)}
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
              lineHeight: "1.2em",
            }}
          >
            {shortName ? shortName : name}
          </Box>
        )}
        {isDie ? (
          <Box>已灭亡</Box>
        ) : (
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
        )}
      </Box>
    </>
  );
};

export default function Teams() {
  const teams = useSelector((state: RootState) => state.root.teams);
  return (
    <Box>
      {[...teams]
        .sort((a, b) => b.blocks.children.size - a.blocks.children.size)
        .map((team, index) => {
          let playerCount = team.players.children.size;
          team.users.forEach((user) => {
            playerCount += user.slaveGroup.children.size;
          });
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
              playerCount={playerCount}
              tile={team.tile}
              index={index}
              isDie={team.isDie}
            ></Team>
          );
        })}
    </Box>
  );
}
