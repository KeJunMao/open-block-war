import { Router } from "express";
import {
  getFaceByBilibili,
  getFaceByBilibili2,
  getFaceByTenApi,
} from "./proxy/getBilibiliFace";

const router = Router();

router.get("/b/face/:id", async function (req, res) {
  const id = req.params.id;
  let face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";
  try {
    face = await getFaceByBilibili(id);
  } catch (error) {
    try {
      face = await getFaceByBilibili2(id);
    } catch (error) {
      try {
        face = await getFaceByTenApi(id);
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (!face) {
    face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";
  }
  res.send({
    face,
  });
});

export default router;
