const express = require('express');
// create ApolloServer instance 
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// use authMiddleware to connect to graphql
const { authMiddleware } = require('./utils/auth');
// get typeDefs and resolvers from the schemas dir
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();
// create new ApolloServer with typeDefs, resolvers and authMiddleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
}

// Call the async function to start the server
startApolloServer();