// Create book file to use as data-access layer
const books = [
  {
    id: 1,
    title: 'some book title',
    description: 'some book description',
    imageUrl: 'img.png',
    rating: 5
  }
];

export function allBooks() {
  // TODO: Query books from db
  return books;
}
