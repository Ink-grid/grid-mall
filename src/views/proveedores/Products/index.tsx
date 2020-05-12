/** @format */

import * as React from 'react';
import { Container, Text, View,Card } from 'native-base';
import HeaderComponent from '../../../components/Header';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import CustomList from '../../../components/CustomList';

export interface ProductsProps {
	navigation: any;
	// n parametos que puede recibir esta vista

}
type Productos= {
	sku: string;
    name: string;
    quantity: number;
    description: string;
    price: number;
    unidad_media: string;
    uri: string;
}
//se crea la consulta 
const getProductos =  gql ` {
	getProductsAll {
	  sku
	  name
	  quantity
	  description
	  price
	  unidad_media
	  uri 
	}
  } `

const Products: React.SFC<ProductsProps> = props => {
	// recuperamos los datos de los props
	const { navigation } = props;
	
	// debug
	console.log(navigation);

	return (
		<Container style={{ backgroundColor: 'gray' }}>
			<HeaderComponent
			
				leftActions={{
					iconName: 'arrowleft',
					iconType: 'AntDesign',
					actions: () => navigation.goBack()
				}}
				background='gray'
				title='Lista de Productos'
				rightItems={[
					{
						iconName: 'search1',
						iconType: 'AntDesign',
						actions: () => navigation.goBack()    //Solo por llenaer
					},
					{
						iconName: 'pluscircleo',
						iconType: 'AntDesign',
						actions: () => navigation.goBack()    //Solo por llenaer
					}
				]}
			/>
			
			<Text
				onPress={() => navigation.navigate('Logout')}
				style={{ color: 'black' }}>
				Compras
			</Text>
			<CustomList
			query={getProductos}
			resolve='getProductsAll'
			renderIten={(data:[Productos]) => (
				<View>
					{data.map((elemento, index) => (
						<Card key={index}>
							<Text>{elemento.name}</Text>
							<Text>{elemento.description}</Text>
							<Text>{elemento.quantity}</Text>
							<Text>{elemento.price}</Text>
							<Text>{elemento.unidad_media}</Text>
							<Text>{elemento.uri}</Text>
						</Card>
					))}
				</View>
			)}/>
		</Container>
	);
};

export default Products;
