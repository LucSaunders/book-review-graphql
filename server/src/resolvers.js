import { allBooks } from './book';

const resolvers = {
  Book: {
    // ratingCount: book => book.rating_count
  },
  Query: {
    books: () => {
      // To keep Graphql layer thin, have resolvers call business-logic layer or data-access layer.
      return allBooks();
    }
  }
};

export default resolvers;
