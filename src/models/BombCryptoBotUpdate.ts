import { Model } from "objection"

const Knex = require('knex');

// Initialize knex.
const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.DB
});

// Give the knex instance to objection.
Model.knex(knex);

export class BombCryptoBotUpdate extends Model {
    static get tableName() {
        return 'BombCryptoBotUpdate'
    }

    id!: number
    bomberman_id?: number
    batch?: string
    created_at!: Date
    updated_at?: Date
    bcoin?: number
    senspark?: number
    bomberman?: number
    keys?: number

    mined?: number
    invested?: number
    rewards?: number
}





export class Bomber extends Model {
    static get tableName() {
        return 'Bomber'
    }

    id!: number
    account_id!: number

    state?: string
    energy?: number
    active?: boolean
    index?: number
    rarity?: string
    rarity_index?: number
    level?: number
    variant?: number
    skin?: string
    stamina?: number
    speed?: number
    bomb_skin?: number
    skill_count?: number
    strength?: number
    range?: number
    capacity?: number

}
