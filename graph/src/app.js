require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const schema = require("./schema");

const PORT = process.env.PORT || process.argv[2] || 3000;

const server = new GraphQLServer({
  schema
});

const context = req => ({
  request: req.request
});

server.context = context;

const options = {
  port: PORT,
  endpoint: "/graphql",
  playground: "/",
  defaultPlaygroundQuery: ` `
};

server
  .start(options)
  .then(() => {
    console.log("Server is running on port " + PORT);
  })
  .catch(reason => {
    console.log(reason);
  });
