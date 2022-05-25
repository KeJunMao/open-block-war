import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Title() {
  const { gameName } = useSelector((state: RootState) => state.config);
  return (
    <Typography
      sx={{
        p: 1,
      }}
      fontWeight="bold"
      align="center"
      variant="h3"
    >
      {gameName}
    </Typography>
  );
}
