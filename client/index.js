import React from 'react';
import ReactDOM from 'react-dom';
//interact with graphql server from backend
//frontend for rendering library
//get data rom server and locl
import ApolloClient from 'apollo-client';
//integration btw react nd server side
import { ApolloProvider } from "react-apollo";

import SongsList from './components/SongsList';
const client = new ApolloClient({});
console.log('client',client);
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongsList />
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root'));
