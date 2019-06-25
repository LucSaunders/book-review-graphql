import React, { Component } from 'react';
import * as R from 'ramda';
import { BookListSection, SORT_BY } from './components/Book';
import Error from './components/Error';
import { RecentReviewSection } from './components/Review';
import data from './data/';
import fetch from './fetch';

const query = `
fragment Book on Book {
  id
  title
  description
  rating
}
fragment Review on Review {
  id
  title
  rating
  comment
  user {
    name
  }
}
query Home($orderBy: BooksOrderBy!) {
  reviews {
    ...Review
    book {
      ...Book
      imageUrl(size: SMALL)
    }
  }
  books (orderBy: $orderBy) {
    ...Book
    imageUrl
    authors {
      name
    }
  }
}
`;

class Home extends Component {
  state = {
    books: [],
    reviews: [],
    orderBy: R.pipe(
      R.keys,
      R.head
    )(SORT_BY),
    errors: []
  };
  componentDidMount() {
    this.loadData();
  }
  async loadData() {
    try {
      // TODO: query actual books and reviews from graphql
      // const books = data.books;
      // const reviews = data.reviews;
      // const errors = [];
      // Pull out orderBy value from current state so it can be used in query
      // eslint-disable-next-line
      const { orderBy } = this.state;
      const variables = { orderBy };
      const result = await fetch({ query, variables });
      // const books = result.data.books;
      // const reviews = result.data.reviews;
      // Use ramda function 'path' to access deeply nested value, to prevent runtime error if result or data isn't an object
      const books = R.path(['data', 'books'], result);
      const reviews = R.path(['data', 'reviews'], result);
      // call ramda's 'pathOr' function, which allows specification of default value if the nested path value isn't found.
      const errorList = R.pathOr([], ['errors'], result);
      // Transform error function to error message
      const errors = R.map(error => error.message, errorList);
      this.setState({
        books,
        reviews,
        errors
      });
    } catch (error) {
      this.setState({ errors: [error.message] });
    }
  }
  handleOrderBy = async orderBy => {
    this.setState({ orderBy }, () => {
      this.loadData();
    });
  };
  render() {
    return (
      <div className='cf black-80 mv2'>
        <Error errors={this.state.errors} />
        <BookListSection {...this.state} handleOrderBy={this.handleOrderBy} />
        <RecentReviewSection {...this.state} />
      </div>
    );
  }
}

export default Home;
