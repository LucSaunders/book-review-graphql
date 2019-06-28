import query from './db';
import { map } from 'ramda';
import { findUsersByIdsLoader } from './user';
import { authorsByBookId } from './author';

// Create crude placeholder search function
// TODO: Need to dig in further to Postgres search functionality
// and replace this with a more performant, system-friendly search
export async function search(term) {
  const books = await searchBooks(term);
  const users = await searchUsers(term);
  const authors = await searchAuthors(term);
  const reviews = await searchReviews(term);
  return [...books, ...users, ...authors, ...reviews];
}

async function searchBooks(term) {
  const sql = `
    select * from sb.book
    where tokens @@ to_tsquery($1);
    `;
  try {
    const params = [term];
    const result = await query(sql, params);
    // return result.rows;
    return map(obj => ({ ...obj, __type: 'Book' }), result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function searchUsers(term) {
  const sql = `
    select * from sb.user
    where tokens @@ to_tsquery($1);
    `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map(user => ({ ...user, __type: 'User' }), result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function searchAuthors(term) {
  const sql = `
    select * from sb.author
    where tokens @@ to_tsquery($1);
    `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map(author => ({ ...author, __type: 'Author' }), result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function searchReviews(term) {
  const sql = `
    select * from sb.review
    where tokens @@ to_tsquery($1);
    `;
  try {
    const params = [term];
    const result = await query(sql, params);
    return map(review => ({ ...review, __type: 'Review' }), result.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
