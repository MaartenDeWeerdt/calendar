import express from 'express';
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import mongoose from 'mongoose';

import typeDefs from './schema';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

mongoose.connect('mongodb://localhost/demoDB');

const Task = mongoose.model('Task', { text: String, dayOfMonth: String, month: String, year: String, hours: String, minutes: String });

const PORT = 3000;

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema, context: { Task } }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT);