// Create book file to use as data-access layer
import { map, groupBy } from 'ramda';
import DataLoader from 'dataloader';
import query from './db';

async function findBooksByIds(ids) {
  const sql = `
  select *
  from sb.book
  where sb.book.id = ANY($1);
  `;
  const params = [ids];
  try {
    const result = await query(sql, params);

    // Order the values returned, using Ramda's groupBy function
    const rowsById = groupBy(book => book.id, result.rows);
    return map(id => {
      const book = rowsById[id] ? rowsById[id][0] : null;
      return book;
    }, ids);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function findBooksByIdsLoader() {
  return new DataLoader(findBooksByIds);
}

export async function findBookById(id) {
  const sql = `
  select * 
  from sb.book
  where sb.book.id = $1;
  `;
  const params = [id];
  try {
    const result = await query(sql, params);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Create variable at module level to be used for book sort in allBooks()
const ORDER_BY = {
  ID_DESC: 'id desc',
  RATING_DESC: 'rating desc'
};

export async function allBooks(args) {
  const orderBy = ORDER_BY[args.orderBy];
  const sql = `
  select * from sb.book
  order by ${orderBy}
  `;
  try {
    const result = await query(sql);
    return result.rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export function imageUrl(size, id) {
  const zoom = size === 'SMALL' ? 1 : 0;
  return `//books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=${zoom}&source=gbs_api`;
}
