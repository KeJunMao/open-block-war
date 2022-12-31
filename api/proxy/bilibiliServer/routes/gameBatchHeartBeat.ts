import api from "../interceptor"

/**
 * 批量心跳接口
 * @param ctx
 */
export default async function GameBatchHeartBeat(req, res) {
    res.send(await api
        .post("/v2/app/batchHeartbeatt", req.body))
}
