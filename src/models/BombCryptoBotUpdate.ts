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
    bomberman?: number
    keys?: number


}
