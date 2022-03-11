import axios from "axios";

export var sum = (a: number[]) => a.reduce(function (a, b) { return a + b; }, 0);

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const callNode = async (i: number) => {
    const url = `http://75.119.135.161:${3100 + i}/rewards`
    // const url = `https://jsonplaceholder.typicode.com/todos`

    try {
        const response = await axios.get(url);
        const { data } = response

        return data

    } catch {
        return null
    }
}