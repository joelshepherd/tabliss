const API_URL = 'https://hu1c0k7001.execute-api.ap-southeast-2.amazonaws.com/dev/graphql';

import ApolloClient from 'apollo-boost';;

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

