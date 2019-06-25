import { findBooksByIdsLoader } from './book';
import { findAuthorsByBookIdsLoader } from './author';
import { findUsersByIdsLoader } from './user';
import { findReviewsByBookIdsLoader } from './review';

export default () => ({
  findBooksByIdsLoader: findBooksByIdsLoader(),
  findAuthorsByBookIdsLoader: findAuthorsByBookIdsLoader(),
  findUsersByIdsLoader: findUsersByIdsLoader(),
  findReviewsByBookIdsLoader: findReviewsByBookIdsLoader()
});
