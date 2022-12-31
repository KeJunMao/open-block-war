import Router from "koa-router"
import GetAuth from "./getAuth"
import GameStart from "./gameStart"
import GameEnd from "./gameEnd"
import GameHeartBeat from "./gameHeartBeat"
import GameBatchHeartBeat from "./gameBatchHeartBeat"

const router = new Router()

// 开启路由
router.post("/getAuth", GetAuth)
router.post("/gameStart", GameStart)
router.post("/gameEnd", GameEnd)
router.post("/gameHeartBeat", GameHeartBeat)
router.post("/gameBatchHeartBeat", GameBatchHeartBeat)

export default router
