import { callNode, sleep } from './lib/helpers';
import { BombCryptoBotUpdate, Bomber } from './models/BombCryptoBotUpdate';

var CronJob = require('cron').CronJob;

const update = async () => {
    console.log('cron job started..');
    const batch = new Date().getTime().toString()


    for (let i = 0; true; i++) {
        await sleep(50)

        const data = await callNode(i)

        if (!data) {
            break
        }

        const accountData = {
            created_at: new Date(),
            bomberman_id: i,
            batch,
            bcoin: data.BCoin,
            bomberman: data.Bomberman,
            keys: data.Key,
            mined: data.detail.mined,
            invested: data.detail.invested,
            rewards: data.detail.rewards,
        }

        console.log("🚀 ~ file: cronjob.ts ~ line 36 ~ update ~ accountData", accountData)

        const res = await BombCryptoBotUpdate.query().insert(accountData)
        console.log("🚀 ~ file: cronjob.ts ~ line 34 ~ job ~ res", res)

        const mappedHeros = data.active.heros.map((hero: any) => {
            return {
                batch,
                created_at: new Date(),
                account_id: res.bomberman_id,
                energy: hero.params.energy,
                active: hero.params.active,
                state: hero.params.state,
                index: hero.params.index,
                rarity: hero.params.rarity,
                rarity_index: hero.params.rarityIndex,
                level: hero.params.level,
                variant: hero.params.variant,
                skin: hero.params.skin,
                stamina: hero.params.stamina,
                speed: hero.params.speed,
                skill_count: hero.params.skillCount,
                strength: hero.params.strength,
                range: hero.params.range,
                capacity: hero.params.capacity,
            }
        })
        if (mappedHeros && mappedHeros.length > 0) {
            const res2 = await Bomber.query().insert(mappedHeros)
            console.log("🚀 ~ file: cronjob.ts ~ line 60 ~ update ~ res2", res2)
        }
    }
}

export var job = new CronJob('0 0 * * * *', async function () {
    await update()

}, null, true, 'America/Los_Angeles');
update()
