/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface OrdersProps {
	navigation: any;
}

const Orders: React.SFC<OrdersProps> = props => {
	// recuperamos los datos de los pramametros
	const { navigation } = props;

	//debug
	console.log(navigation);
	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>Vista de ordenes</Text>
		</Container>
	);
};

export default Orders;
