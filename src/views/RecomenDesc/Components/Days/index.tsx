/** @format */

import * as React from 'react';
import {
	Card,
	CardItem,
	Left,
	Body,
	Text,
	Icon,
	Right,
	Thumbnail
} from 'native-base';
import { View } from 'react-native';

export interface DaysProps {
	day: string;
}

const Days: React.SFC<DaysProps> = props => {
	const { day } = props;
	return (
		<Card style={{ elevation: 3 }}>
			<CardItem>
				<Left>
					<Thumbnail
						source={{
							uri:
								'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/28/0e/para-compartir.jpg'
						}}
					/>
					<Body>
						<Text style={{ fontWeight: 'bold', fontSize: 15 }}>{day}</Text>
						<Text note>
							<Icon
								type='SimpleLineIcons'
								name='people'
								style={{ fontSize: 15 }}
							/>{' '}
							4 personas
						</Text>
					</Body>
				</Left>
			</CardItem>
			<CardItem cardBody>
				<View style={{ padding: 10 }}>
					<View>
						<Text>
							<Icon type='MaterialCommunityIcons' name='food' /> Desayuno:
						</Text>
						<View
							style={{
								marginLeft: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: 350
							}}>
							<Text note>Pollo a la plancha con arroz.</Text>
							<Text note>PEN 30</Text>
						</View>
					</View>
					<View>
						<Text>
							<Icon type='MaterialCommunityIcons' name='food-variant' />{' '}
							Almuerzo:
						</Text>
						<View
							style={{
								marginLeft: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: 350
							}}>
							<Text note>Pollo a la plancha con arroz.</Text>
							<Text note>PEN 30</Text>
						</View>
					</View>
					<View>
						<Text>
							<Icon type='MaterialCommunityIcons' name='food-fork-drink' />{' '}
							Cena:
						</Text>
						<View
							style={{
								marginLeft: 10,
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: 350
							}}>
							<Text note>Pollo a la plancha con arroz.</Text>
							<Text note>PEN 30</Text>
						</View>
					</View>
				</View>
			</CardItem>
			<CardItem style={{ justifyContent: 'flex-end' }}>
				<Text note>Total: PEN 90.00</Text>
			</CardItem>
		</Card>
	);
};

export default Days;
