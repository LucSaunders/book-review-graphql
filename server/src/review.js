import query from './db';

export async function allReviews() {
  const sql = `
    select * from sb.review;`;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (error) {
    console.log(err);
    throw err;
  }
}
