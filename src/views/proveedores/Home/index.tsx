/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface HomeProps {
	navigation: any;
}

const Home: React.SFC<HomeProps> = props => {
	// recuperar los parametros
	const { navigation } = props;

	// degug
	console.log('props home', navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home</Text>
		</Container>
	);
};

export default Home;
