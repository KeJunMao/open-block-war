import { Router } from "express";
import { getFaceByBilibili, getFaceByTenApi } from "./proxy/getBilibiliFace";

const router = Router();

router.get("/b/face/:id", async function (req, res) {
  const id = req.params.id;
  try {
    let face = await getFaceByBilibili(id);
    if (!face) {
      face = await getFaceByTenApi(id);
    }
    if (!face) {
      face = "http://i0.hdslb.com/bfs/face/member/noface.jpg";
    }
    res.send({
      face,
    });
  } catch (err) {
    res.send({
      face: "",
    });
  }
});

export default router;
