import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import GameTime from "../../../Components/GameTime";
import { RootState } from "../../../store";

export default function Title() {
  const time = useSelector((state: RootState) => state.root.time);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{
          p: 1,
        }}
        fontWeight="bold"
        variant="h4"
        align="center"
      >
        积分榜
      </Typography>
      <Typography
        sx={{
          p: 1,
        }}
        fontWeight="bold"
        variant="h4"
        align="center"
      >
        倒计时{GameTime.EndTime - time}秒
      </Typography>
    </Box>
  );
}
