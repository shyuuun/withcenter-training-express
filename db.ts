import { Client, PoolClient } from 'pg';
import Pool from 'pg-pool';


// you can pass properties to the pool
// these properties are passed unchanged to both the node-postgres Client constructor
// and the node-pool (https://github.com/coopernurse/node-pool) constructor
// allowing you to fully configure the behavior of both
const pool = new Pool({
    database: 'abc',
    user: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
    ssl: false,
    max: 20, // set pool max size to 20
    idleTimeoutMillis: 1000, // close idle clients after 1 second
    connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
    maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
});




export class DBClient {
    private static client?: Client & PoolClient;
    private constructor() { }
    private static instance: DBClient;
    static getInstance(): DBClient {
        if (!DBClient.instance) {
            DBClient.instance = new DBClient();

        }
        return DBClient.instance;
    }

    async connect() {
        if (!DBClient.client) {
            DBClient.client = await pool.connect();
        }
    }
    get db(): Client & PoolClient {
        return DBClient.client!;
    }

}

export async function getUsers(): Promise<{ id: number, name: string }[]> {

    const res = await DBClient.getInstance().db.query('SELECT * from abc LIMIT 2');
    console.log(res.rows); // Hello world!

    return res.rows;
}