/** @format */

import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Card, CardItem, Text, Left, Body, Icon } from 'native-base';

export interface DetallesProps {}

const Detalles: React.SFC<DetallesProps> = () => {
	return (
		<View>
			<FlatList
				style={{ padding: 5 }}
				numColumns={2}
				key='ofertsList'
				ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
				data={[
					{
						days: 'lunes'
					},
					{
						days: 'Martes'
					},
					{
						days: 'Miercoles'
					},
					{ days: 'Jueves' },
					{ days: 'Viernes' },
					{ days: 'Sabado' },
					{ days: 'Domingo' }
				]}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<Card key={index} style={{ elevation: 3, width: '50%' }}>
						<CardItem>
							<Left>
								<Body>
									<Text style={{ fontWeight: 'bold', fontSize: 15 }}>
										{item.days}
									</Text>
									<Text note>Ingredientes</Text>
								</Body>
							</Left>
						</CardItem>
						<CardItem cardBody>
							<View style={{ padding: 10 }}>
								{[2, 3, 4, 5, 6].map((ele, index) => (
									<View
										key={index}
										style={{
											width: 180,
											flexDirection: 'row',
											justifyContent: 'space-between'
										}}>
										<Text note>papa dorada </Text>
										<Text note>2Kg</Text>
									</View>
								))}
							</View>
						</CardItem>
					</Card>
				)}
			/>
		</View>
	);
};

export default Detalles;
