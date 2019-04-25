import {GraphQLServer, PubSub} from 'graphql-yoga';
import {importSchema} from 'graphql-import';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import prisma from './prisma';

const pubsub = new PubSub();

// typeDefs
const typeDefs = importSchema('./src/schemas/schema.graphql');

const server = new GraphQLServer({
	typeDefs,
	resolvers: {
		Query,
		Mutation
	},
	context(req) {
		return {
			req,
			pubsub,
			prisma
		};
	}
});

server.start(() => {
	console.log('The server is running.');
});
