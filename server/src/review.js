import query from './db';

// Create variable at module level to be used for review sort in allReviews()
const ORDER_BY = {
  ID_DESC: 'id desc',
  ID_ASC: 'id asc'
};

export async function allReviews(args) {
  const orderBy = ORDER_BY[args.orderBy];
  const sql = `
    select * from sb.review
    order by ${orderBy}
    `;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (error) {
    console.log(err);
    throw err;
  }
}
