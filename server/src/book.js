// Create book file to use as data-access layer
import query from './db';

export async function allBooks() {
  const sql = `select * from sb.book`;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
