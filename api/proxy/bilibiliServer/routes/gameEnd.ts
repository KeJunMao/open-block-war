import api from "../interceptor"

/**
 * 互动玩法游戏结束接口
 * @param ctx
 */
export default async function GameEnd(req, res) {
    res.send(await api
        .post("/v2/app/end", req.body))

}
