import api from "../interceptor"

/**
 * 心跳接口
 * @param ctx
 */
export default async function GameHeartBeat(req, res) {
    res.send(await api
        .post("/v2/app/heartbeat", req.body))
}
