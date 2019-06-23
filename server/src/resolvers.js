import { allBooks, imageUrl } from './book';
import { authorsByBookId } from './author';

const resolvers = {
  Book: {
    // ratingCount: book => book.rating_count
    imageUrl: (book, { size }) => imageUrl(size, book.googleId),
    authors: book => authorsByBookId(book.id)
  },
  Query: {
    books: () => {
      // To keep Graphql layer thin, have resolvers call business-logic layer or data-access layer.
      return allBooks();
    }
  }
};

export default resolvers;
