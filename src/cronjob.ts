import { callNode, sleep } from './lib/helpers';
import { BombCryptoBotUpdate } from './models/BombCryptoBotUpdate';

var CronJob = require('cron').CronJob;

const update = async () => {
    console.log('cron job started..');
    const batch = new Date().getTime().toString()

    const dataArray: any = []


    for (let i = 0; true; i++) {
        await sleep(50)

        const data = await callNode(i)
        console.log("🚀 ~ file: cronjob.ts ~ line 24 ~ job ~ data", i, data)

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

    if (dataArray.length === 0) {
        console.log("🚀 ~ file: cronjob.ts ~ line 34 ~ job ~ dataArray", dataArray)
    }

    const res = await BombCryptoBotUpdate.query().insert(dataArray)
    console.log("🚀 ~ file: cronjob.ts ~ line 34 ~ job ~ res", res)

}

export var job = new CronJob('0 0 * * * *', async function () {
    await update()

}, null, true, 'America/Los_Angeles');
update()
