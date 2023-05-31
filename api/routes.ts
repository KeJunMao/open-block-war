import { Router } from "express";
import GetAuth from "./proxy/bilibiliServer/routes/getAuth";
import GameStart from "./proxy/bilibiliServer/routes/gameStart";
import GameEnd from "./proxy/bilibiliServer/routes/gameEnd";
import GameHeartBeat from "./proxy/bilibiliServer/routes/gameHeartBeat";
import GameBatchHeartBeat from "./proxy/bilibiliServer/routes/gameBatchHeartBeat";
import {
  getFaceByBilibili,
  getFaceByBilibili2,
  getFaceByTenApi,
} from "./proxy/getBilibiliFace";
import start from "./proxy/start";

function any(promises: any) {
  return new Promise((resolve, reject) => {
    let errors: any[] = [];
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          errors.push(error);
          if (errors.length === promises.length) {
            reject(errors);
          }
        });
    });
  });
}

const router = Router();

router.get("/b/face/:id", async function (req, res) {
  const id = req.params.id;
  let face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";

  try {
    face = (await any([
      getFaceByBilibili(id),
      getFaceByBilibili2(id),
      getFaceByTenApi(id),
    ])) as string;
  } catch (error) {
    console.log(error);
  }
  res.send({
    face,
  });
});

router.post("/b/getAuth", GetAuth);
router.post("/b/gameStart", GameStart);
router.post("/b/gameEnd", GameEnd);
router.post("/b/gameHeartBeat", GameHeartBeat);
router.post("/b/gameBatchHeartBeat", GameBatchHeartBeat);

router.get("/b/start/:code", async (req, res) => {
  const code = req.params.code;
  res.send(await start(code));
});

export default router;
