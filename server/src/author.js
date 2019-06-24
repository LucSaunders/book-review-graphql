// Bring in Ramda functions
// Ramda favors functional programming
import { groupBy, map } from 'ramda';

// Bring in DataLoader, which performs per request batch & cache queries (within single graphql request)
// DataLoader is not a replacement for cacheing with Redis or Memcache
import DataLoader from 'dataloader';

import query from './db';

export async function findAuthorsByBookIds(ids) {
  const sql = `
  select 
  sb.author.*,
  sb.book_author.book_id
  from sb.author inner join sb.book_author
    on sb.author.id = sb.book_author.author_id
  where sb.book_author.book_id = ANY($1);
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);
    // Call Ramda's groupBy function: pass 1) author.bookId (new column), 2) the array to be grouped (result.rows)
    const rowsById = groupBy(author => author.bookId, result.rows);
    // Call Ramda's map function: pass 1) transformation function, 2) the array to act on (ids)
    return map(id => rowsById[id], ids);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function findAuthorsByBookIdsLoader() {
  // Return new instance of DataLoader, passing it the function that should be called with the batched ids.
  return new DataLoader(findAuthorsByBookIds);
}

export async function authorsByBookId(id) {
  const sql = `
  select 
  sb.author.*
  from sb.author inner join sb.book_author
    on sb.author.id = sb.book_author.author_id
  where sb.book_author.book_id = $1;
  `;
  const params = [id];
  try {
    const result = await query(sql, params);
    return result.rows;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
