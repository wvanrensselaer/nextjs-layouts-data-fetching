import { ApolloClient, InMemoryCache } from "@apollo/client";

export default function createGSSPApolloClient() {
  return new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
    ssrMode: true,
  });
}
