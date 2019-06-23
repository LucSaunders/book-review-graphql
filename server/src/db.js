// Create a connection to the database
import { Pool } from 'pg';
// Use humps library to transition from snake_case style of db to camelCase
import humps from 'humps';

const pool = new Pool({
  host: 'localhost',
  database: 'sherpabook'
});

// Add logging to follow sql statements, parameters
function logQuery(sql, params) {
  console.log('Begin-----------------');
  console.log('SQL:', sql);
  console.log('PARAMS:', JSON.stringify(params));
  console.log('End-------------------');
}

// Create function to execute all sql statements
async function query(sql, params) {
  // Grab database connection from the existing database pool
  const client = await pool.connect();

  //   Insert logQuery function (optimization test)
  logQuery(sql, params);

  try {
    const result = await client.query(sql, params);
    const rows = humps.camelizeKeys(result.rows);
    return { ...result, rows };
  } catch (error) {
    console.log(error);
  } finally {
    // Put database connection back into the pool so it can be used again
    client.release;
  }
}
// Using query rather than pool ensures database connection pool won't be drained
export default query;
