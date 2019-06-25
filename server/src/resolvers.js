import { allBooks, imageUrl, findBookById } from './book';
import { authorsByBookId } from './author';
import { allReviews } from './review';

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
  Review: {
    book: (review, args, context) => {
      // findBookById(review.bookId)
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(review.bookId);
    },
    user: (review, args, context) => {
      const { loaders } = context;
      const { findUsersByIdsLoader } = loaders;
      return findUsersByIdsLoader.load(review.userId);
    }
  },
  Query: {
    books: (root, args) => {
      // To keep Graphql layer thin, have resolvers call business-logic layer or data-access layer.
      return allBooks(args);
    },
    reviews: (root, args) => {
      allReviews(args);
    },
    book: (root, args, context) => {
      // Use existant findBooksByIdsLoader in Review's book property (caches the query)
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(args.id);
    }
  }
};

export default resolvers;
