import React from 'react';
import ReactDOM from 'react-dom';
//interact with graphql server from backend
//frontend for rendering library
//get data rom server and locl
import ApolloClient from 'apollo-client';
//integration btw react nd server side
import { ApolloProvider } from "react-apollo";

import SongsList from './components/SongsList';
// import { IndexRoute, hashHistory } from 'react-router';
import App from "./components/App"
// import { BrowserRouter as Router, Routes, Route, Switch} from "react-router-dom";
import { Router, Route, browserHistory, hashHistory, IndexRoute } from 'react-router';
import  SongCreate from "./components/SongCreate"
import "./style/style.css"
import SongDetail from './components/SongDetail';

//want to use id to identify the record
//unique id
//we must need to return id for every record then nd then only we will get id
const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

console.log('client',client);
const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongsList} />
          <Route path="/song/:id" component={SongDetail} />
          <Route path="/song/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root'));
