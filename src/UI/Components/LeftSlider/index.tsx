import Box from "@mui/material/Box";
import Rule from "./Rule";
import Teams from "./Teams";
import Title from "./Title";

export default function LeftSlider() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Title></Title>
      <Teams></Teams>
      <Rule></Rule>
    </Box>
  );
}
