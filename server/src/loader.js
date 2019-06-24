import { findBooksByIdsLoader } from './book';
import { findAuthorsByBookIdsLoader } from './author';
import { findUsersByIdsLoader } from './user';

export default () => ({
  findBooksByIdsLoader: findBooksByIdsLoader(),
  findAuthorsByBookIdsLoader: findAuthorsByBookIdsLoader(),
  findUsersByIdsLoader: findUsersByIdsLoader()
});
