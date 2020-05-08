/** @format */

import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from './src/context/StoreContext';
import Route from './src/route';

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = new HttpLink({
	uri: `https://cryptic-refuge-32742.herokuapp.com/graphql/inkmarket`
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link: HttpLink.from([errorLink, link]),
	cache
});

export default function App() {
	const [isReady, setReady] = React.useState(false);

	const fontAsync = async () => {
		await Font.loadAsync({
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
		});

		setReady(true);
	};

	React.useEffect(() => {
		fontAsync();
	}, []);

	if (!isReady) {
		return <AppLoading />;
	}

	return (
		<ApolloProvider client={client}>
			<StoreProvider>
				<Route />
			</StoreProvider>
		</ApolloProvider>
	);
}
