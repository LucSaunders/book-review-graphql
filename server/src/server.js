import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { makeExecutableSchema } from 'graphql-tools';
import { graphql } from 'graphql';

const typeDefs = `
schema {
  query: Query
}
type Query {
  hello: String
  name: String
}
`;

const resolvers = {
  Query: {
    hello: () => 'World',
    name: () => 'Luc'
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

// Enable use of middleware.
// Call cors middleware function to add cross-origin recourse-sharing support to the http server.
app.use(cors());

// Set up routing rule for single graphql endpoint, so when http requests arrive at the /graphql url, the following middleware will handle the request.
app.use(
  '/graphql',
  bodyParser.json(),
  // Schema must be passed into graphqlExpress
  graphqlExpress({ schema })
);

// Set up graphiql
app.use(
  '/graphiql',
  // graphiqlExpress middleware requires config object with property of endpointURL
  graphiqlExpress({ endpointURL: '/graphql' })
);

// Set port with callback to direct to graphiql queries.
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries.');
});
