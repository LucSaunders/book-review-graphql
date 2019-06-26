import gravatar from 'gravatar';
import { allBooks, imageUrl, findBookById, searchBook } from './book';
import { authorsByBookId } from './author';
import { allReviews, createReview } from './review';

const resolvers = {
  User: {
    //  Use gravatar for user photos
    imageUrl: (user, args) => gravatar.url(user.email, { s: args.size })
  },
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
    },
    reviews: (book, args, context) => {
      const { loaders } = context;
      const { findReviewsByBookIdsLoader } = loaders;
      return findReviewsByBookIdsLoader.load(book.id);
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
      return allReviews(args);
    },
    book: (root, args, context) => {
      // Use existant findBooksByIdsLoader in Review's book property (caches the query)
      const { loaders } = context;
      const { findBooksByIdsLoader } = loaders;
      return findBooksByIdsLoader.load(args.id);
    },
    searchBook: (root, args) => {
      const { query } = args;
      return searchBook(query);
    }
  },
  SearchBookResult: {
    imageUrl: (result, args) => imageUrl(args.size, result.id)
  },
  Mutation: {
    createReview: (root, args) => {
      const { reviewInput } = args;
      return createReview(reviewInput);
    }
  }
};

export default resolvers;
