import { callNode, sleep } from './lib/helpers';
import { BombCryptoBotUpdate } from './models/BombCryptoBotUpdate';

var CronJob = require('cron').CronJob;

export var job = new CronJob('0 * * * * *', async function () {
    console.log('cron job started..');
    const batch = new Date().getTime().toString()

    const dataArray: any = []


    for (let i = 0; i < 2; i++) {
        await sleep(50)

        const data = await callNode(i)
        console.log("🚀 ~ file: cronjob.ts ~ line 24 ~ job ~ data", data)

        if (!data) {
            break
        }

        dataArray.push({
            created_at: new Date(),
            bomberman_id: i,
            batch,
            bcoin: data.BCoin,
            bomberman: data.Bomberman,
            keys: data.Key,
        })
    }

    if (dataArray.length === 0) { return }

    const res = await BombCryptoBotUpdate.query().insert(dataArray)
    console.log("🚀 ~ file: cronjob.ts ~ line 34 ~ job ~ res", res)


}, null, true, 'America/Los_Angeles');