const { makeExecutableSchema } = require("graphql-tools");

const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers
});
