/** @format */

import * as React from 'react';
import { Container, Button, Icon, Item, Input } from 'native-base';
import HeaderComponent from '../../../components/Header';
import Badge from '../../../components/Badge';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Portada from '../../../components/Portada';
import ListItens from '../../../components/ListItens';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/core';
import gql from 'graphql-tag';
import CustomList from '../../../components/CustomList';
import Carousel from '../../../components/Carousel';

export interface ShopingProps {
	navigation: any;
	route: any;
}

const query = gql`
	query($category: String!, $limit: Int!, $after: String) {
		products(category: $category, limit: $limit, after: $after) {
			sku
			name
			description
			quantity
			price
			uri
			unidad_media
			observers
		}
	}
`;

type category = {
	_uid: string;
	uri: string;
	title: string;
	description: string;
};

const getCategoria = gql`
	{
		categories {
			_uid
			uri
			title
			description
		}
	}
`;

const Shoping: React.SFC<ShopingProps> = props => {
	const { navigation, route } = props;
	const [count, setCount] = React.useState(0);

	const [pedido, setPedido] = React.useState();
	const isDrawerOpen = useIsDrawerOpen();
	const [searText, setText] = React.useState('');
	//console.log('pedido home', pedido);
	useFocusEffect(
		React.useCallback(() => {
			console.log('inngreso');
			return () => {
				console.log('salio');
				setPedido(setText(''));
			};
		}, [])
	);

	console.log(route);

	if (!route.params) {
		return null;
	}

	return (
		<Container style={{ backgroundColor: '#E9EEE8' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'md-arrow-round-back',
					iconType: 'Ionicons',
					actions: () => navigation.navigate('ProductsClie')
				}}
				background='white'
				title={route.params.title.toLowerCase()}
				badge={
					<Button
						transparent
						onPress={() => {
							if (count === 0) {
								alert(
									'Canasta vacia. !Por favor ingrese productos a su canasta!'
								);
								return;
							}
							// navigation.navigate('Screens', {
							// screen: 'confirOrders',
							// params: pedido
							// });
							navigation.jumpTo('confirOrders', pedido);
							// navigation.navigate('confirOrders', pedido);
							// console.log(pedido);
							// alert(JSON.stringify(pedido));
						}}>
						<Badge count={count}>
							<Icon
								style={{ color: '#000000' }}
								type='AntDesign'
								name='shoppingcart'
							/>
						</Badge>
					</Button>
				}
			/>

			<View
				style={
					isDrawerOpen
						? styles.inputDrawer
						: { padding: 10, backgroundColor: '#77A765' }
				}>
				<Item style={{ backgroundColor: '#fff' }} rounded>
					<Icon name='ios-search' />
					<Input value={searText} onChangeText={setText} placeholder='Search' />
					<Icon name='carrot' type='FontAwesome5' />
				</Item>
			</View>
			{/* <Portada
				styleRoot={
					isDrawerOpen ? styles.portadaDrawer : { width: '100%', height: 190 }
				}
				title={route.params.title}
				description={route.params.description}
				uri={route.params.uri}
			/> */}
			<View style={{ flex: 1 }}>
				<ListItens
					search={searText}
					setPedido={setPedido}
					query={query}
					setCountPedido={setCount}
					category={route.params._uid}
				/>
			</View>

			<View style={{ height: 160 }}>
				<CustomList
					query={getCategoria}
					resolve='categories'
					renderIten={(data: [category]) => (
						<View style={{ padding: 0 }}>
							<Carousel
								style='stats'
								title='Categorias'
								auto
								delay={4000}
								bulledPosition={{ top: 0, justifyContent: 'flex-end' }}
								PerInterval={3}
								items={data}
								renderItem={(data: category) => (
									<TouchableOpacity>
										<View
											style={{
												paddingTop: 8,
												width: 120
												//width: '100%'
											}}>
											<Portada title={data.title} uri={data.uri} />
										</View>
									</TouchableOpacity>
								)}
							/>
						</View>
					)}
				/>
			</View>
		</Container>
	);
};

const styles = StyleSheet.create({
	inputDrawer: {
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,
		backgroundColor: '#1A2138',
		width: '50%'
	},

	portadaDrawer: {
		width: '50%',
		height: 200,
		flex: 0
	},

	drawerHeader: {
		backgroundColor: '#1A2138',
		height: 70,
		width: '100%'
	},

	categoryDrawer: {
		flex: 1,
		width: '50%'
	},

	rightDrawer: {
		//marginLeft: -20,
		marginLeft: 40,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	}
});

export default Shoping;
