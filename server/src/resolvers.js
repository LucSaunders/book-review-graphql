import { allBooks, imageUrl } from './book';
import { authorsByBookId } from './author';

const resolvers = {
  Book: {
    // ratingCount: book => book.rating_count
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),

    // Pass in context property from server.js file to share stateful values with resolvers
    authors: (book, args, context) => {
      // Use destructuring to unpack loaders object from context
      const { loaders } = context;
      const { findAuthorsByBookIdsLoader } = loaders;

      // Resolvers can return promises
      return findAuthorsByBookIdsLoader.load(book.id);
      //  authorsByBookId(book.id)
    }
  },
  Query: {
    books: () => {
      // To keep Graphql layer thin, have resolvers call business-logic layer or data-access layer.
      return allBooks();
    }
  }
};

export default resolvers;
