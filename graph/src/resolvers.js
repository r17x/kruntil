const fs = require("fs");
const axios = require("axios").default;
const queryString = require("query-string");

/**
 * @name getScope
 * @param {String} scope
 * @param {String} method
 * @return {Function} resolvers
 */
function getScope(scope, method = "get") {
  const baseURL = `https://jsonplaceholder.typicode.com`;

  /**
   * @name resolvers
   * @return {Object} response from API Endpoint
   */
  return async function resolvers(parent, args, context, info) {
    let url = `${baseURL}/${scope}`;

    const { id, qargs } = args;

    // handle detail data
    if (id) {
      url = `${url}/${id}`;
    }

    // handle query-string | url params for Endpoint API
    if (qargs || "userId" in args) {
      url = `${url}?${queryString.stringify(qargs ? qargs : args)}`;
    }

    //debugger
    //console.log(args);
    //console.log(url);
    const { data } = await axios[method](url);

    return data;
  };
}

module.exports = {
  Query: {
    users: getScope("users"),
    user: getScope("users"),

    posts: getScope("posts"),
    post: getScope("posts"),

    comments: getScope("comments"),
    comments: getScope("comments"),

    photos: getScope("photos"),
    photo: getScope("photos"),

    albums: getScope("albums"),
    album: getScope("albums")
  },

  User: {
    posts: function(parent) {
      return getScope("posts")(parent, { qargs: { userId: parent.id } });
    },

    albums: function(parent) {
      return getScope("albums")(parent, { qargs: { userId: parent.id } });
    }
  },

  Post: {
    author: function(parent) {
      return getScope("users")(parent, { id: parent.userId });
    },
    comments: function(parent) {
      return getScope("comments")(parent, { qargs: { postId: parent.id } });
    }
  },

  Album: {
    author: function(parent) {
      return getScope("users")(parent, { id: parent.userId });
    },

    photos: function(parent) {
      return getScope("photos")(parent, { qargs: { albumId: parent.id } });
    }
  }
};

