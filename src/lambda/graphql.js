// src/lambda/graphql.js
const { ApolloServer, gql } = require("apollo-server-lambda");
import { books, products } from "./_db.js";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    description: String
  }

  type Product {
    id: ID!
    name: String
    price: String
  }

  type Query {
    books: [Book]
    products: [Product]
    product(id: ID!): Product
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    products: () => products,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
