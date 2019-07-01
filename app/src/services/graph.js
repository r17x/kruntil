import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const configLink = {
  uri: process.env.REACT_APP_GRAPH_API,
}

export default new ApolloClient({
  link: new HttpLink(configLink),
  cache: new InMemoryCache(),
})
