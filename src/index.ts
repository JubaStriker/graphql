import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { db } from './db.js';

const typeDefs = `#graphql

  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Product {
    id: ID!
    name: String
    image: String
    description: String
    price: Float
    quantity: Int
    onStock: Boolean
    category: String
  }

  type Query {
    products: [Product]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
        products: () => db?.products,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);