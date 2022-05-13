import { BombCryptoBotUpdate } from './../models/BombCryptoBotUpdate';
import axios from "axios";

export var sum = (a: number[]) => a.reduce(function (a, b) { return a + b; }, 0);

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const isLive = async (host: string) => {
    try {
        const url = `${host}/config`
        const response = await axios.get(url);

        if (response && response.data) {
            return true
        }
    }
    catch {
        return false
    }
}

export const callNode = async (i: number, it = 0) => {
    const getLastUpdate = async () => {

        const lastUpdate = await BombCryptoBotUpdate.query().findOne({
            bomberman_id: i
        }).orderBy('created_at', 'DESC')


        if (!lastUpdate) return null

        return {
            ...lastUpdate,
            BCoin: lastUpdate.bcoin,
            Bomberman: lastUpdate.bomberman,
            Key: lastUpdate.keys
        }
    }
    if (it > 50) {
        console.log("🚀 ~ file: helpers.ts ~ line 20 ~ callNode ~ it", it)

        return await getLastUpdate()
    }

    const host = `http://75.119.135.161:${3100 + i}`
    const url = `${host}/rewards`

    const tryAgain: any = async () => {
        const live = await isLive(host)

        if (live) {
            await sleep(5000)
            const res = await callNode(i, it + 1)

            return res
        }


        return await getLastUpdate()

    }

    try {
        const response = await axios.get(url);
        let { data } = response

        if (data === null) {
            return tryAgain()
        }

        return data

    } catch (e) {
        return tryAgain()
    }
}

export const claim = async (i: number, coin: string) => {
    const host = `http://75.119.135.161:${3100 + i}`
    const url = `${host}/claim/${coin}`

    const response = await axios.get(url);
    return response
}
