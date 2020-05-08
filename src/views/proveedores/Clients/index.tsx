/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface ClientsProps {
	navigation: any;
}

const Clients: React.SFC<ClientsProps> = props => {
	const { navigation } = props;
	// debug
	console.log(navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>vista de clientes</Text>
		</Container>
	);
};

export default Clients;
