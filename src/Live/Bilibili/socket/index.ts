// @ts-expect-error
import DanmakuWebSocket from "../../../venders/danmaku-websocket.min.js"

let ws: DanmakuWebSocket

/**
 * 创建socket长连接
 * @param authBody
 * @param wssLinks
 */
function createSocket(authBody: string, wssLinks: string[], opt?: any) {
    opt = {
        ...getWebSocketConfig(authBody, wssLinks),
        // 收到消息,
        onReceivedMessage: (res: any) => {
            console.log(res)
        },
        // 收到心跳处理回调
        onHeartBeatReply: (data: any) => console.log("收到心跳处理回调:", data),
        onError: (data: any) => console.log("error", data),
        onListConnectError: () => {
            console.log("list connect error")
            destroySocket()
        },
        ...opt,
    }

    if (!ws) {
        ws = new DanmakuWebSocket(opt)
    }

    return ws
}

/**
 * 获取websocket配置信息
 * @param authBody
 * @param wssLinks
 */
function getWebSocketConfig(authBody: string, wssLinks: string[]) {
    const url = wssLinks[0]
    const urlList = wssLinks
    const auth_body = JSON.parse(authBody)
    return {
        url,
        urlList,
        customAuthParam: [
            {
                key: "key",
                value: auth_body.key,
                type: "string",
            },
            {
                key: "group",
                value: auth_body.group,
                type: "string",
            },
        ],
        rid: auth_body.roomid,
        protover: auth_body.protoover,
        uid: auth_body.uid,
    }
}

/**
 * 销毁websocket
 */
function destroySocket() {
    ws && ws.destroy()
    ws = undefined
}

/**
 * 获取websocket实例
 */
function getWsClient() {
    return ws
}

export { createSocket, destroySocket, getWebSocketConfig, getWsClient }
