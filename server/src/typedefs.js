// Every type definition must have a schema type
const typeDefs = `
schema {
    query: Query
    mutation: Mutation
}

# Root query for Sherpa Book Review app
type Query {
    # Books imported by users
    books(
        # Book sort order
        orderBy: BooksOrderBy = RATING_DESC): [Book]
        # Book reviews by users
        reviews(
            # Review sort order
            orderBy: ReviewsOrderBy = ID_DESC): [Review]
            # An individual book
            book(
                # Book id to fetch
                id: ID!): Book
                # Search google books API
    searchBook(
        # Search term
        query: String!): [SearchBookResult]
        # Global app search
        search(
            # Search term
            query: String!): [SearchResult]
}

# Global search result type
union SearchResult =  Book | Review | Author | User  

# A google book api search result
type SearchBookResult implements Entity {
  # Google's unique book id
  id: ID!
  # Book title
  title: String
  # Book description
  description: String
  # Book author(s)
  authors: [String]
  # Book imageUrl
  imageUrl(
    # Size of image to request from google books api/cdn
    size: ImageSize = LARGE
  ): String
}

# Root mutation for Sherpa Book Review app
type Mutation {
    # Create a new book review
    createReview(
        # Book review input object
        reviewInput: ReviewInput!): Review
        # Create book record from a google api book id
        createBook(
            # Google book id of book to add/create
            googleBookId: ID!): Book
}

# Book review input object
input ReviewInput {
    # Id of book being reviewed
    bookId: ID!
    # Book rating 1-5
    rating: Int!
    # User/reviewer name
    name: String!
    # User/reviewer email
    email: String!
    # Review title
    title: String
    # Review comment
    comment: String
}

# Book sort by options
enum BooksOrderBy {
    # Order by highest to lowest rating
    RATING_DESC
    # Order by newest id (ie most recently added book)
    ID_DESC
}

# Book object
type Book implements Entity {
  # Id of book
  id: ID!
  # Book title
  title: String!
  # Book description
  description: String!
  # Book cover image url
  imageUrl(
    # Size of requested image
    size: ImageSize = LARGE
  ): String!
  # Books average rating
  rating: Float
  # Book subtitle
  subtitle: String
  # Total number of rating
  ratingCount: Int
  # Array of book author objects
  authors: [Author]
  # Array of book review objects
  reviews: [Review]
}

# Book Author
type Author implements Entity & Person {
  # Author unique id
  id: ID!
  # Author name
  name: String
}

# Review sort by options
enum ReviewsOrderBy {
    # Order by review id ascending
    ID_ASC
    # Order by review id descending
    ID_DESC
}

# A Book Review
type Review implements Entity {
  # Review unique id  
  id: ID!
  # Review rating 1-5
  rating: Int
  # Review title
  title: String
  # Review comment
  comment: String
  # Book reviewed
  book: Book
  # User leaving the review
  user: User
}

# Book Reviewer/User
type User implements Entity & Person {
  # User unique id
  id: ID!
  # User name
  name: String
  # User image size 
  imageUrl(
    # See [gravatar docs](https://en.gravatar.com/site/implement/images/#size)
    size: Int = 50
  ): String
}

# Book image size options
enum ImageSize {
    SMALL
    LARGE
}

# Enum that forces types to have non-nullable ID
interface Entity {
  id: ID!
}

# A Person forces the type to include a name
interface Person {
  name: String
}
`;
export default typeDefs;
