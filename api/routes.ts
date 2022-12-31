import { Router } from "express";
// import {
//   getFaceByBilibili,
//   getFaceByBilibili2,
//   getFaceByTenApi,
// } from "./proxy/getBilibiliFace";
import GetAuth from "./proxy/bilibiliServer/routes/getAuth"
import GameStart from "./proxy/bilibiliServer/routes/gameStart"
import GameEnd from "./proxy/bilibiliServer/routes/gameEnd"
import GameHeartBeat from "./proxy/bilibiliServer/routes/gameHeartBeat"
import GameBatchHeartBeat from "./proxy/bilibiliServer/routes/gameBatchHeartBeat"

import start from "./proxy/start";

const router = Router();

// router.get("/b/face/:id", async function (req, res) {
//   const id = req.params.id;
//   let face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";
//   try {
//     face = await getFaceByBilibili(id);
//   } catch (error) {
//     try {
//       face = await getFaceByBilibili2(id);
//     } catch (error) {
//       try {
//         face = await getFaceByTenApi(id);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   }
//   if (!face) {
//     face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";
//   }
//   res.send({
//     face,
//   });
// });


router.post("/b/getAuth", GetAuth)
router.post("/b/gameStart", GameStart)
router.post("/b/gameEnd", GameEnd)
router.post("/b/gameHeartBeat", GameHeartBeat)
router.post("/b/gameBatchHeartBeat", GameBatchHeartBeat)


router.get("/b/start/:code", async (req, res) => {
  const code = req.params.code;
  res.send(await start(code))
})

export default router;
