const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');
const { getTestMessage, setTestMessage } = require('./testMessage.graphql.js');

//mapping graphql query with function
const resolvers = {
  Query: {
    testMessage: getTestMessage,
  },
  Mutation: {
    setTestMessage,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  formatError: error => {
    console.log(error);
    return error;
  },
  playground: true,
//   introspection: true,
});

function installHandler(app) {
  // cors define here

  //apply apollo server
  server.applyMiddleware({
    app,
    path: '/graphql',
  });
}

module.exports = { installHandler };
