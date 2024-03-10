const express = require('express');
const models = require('./models');
//const expressGraphQL = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP;

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Replace with your mongoLab URI
// const MONGO_URI = 'mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/?retryWrites=true&w=majority';
//const MONGO_URI = 'mongodb+srv://aditi:NruNqUTV1OPMxTvN@cluster0.v364j.mongodb.net/lyricaldb?retryWrites=true&w=majority';
const MONGO_URI = `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@cluster0.v364j.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`;

// if (!MONGO_URI) {
//   throw new Error('You must provide a MongoLab URI');
// }

//mongoose.Promise = global.Promise;
// mongoose.connect(MONGO_URI);
// mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen({ port: 3000 }, () => {
          console.log('Your Apollo Server is running on port 3000')
      })
    })
    // .error(() => {
    //     console.error('Error while connecting to MongoDB');
    // });


app.use(bodyParser.json());
console.log("aditi");
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
