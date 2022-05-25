import Box from "@mui/material/Box";
import Title from "./Title";
import Users from "./Users";

export default function RightSlider() {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Title></Title>
      <Users></Users>
    </Box>
  );
}
