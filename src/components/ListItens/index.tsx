/** @format */

import * as React from 'react';
import { View, Spinner, Text, Button, Icon } from 'native-base';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Error from '../Error';
import CardItems from './component/CardItems';
import usePedido from './component/pedidos';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDidUpdate from '../useDidUpdate';
//import gql from 'graphql-tag';

export interface ListItensProps {
	query?: any;
	category: string;
	search?: string;
	setCountPedido: React.Dispatch<any>;
	setPedido: React.Dispatch<any>;
}

const ListItens: React.SFC<ListItensProps> = props => {
	const { category, query, setCountPedido, setPedido, search } = props;
	const [count, setCount] = React.useState<any>({});
	const { loading, error, data, fetchMore, refetch } = useQuery(query, {
		variables: {
			category: category,
			limit: 50,
			after: null
		}
		//pollInterval: 1000
	});

	// search items
	const [dataSearch, setData] = React.useState<any>(null);

	const { handleSaveProduct, setProducts, handleRemovebyCantidad } = usePedido(
		setCountPedido,
		setPedido
	);

	useDidUpdate(() => {
		if (data) {
			//let sear = new RegExp(search, 'i')
			if (search!.length === 0) {
				console.log('searc is null');
				setData(null);
				return;
			} else {
				let searc = new RegExp(search!, 'i');
				let item = data.products.filter(
					(e: any) => searc.test(e.name) //.indexOf(search) > -1
				);
				setData(item);
			}
		}
	}, [search]);

	React.useEffect(() => {
		if (data) {
			setProducts(data.products);
			setCount(() => {
				const count: any = {};
				data.products.forEach((product: any) => {
					count[product.sku] = product.quantity;
				});
				return count;
			});
		}
	}, [data]);

	return (
		<View style={{ flex: 1 }}>
			{error && <Error title='Gridmall' />}
			{!loading && data && data.products.length === 0 && (
				<Text note style={{ textAlign: 'center', fontWeight: 'bold' }}>
					No hay productos para mostrar.
				</Text>
			)}
			{!loading &&
				!error &&
				data &&
				data.products.length > 0 &&
				(dataSearch && dataSearch.length === 0 ? (
					<View>
						<Text note style={{ textAlign: 'center' }}>
							no se encontro el producto que buscas
						</Text>
					</View>
				) : (
					<SafeAreaView style={{ flex: 1, marginTop: 20 }}>
						<FlatList
							style={{ marginTop: -20 }}
							key='product'
							numColumns={2}
							keyExtractor={(item, index) => index.toString()}
							data={dataSearch || data.products}
							renderItem={({ item, index }) =>
								item === null ? (
									<View>
										<Text>LOADING...</Text>
									</View>
								) : (
									<CardItems item={item}>
										{item => (
											<>
												<Button
													onPress={() => {
														handleRemovebyCantidad(item.sku);
														if (item.observers <= 0) {
															item.observers = 0;
															return;
														}
														item.observers -= 1;
													}}
													small
													style={{
														backgroundColor: '#77A765',
														borderColor: '#77A765'
													}}>
													<Icon type='Ionicons' name='md-remove' />
												</Button>
												<Text>{item.observers} kg </Text>

												<Button
													onPress={() => {
														if (item.observers >= count[item.sku]) {
															alert('producto agotado');
															return null;
														}
														item.observers += 1;
														setCountPedido((prevs: number) => prevs + 1);
														handleSaveProduct(item.sku);
													}}
													small
													style={{
														backgroundColor: '#77A765',
														borderColor: '#77A765'
													}}>
													<Icon type='Ionicons' name='ios-add' />
												</Button>
											</>
										)}
									</CardItems>
								)
							}
						/>
					</SafeAreaView>
				))}

			{loading && (
				<View>
					<Spinner />
				</View>
			)}
		</View>
	);
};

export default ListItens;
