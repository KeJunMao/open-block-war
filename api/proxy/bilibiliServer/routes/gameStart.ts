import api from "../interceptor"

export default async function GameStart(req, res) {
    res.send(await api
        .post("/v2/app/start", req.body))
}
