const _ = require('lodash');
const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query_type');
const mutations = require('./mutations');
console.log("inside schema")
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
});
