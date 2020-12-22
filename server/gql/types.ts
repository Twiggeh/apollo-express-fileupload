import { gql } from 'apollo-server-express';

// Add a scalar Upload
const typeDefs = gql`
	scalar Upload
	type Query {
		_empty: String
	}
	type Mutation {
		singleUpload(file: Upload!): singleUploadResult
	}
	type singleUploadResult {
		success: Boolean!
		message: String!
		url: String
	}
`;

export default typeDefs;
