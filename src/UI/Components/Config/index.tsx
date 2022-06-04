import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

import { FC, useEffect, useState } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ConfigState } from "../../../store/configSlice";
import paid from "../../../paid";

const Config: FC = () => {
  const [open, setOpen] = useState(false);
  const config = useSelector((state: RootState) => state.config);
  const localConfigString =
    localStorage.getItem(`${config.liveId}_${config.theme}`) ?? "{}";
  const localConfig: Partial<ConfigState> = JSON.parse(localConfigString);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === " ") {
      setOpen(true);
    }
  };

  useEffect(() => {
    // 按下空格键打开设置
    //@ts-ignore
    document.removeEventListener("keydown", handleKeyDown);
    //@ts-ignore
    document.addEventListener("keydown", handleKeyDown);
  }, []);

  const save = () => {
    localStorage.setItem(
      `${config.liveId}_${config.theme}`,
      JSON.stringify(localConfig)
    );
  };
  const setGameName = (name: string) => {
    localConfig.gameName = name;
    save();
  };
  const setEndTime = (time: string) => {
    localConfig.endTime = parseInt(time);
    save();
  };

  const resetConfig = () => {
    localStorage.removeItem(`${config.liveId}_${config.theme}`);
  };
  const resetAllConfig = () => {
    const liveConfig = paid.getLiveIdPaidConfig(config.liveId);
    if (liveConfig) {
      liveConfig.themes.forEach((theme) => {
        localStorage.removeItem(`${config.liveId}_${theme}`);
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog
      sx={{
        zoom: 1.5,
      }}
      open={open}
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle>设置</DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            mb: 2,
          }}
        >
          修改后自动保存，刷新后生效
        </DialogContentText>
        <Box
          sx={{
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            onChange={(e) => setGameName(e.target.value)}
            fullWidth
            label="游戏名称"
            defaultValue={localConfig.gameName ?? config.gameName}
          />
          <TextField
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            label="游戏时间"
            type={"number"}
            defaultValue={localConfig.endTime ?? config.endTime}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={resetAllConfig}>
          清除所有配置
        </Button>
        <Button onClick={resetConfig}>重置</Button>
        <Button onClick={handleClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Config;
