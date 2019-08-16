const API_URL = 'https://nba.rickyg.io/v1/graphql';

import ApolloClient from 'apollo-boost';

let client: ApolloClient<any> | null = null;

export async function getClient() {
  if (client) {
    return client;
  }

  client = new ApolloClient({
    uri:API_URL,
  });

  return client;
}

