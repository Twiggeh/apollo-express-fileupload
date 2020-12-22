import { gql, useMutation } from '@apollo/client';
import React from 'react';

const UPLOAD_FILE = gql`
	mutation singleUpload($file: Upload!) {
		singleUpload(file: $file) {
			success
			message
			url
		}
	}
`;

const Input = () => {
	const [uploadFile] = useMutation(UPLOAD_FILE, {
		onCompleted: data => {
			console.log(data);
		},
	});

	return (
		<input
			type='file'
			onChange={e => {
				if (!e.target?.files?.[0]) return;
				uploadFile({ variables: { file: e.target.files[0] } });
			}}></input>
	);
};

export default Input;
