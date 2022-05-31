import { request } from "./request";

export function getMultidata() {
    return request({
        url: 'http://localhost:30000/announce'
    })
}