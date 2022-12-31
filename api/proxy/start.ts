import axios from 'axios'
import CrypotJs from 'crypto-js'

const accessKeyId = '2XFV1LBNMayxHI0VuBBiXmYA'
const accessKeySecred = 'kV8hnkR3MO4MzDkgtHFtCrbU8xdELj'
const app_id = 1675588312996



const request = axios.create({
    baseURL: "https://live-open.biliapi.com",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
})

request.interceptors.request.use((config) => {
    const md5 = CrypotJs.MD5(JSON.stringify(config.data))
    const headerStr = `x-bili-accesskeyid:${accessKeyId}
x-bili-content-md5:${md5.toString()}
x-bili-signature-method:HMAC-SHA256
x-bili-signature-nonce:${CrypotJs.HmacSHA256(Math.random().toString(), 'random').toString()}
x-bili-signature-version:1.0
x-bili-timestamp:${Math.floor(new Date().getTime() / 1000)}`
    let headers: Record<string, string> = {}
    headerStr.split('\n').forEach(header => {
        const [key, value] = header.split(':')
        headers[key] = value
    })

    const sha256 = CrypotJs.HmacSHA256(headerStr,accessKeySecred)

    // @ts-ignore
    config.headers = {
        ...config.headers,
        ...headers,
        Authorization: sha256.toString()
    }
    return config
})

export default async function (code) {
    const res = await request.post('/v2/app/start', {
        code,
        app_id
    })

    return res.data?.data
}
