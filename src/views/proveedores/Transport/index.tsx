/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface TransportProps {
	navigation: any;
}

const Transport: React.SFC<TransportProps> = props => {
	const { navigation } = props;

	// debug
	console.log(navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>vista de transporte</Text>
		</Container>
	);
};

export default Transport;
