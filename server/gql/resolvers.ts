import { createWriteStream, unlinkSync, existsSync, mkdirSync } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import { Readable, ReadableOptions } from 'stream';
import { MergeInfo } from 'apollo-server-express';
import { GraphQLResolveInfo } from 'graphql';
import { join } from 'path';
import { rootDir } from '../src/app.js';

const singleUpload: IResolver<FileUpload, singleUploadResult> = async (
	parent,
	{ file }
) => {
	const { createReadStream, filename } = await file;

	const stream = createReadStream();
	const directory = 'public/uploads';

	const path = join(rootDir, directory);
	const filePath = join(path, filename);
	const urlPath = join(directory, filename);

	if (!existsSync(path)) {
		console.log('path doesnt exist, creating');
		mkdirSync(path);

		console.log('path created');
	}

	return new Promise((resolve, reject) =>
		stream
			.on('error', error => {
				unlinkSync(path);
				stream.destroy();
				reject({
					success: false,
					message: error,
				});
			})
			.pipe(createWriteStream(filePath))
			.on('finish', () => {
				resolve({
					url: `http://localhost:5050/${urlPath}`,
					success: true,
					message: 'Successfully Uploaded!',
				});
			})
	);
};

// Add resolver for Upload
const resolvers = {
	Upload: GraphQLUpload,
	Mutation: {
		singleUpload,
	},
};

export default resolvers;

type MyContext = {
	user: null | { userName: string };
};

interface IResolver<Args, Return> {
	(
		parent: any,
		args: Args,
		context: MyContext,
		info: GraphQLResolveInfo & {
			mergeInfo: MergeInfo;
		}
	): Return | Promise<Return>;
}

interface FileUpload {
	file: Promise<{
		filename: string;
		mimetype: string;
		encoding: string;
		createReadStream: (options?: ReadableOptions) => Readable;
	}>;
}

interface singleUploadResult {
	url?: string;
	success: boolean;
	message: string;
}
