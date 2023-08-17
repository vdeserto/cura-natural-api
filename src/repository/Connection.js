import { Environment } from '../constants/Environment.js';
import pg from 'pg'
const { Pool } = pg;

export async function Connect() {

  if (globalThis.connection)
        return globalThis.connection.connect();

  const connectionString =
		Environment.DATABASES.PLANTS_STORAGE.CONNECTION_STRING;

	// pools will use environment variables
	// for connection information
	const pool = new Pool({
		connectionString,
	});

	// you can also use async/await
	const POOL_RESPONDING = await pool.query('SELECT NOW()');
	console.log( ...POOL_RESPONDING.rows );
	// await pool.end();
	return pool;

	// clients will also use environment variables
	// for connection information

	// const client = new Client({
	//   connectionString,
	// })

	// await client.connect()

	// await client.query('SELECT NOW()')

	// await client.end()
};
