import { allBooks } from './book';

const resolvers = {
  Book: {
    title: book => {
      return `${book.title} (from resolver)`;
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
