/** @format */

import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { StoreProvider } from './src/context/StoreContext';
import Route from './src/route';

const link = new HttpLink({
	uri: `http://192.168.43.33:4000/graphql/inkmarket`
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
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
