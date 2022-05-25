import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { colorToString } from "../../paid/theme";

export function Result() {
  const winTeam = useSelector((state: RootState) => state.root.winTeam);
  const { styleTheme } = useSelector((state: RootState) => state.config);
  if (!winTeam) {
    return <></>;
  }
  const mvpUser = [...winTeam.users].sort((a, b) => b.score - a.score)[0];

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        background: "#00000082",
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          background: colorToString(styleTheme.backgroundColor, "#ebffe2"),
          p: 2,
          minWidth: "50rem",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {winTeam.name}方胜利
        </Typography>
        <Divider sx={{ m: 2 }}></Divider>

        <Avatar
          sx={{
            margin: "0 auto",
            width: "8rem",
            height: "8rem",
            mb: 2,
          }}
          src={mvpUser.face}
        ></Avatar>
        <Typography variant="h4" align="center" gutterBottom>
          MVP: {mvpUser.name}
        </Typography>
      </Box>
    </Box>
  );
}
