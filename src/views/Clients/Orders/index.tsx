/** @format */

import * as React from 'react';
import { Text, View, Container, Card } from 'native-base';
import { ScrollView, Image, RefreshControl } from 'react-native';
import HeaderComponent from '../../../components/Header';
import CustomList from '../../../components/CustomList';
import gql from 'graphql-tag';
import { FlatList } from 'react-native-gesture-handler';
import formatMoney from '../../../utils/utils';
import { StoreContext } from '../../../context/StoreContext';

export interface OrdersProps {
	navigation: any;
}

const query = gql`
	query($_uid: String!) {
		order(_uid: $_uid) {
			_uid
			products {
				product {
					sku
					name
					price
					unidad_media
					uri
				}
				quantity
				price
			}
			price_total
			quantity_total
			state
		}
	}
`;

const Orders: React.SFC<OrdersProps> = props => {
	const { navigation } = props;

	const { state } = React.useContext(StoreContext);

	console.log('userHome', state.user);

	return (
		<Container>
			<HeaderComponent
				leftActions={{
					iconName: 'md-arrow-round-back',
					iconType: 'Ionicons',
					actions: () => navigation.navigate('HomeClie')
				}}
				background='white'
				title='Cesta de pedidos'
				rightItems={[]}
			/>

			<CustomList
				query={query}
				resolve='order'
				variables={{
					_uid: state.userToken
				}}
				renderIten={(data, { onRefresh, refreshing }) => (
					<ScrollView
						style={{ flex: 1 }}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}>
						<View style={{ padding: 10 }}>
							{data.map((ele: any, index: number) => (
								<Card key={index} style={{ elevation: 3, padding: 10 }}>
									<View>
										{/* <FlatList
											style={{ padding: 5 }}
											horizontal
											key={ele._uid}
											ItemSeparatorComponent={() => (
												<View style={{ width: 10 }}></View>
											)}
											data={ele.products}
											keyExtractor={(item: any, index) => index.toString()}
											renderItem={({ item, index }) => (
												<View style={{ width: 100 }}>
													<View
														style={{
															height: 50,
															width: '100%'
														}}>
														<Image
															style={{ resizeMode: 'contain', height: 50 }}
															source={{ uri: item.product.uri }}></Image>
													</View>
													<View style={{ marginTop: 5 }}>
														<Text
															numberOfLines={1}
															style={{ fontSize: 10 }}
															note>
															{item.product.name}
														</Text>
														<Text
															numberOfLines={1}
															style={{ fontSize: 10 }}
															note>
															PEN {formatMoney(item.product.price)} x
															{item.product.unidad_media}
														</Text>
													</View>
												</View>
											)}></FlatList> */}
									</View>
									<View style={{ flexDirection: 'row', marginTop: 10 }}>
										<View style={{ width: '70%' }}>
											<Text note>codigo: {ele._uid}</Text>
											<Text note>
												Precio Total: PEN {formatMoney(ele.price_total)}
											</Text>
											<Text note>Cantidad: {ele.quantity_total}</Text>
										</View>
										<View
											style={{
												width: '30%',
												justifyContent: 'flex-end'
											}}>
											<Text
												style={{
													color: 'red',
													fontWeight: 'bold',
													width: '100%',
													textAlign: 'right'
												}}>
												{ele.state ? 'CANCELADO' : 'PENDIENTE'}
											</Text>
										</View>
									</View>
								</Card>
							))}
						</View>
					</ScrollView>
				)}
			/>
		</Container>
	);
};

export default Orders;
