import express from 'express';
import { dirname, join, resolve } from 'path';
import { ApolloServer } from 'apollo-server-express';
import { config } from 'dotenv';
import typeDefs from '../gql/types.js';
import resolvers from '../gql/resolvers.js';
config();

import { graphqlUploadExpress } from 'graphql-upload';
import { URL } from 'url';

const __dirname = dirname(new URL(import.meta.url).pathname);
export const rootDir = resolve(__dirname, '../');

const app = express();

const gqlServer = new ApolloServer({
	uploads: false,
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		return {};
	},
});

// apply graphql-upload before applyMiddleware
app.use(graphqlUploadExpress());

gqlServer.applyMiddleware({ app });

app.disable('x-powered-by');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/public/*', (req, res) => {
	res.sendFile(join(rootDir, req.url));
});

app.listen(5050, () => {
	console.log(`Dev server is listening on port ${5050}`);
});
