import { ApolloServer } from "apollo-server-micro";
import { typeDefs, resolvers } from "../../graphql/schema";
import type { NextApiRequest, NextApiResponse } from "next";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = apolloServer.start();

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(request, response);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
