const { mergeTypes, fileLoader } = require("merge-graphql-schemas");
const path = require("path");

const typesArray = fileLoader(path.join(__dirname, "**/*.graphql"), {
  recursive: true
});

module.exports = mergeTypes(typesArray);
