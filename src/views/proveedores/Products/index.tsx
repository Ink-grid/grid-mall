/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface ProductsProps {
	navigation: any;
	// n parametos que puede recibir esta vista
}

const Products: React.SFC<ProductsProps> = props => {
	// recuperamos los datos de los props
	const { navigation } = props;

	// debug
	console.log(navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>list productos</Text>
		</Container>
	);
};

export default Products;
