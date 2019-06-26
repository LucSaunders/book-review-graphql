import query from './db';
import DataLoader from 'dataloader';
import { groupBy, map } from 'ramda';

// Create variable at module level to be used for review sort in allReviews()
const ORDER_BY = {
  ID_DESC: 'id desc',
  ID_ASC: 'id asc'
};

async function findReviewsByBookIds(ids) {
  const sql = `
  select *
  from sb.review
  where book_id = ANY($1)
  order by id;
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);
    const rowsById = groupBy(review => review.bookId, result.rows);
    return map(id => rowsById[id], ids);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function findReviewsByBookIdsLoader() {
  return new DataLoader(findReviewsByBookIds);
}

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

export async function createReview(reviewInput) {
  const { bookId, email, name, rating, title, comment } = reviewInput;
  // Call postgres function sb.create_review, defined in schema.sql (takes 6 parameters)
  const sql = `
  select * from sb.create_review($1, $2, $3, $4, $5, $6);
  `;
  // Create variable to hold all 6 params
  const params = [bookId, email, name, rating, title, comment];
  try {
    const result = await query(sql, params);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
