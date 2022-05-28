import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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
  const hasCard = useSelector((state: RootState) => state.config.cards);
  const cards = [
    {
      name: "阵营名",
      text: "加入战斗",
    },
    {
      name: "TP 或 B",
      text: "回城",
    },
    {
      name: "任意弹幕",
      text: "随机强化",
    },
    {
      name: "投靠 阵营",
      text: "改变阵营",
    },
  ];
  if (hasCard) {
    cards.push({
      name: "发兵",
      text: "消耗积分发兵",
    });
  }
  if (teams.length >= 5 || cards.length >= 5) {
    return (
      <Swiper modules={[Autoplay]} autoplay={{ delay: 1200 }}>
        <SwiperSlide>
          <DanmuCard name="阵营名" text="加入战斗"></DanmuCard>
        </SwiperSlide>
        {cards.map((card) => {
          return (
            <SwiperSlide key={card.name}>
              <DanmuCard name={card.name} text={card.text}></DanmuCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  } else {
    return (
      <>
        {cards.map((card) => {
          return (
            <DanmuCard
              key={card.name}
              name={card.name}
              text={card.text}
            ></DanmuCard>
          );
        })}
      </>
    );
  }
};

export default function Rule() {
  const hasCard = useSelector((state: RootState) => state.config.cards);
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
        img="https://i0.hdslb.com/bfs/live/a4c8a134c059665d8d477a803b12430222d8e7b8.webp"
        text="超级加速"
      />
      <GiftCard
        img="https://i0.hdslb.com/bfs/live/7dad99cce8772d1045dec6916a55642491989819.webp"
        text="增派兵力"
      />
      <GiftCard
        img="https://i0.hdslb.com/bfs/live/419bf4e5bd6fb4e1185fb73a466c6c884d0f2ba2.webp"
        text="变大"
      />
      {hasCard && (
        <GiftCard
          img="https://i0.hdslb.com/bfs/live/a5a1437074843d4ddd78766a1633534f748164a4.webp"
          text="立即发兵"
        />
      )}
    </Box>
  );
}
