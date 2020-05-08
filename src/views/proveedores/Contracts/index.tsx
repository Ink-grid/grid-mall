/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface ContrartsProps {
	navigation: any;
}

const Contrarts: React.SFC<ContrartsProps> = props => {
	const { navigation } = props;
	// debug
	console.log(navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>vista de contratos</Text>
		</Container>
	);
};

export default Contrarts;
