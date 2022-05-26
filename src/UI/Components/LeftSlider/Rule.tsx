import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import "swiper/css";

const GiftCard = ({ img, text }: { img: string; text: string }) => {
  return (
    <Box
      sx={{
        fontSize: "2rem",
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      <img style={{ width: "2em", marginRight: "1em" }} src={img}></img>
      <Box
        sx={{
          flex: 1,
        }}
      >
        {text}
      </Box>
    </Box>
  );
};

const Highlight = ({ text }: { text: string }) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        p: 1,
        background: "#686868",
        mr: 1,
        borderRadius: "5px",
        color: "#eaeb5c",
      }}
      component="span"
    >
      {text}
    </Box>
  );
};

const DanmuCard = ({ name, text }: { text: string; name: string }) => {
  return (
    <Box sx={{ m: 1 }}>
      <Highlight text={name}></Highlight>
      {text}
    </Box>
  );
};

const PlayRule = () => {
  const teams = useSelector((state: RootState) => state.root.teams);
  if (teams.length >= 5) {
    return (
      <Swiper modules={[Autoplay]} autoplay={{ delay: 1200 }}>
        <SwiperSlide>
          <DanmuCard name="阵营名" text="加入战斗"></DanmuCard>
        </SwiperSlide>
        <SwiperSlide>
          <DanmuCard name="TP 或 B" text="回城"></DanmuCard>
        </SwiperSlide>
        <SwiperSlide>
          <DanmuCard name="任意弹幕" text="随机强化"></DanmuCard>
        </SwiperSlide>
        <SwiperSlide>
          <DanmuCard name="投靠 阵营" text="改变阵营"></DanmuCard>
        </SwiperSlide>
      </Swiper>
    );
  } else {
    return (
      <>
        <DanmuCard name="阵营名" text="加入战斗"></DanmuCard>
        <DanmuCard name="TP 或 B" text="回城"></DanmuCard>
        <DanmuCard name="任意弹幕" text="随机强化"></DanmuCard>
        <DanmuCard name="投靠 阵营" text="改变阵营"></DanmuCard>
      </>
    );
  }
};

export default function Rule() {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        sx={{
          p: 1,
        }}
        fontWeight="bold"
        align="center"
        variant="h4"
      >
        玩法说明
      </Typography>
      <Box
        sx={{
          fontSize: "2rem",
          // textAlign: "center",
        }}
      >
        <PlayRule></PlayRule>
      </Box>
      <Divider
        sx={{
          mt: 2,
        }}
      ></Divider>
      <GiftCard
        img="https://s1.hdslb.com/bfs/live/d57afb7c5596359970eb430655c6aef501a268ab.png@80w_80h_1e_1c.png"
        text="加速"
      />
      <GiftCard
        img="https://s1.hdslb.com/bfs/live/92c5258517d1477797b54c5fdaeb8c66dc962ed6.png@80w_80h_1e_1c.png"
        text="超级加速"
      />
      <GiftCard
        img="https://s1.hdslb.com/bfs/live/79b6d0533fc988f2800fc5bb4fe3722c825f746f.png@80w_80h_1e_1c.png"
        text="增派兵力"
      />
    </Box>
  );
}
