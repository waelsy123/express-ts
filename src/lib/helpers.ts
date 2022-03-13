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
    if (it > 50) {
        console.log("🚀 ~ file: helpers.ts ~ line 20 ~ callNode ~ it", it)
        return null
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

        return null

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