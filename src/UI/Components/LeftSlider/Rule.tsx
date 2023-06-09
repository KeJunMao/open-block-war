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
  const autoJoin = useSelector((state: RootState) => state.config.autoJoin);
  const cards = [
    {
      name: "阵营名",
      text: "加入战斗",
    },
    {
      name: "投靠 阵营",
      text: "改变阵营",
    },
    {
      name: "TP 或 B",
      text: "回城",
    },
    {
      name: "任意弹幕",
      text: "随机强化",
    },
  ];
  if (hasCard) {
    cards.push({
      name: "发兵",
      text: "消耗积分发兵",
    });
  }
  if (autoJoin) {
    cards[0].name = "观看直播";
    cards[0].text = "自动加入战斗";
  }
  if (teams.length >= 5 || cards.length >= 5) {
    return (
      <Swiper modules={[Autoplay]} autoplay={{ delay: 1200 }}>
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
  const liveType = useSelector((state: RootState) => state.config.liveType);
  const bilibiliGifts = [
    {
      img: "https://s1.hdslb.com/bfs/live/d57afb7c5596359970eb430655c6aef501a268ab.png@80w_80h_1e_1c.png",
      text: "微微加速",
    },
    {
      img: "https://i0.hdslb.com/bfs/live/a4c8a134c059665d8d477a803b12430222d8e7b8.webp",
      text: "超级加速",
    },
    {
      img: "https://i0.hdslb.com/bfs/live/7dad99cce8772d1045dec6916a55642491989819.webp",
      text: "增派兵力",
    },
    {
      img: "https://s1.hdslb.com/bfs/live/bb6c11dcc365b3d8287569f08b8b0d0f2e1a3ef8.png@80w_80h_1e_1c.webp",
      text: "变大",
    },
    {
      img: "https://i0.hdslb.com/bfs/live/a5a1437074843d4ddd78766a1633534f748164a4.webp",
      text: "立即发兵",
      hasCard: true,
    },
  ];
  const douyuGifts = [
    {
      img: "https://gfs-op.douyucdn.cn/dygift/1705/92c614debee11c3db11f853f3c02ed91.gif",
      text: "微微加速",
    },
    {
      img: "https://gfs-op.douyucdn.cn/dygift/2019/08/23/f65a45c06f2f5b5ba56cb13c8fb8ada7.gif",
      text: "超级加速",
    },
    {
      img: "https://gfs-op.douyucdn.cn/dygift/2018/11/27/d71e48b4ac91993b4aea75c0c0dd0f45.gif",
      text: "增派兵力",
    },
    {
      img: "https://gfs-op.douyucdn.cn/dygift/2019/08/23/610c0921ed5e5a1592d7da2b26717108.gif",
      text: "变大",
    },
    {
      img: "https://gfs-op.douyucdn.cn/dygift/2022/02/23/3dde6d15e8c46fe1b39f2c65dfb6a15a.gif",
      text: "立即发兵",
      hasCard: true,
    },
  ];

  const GiftsCardList = () => {
    let gifts = [];
    switch (liveType) {
      case "bilibili":
        gifts = bilibiliGifts;
        break;
      case "douyu":
        gifts = douyuGifts;
        break;
    }
    if (!hasCard) {
      gifts = gifts.filter((gift) => !gift.hasCard);
    }
    return (
      <div>
        {gifts.map((gift) => {
          return <GiftCard {...gift} key={gift.text} />;
        })}
      </div>
    );
  };

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

      <GiftsCardList />
    </Box>
  );
}
