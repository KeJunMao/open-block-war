import api from "../interceptor"

/**
 * 鉴权签名接口
 * @param ctx
 */
export default async function GetAuth(ctx) {
    const params = ctx.request.body
    // 为了方便存在全局
    global.appKey = params.appKey
    global.appSecret = params.appSecret
    // [只为验证鉴权，可删除]
    await api
        .post("/v2/app/start", {})
        .then(({ data }) => {
            // 非文档描述性code，sign success
            if (data.code === -400) {
                ctx.body = {
                    msg: "auth success",
                    type: "success",
                    state: 200
                }
            } else {
                ctx.body = data
            }
        })
        .catch(err => {
            ctx.body = err
        })
}
