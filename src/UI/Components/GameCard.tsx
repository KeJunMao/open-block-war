import Box from "@mui/material/Box";
import { useEffect } from "react";
import Game from "../../Game/Game";
import GoldKey from "../../Game/GoldKey";
import MainScene from "../../Scenes/MainScene";
import PreloadScene from "../../Scenes/PreloadScene";

let game: Game;

const GameCard = () => {
  useEffect(() => {
    if (!game) {
      game = new Game({
        type: Phaser.AUTO,
        scale: {
          width: 1120,
          height: 1120,
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        backgroundColor: "#ebffe2",
        parent: "game",
        scene: [PreloadScene, MainScene],
        physics: {
          default: "arcade",
          arcade: {
            // debug: true,
          },
        },
      });
      window.goldKey = new GoldKey(game);
    }
  }, []);

  return (
    <Box
      id="game"
      sx={{
        marginBottom: "-5px",
      }}
    ></Box>
  );
};

export default GameCard;
