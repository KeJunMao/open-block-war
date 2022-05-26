import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
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
        英雄榜
      </Typography>
      <Typography
        sx={{
          p: 1,
        }}
        fontWeight="bold"
        variant="h4"
        align="center"
      >
        第{time}年
      </Typography>
    </Box>
  );
}
