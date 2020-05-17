/** @format */

import * as React from 'react';
import { View, Text } from 'react-native';
import { Container } from 'native-base';
import HeaderComponent from '../../../components/Header';
import Category from '../../../components/Category';

export interface ProductsProps {
	navigation: any;
}

const Products: React.SFC<ProductsProps> = props => {
	const { navigation } = props;
	return (
		<Container>
			<HeaderComponent
				leftActions={{
					iconName: 'md-arrow-round-back',
					iconType: 'Ionicons',
					actions: () => navigation.navigate('HomeClie')
				}}
				background='white'
				title='Productos'
				rightItems={[]}
			/>

			<Category
				navigation={navigation}
				flexContainer={{ flex: 1 }}
				title={false}
			/>
		</Container>
	);
};

export default Products;
