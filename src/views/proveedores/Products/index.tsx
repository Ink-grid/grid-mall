/** @format */

import * as React from 'react';
import { Container, Text, View, Card, Button, Icon } from 'native-base';
import HeaderComponent from '../../../components/Header';
import gql from 'graphql-tag';
import CustomList from '../../../components/CustomList';
import formatMoney from '../../../utils/utils';
import { Image, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface ProductsProps {
	navigation: any;
	// n parametos que puede recibir esta vista
}
type Productos = {
	sku: string;
	name: string;
	quantity: number;
	description: string;
	price: number;
	unidad_media: string;
	uri: any;
};
//se crea la consulta
const getProductos = gql`
	{
		getProductsAll {
			sku
			name
			quantity
			description
			price
			unidad_media
			uri
		}
	}
`;

const Products: React.SFC<ProductsProps> = props => {
	// recuperamos los datos de los props
	const { navigation } = props;

	// debug
	console.log(navigation);

	return (
		<Container style={{ backgroundColor: 'E9EEE8' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'arrowleft',
					iconType: 'AntDesign',
					actions: () => navigation.goBack()
				}}
				background='white'
				title='Lista de Productos'
				rightItems={[
					{
						iconName: 'search1',
						iconType: 'AntDesign',
						actions: () => navigation.goBack() //Solo por llenaer
					}
				]}
			/>
			{/* //[*] envolvemos el CustomList en un scrollciew para obtener un efecto de
			deslizamiento saber mas -> https://reactnative.dev/docs/scrollview */}

			<ScrollView>
				{/* //[*] recuperamos los datos del servidor */}
				<CustomList
					query={getProductos}
					resolve='getProductsAll'
					renderIten={(data: [Productos]) => (
						<View>
							{data.map((elemento, index) => (
								// creamos el template para mostrar los productos
								<Card
									style={{ elevation: 3, flexDirection: 'row' }}
									key={index}>
									<View
										style={{
											width: '30%',
											padding: 1,
											borderRightColor: '#E3E8E5',
											borderRightWidth: 1
										}}>
										<Image
											style={{ height: 100, resizeMode: 'contain' }}
											source={{
												uri: elemento.uri
											}}></Image>
									</View>
									<View style={{ padding: 5 }}>
										<Text style={{ fontSize: 8 }} note>
											sku: {elemento.sku}
										</Text>
										<Text>
											Nombre: <Text note>{elemento.name}</Text>
										</Text>
										<Text>
											Cantidad:{' '}
											<Text note>
												{elemento.quantity} {elemento.unidad_media}{' '}
											</Text>
										</Text>
										<Text>
											Precio:{' '}
											<Text note>
												PEN {formatMoney(elemento.price * elemento.quantity)}
											</Text>
										</Text>
									</View>
								</Card>
							))}
						</View>
					)}
				/>
			</ScrollView>

			{/* [*] agregamos el button de agreagar producto */}
			<View
				style={{
					position: 'absolute',
					bottom: 30,
					right: 30
				}}>
				<TouchableOpacity onPress={() => alert('ingresar nuevo producto')}>
					<View
						style={{ padding: 10, backgroundColor: 'gray', borderRadius: 10 }}>
						<Icon
							style={{ fontSize: 50, color: '#fff' }}
							name='md-add'
							type='Ionicons'></Icon>
					</View>
				</TouchableOpacity>
			</View>
		</Container>
	);
};

export default Products;
