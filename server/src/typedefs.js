// Every type definition must have a schema type
const typeDefs = `
schema {
    query: Query
}
type Query {
    books: [Book]
}
type Book {
    id: ID!
    title: String!
    description: String!
    imageUrl: String!
    rating: Float
    subtitle: String
    ratingCount: Int
}
`;
export default typeDefs;
