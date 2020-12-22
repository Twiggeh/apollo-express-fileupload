import React from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	link: createUploadLink({ uri: 'http://localhost:5050/graphql' }),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.tsx</code> and save to reload.
					</p>
					<Input></Input>
				</header>
			</div>
		</ApolloProvider>
	);
}

export default App;
