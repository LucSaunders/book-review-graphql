import query from './db';

export async function authorsByBookId(id) {
  const sql = `select 
  sb.author.* 
  from sb.author inner join sb.book_author 
  on sb.author.id = sb.book_author.author_id 
  where sb.book_author.book_id = $1;
  `;
  const params = [id];
  try {
    const result = await query(sql, params);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
