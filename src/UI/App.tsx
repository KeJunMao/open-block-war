import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GameCard from "./Components/GameCard";
import LeftSlider from "./Components/LeftSlider";
import { Result } from "./Components/Result";
import RightSlider from "./Components/RightSlider";

export default function App() {
  return (
    <>
      <Result></Result>
      <Box
        sx={{
          boxSizing: "border-box",
          height: "100vh",
        }}
      >
        <Grid
          container
          columns={{
            xs: 96,
          }}
        >
          <Grid item xs={21}>
            <LeftSlider></LeftSlider>
          </Grid>
          <Grid item xs={53}>
            <GameCard />
          </Grid>
          <Grid item xs={22}>
            <RightSlider></RightSlider>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
