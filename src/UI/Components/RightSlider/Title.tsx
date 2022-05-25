import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Title() {
  return (
    <Box>
      <Typography
        sx={{
          p: 1,
        }}
        fontWeight="bold"
        variant="h3"
        align="center"
      >
        英雄榜
      </Typography>
    </Box>
  );
}
