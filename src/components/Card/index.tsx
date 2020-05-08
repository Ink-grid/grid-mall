/** @format */

import * as React from 'react';
import {
	Card,
	CardItem,
	Left,
	Thumbnail,
	Body,
	Text,
	Icon,
	Button,
	ActionSheet
} from 'native-base';
import { View, ImageBackground, StyleSheet } from 'react-native';

interface cardsItems {
	image: string;
	text: string;
	name: string;
}

export interface CardComponentProps {
	cardItems: cardsItems;
	navigation?: any;
}

const CardComponent: React.SFC<CardComponentProps> = props => {
	const { cardItems, navigation } = props;
	const optionsActionsAsync = async (index: number) => {
		switch (index) {
			case 0:
				alert('se agregó con exito a sus favoritos');
				break;

			case 1:
				alert('se oculto de su lista');
				break;

			default:
				break;
		}
	};

	const showOptions = (title?: string, uid?: string, index?: number) => {
		const butttonOptions = [
			{ text: 'Agregar a favoritos', icon: 'ios-add-circle' },
			{ text: 'Ocultar', icon: 'ios-eye-off' },
			{ text: 'Cancel', icon: 'close' }
		];
		ActionSheet.show(
			{
				options: butttonOptions,
				cancelButtonIndex: 4,
				title: title
			},
			buttonIndex => {
				optionsActionsAsync(buttonIndex);
			}
		);
	};

	return (
		<View style={{ flex: 1, width: 400 }}>
			<Card style={{ elevation: 3 }}>
				<CardItem>
					<Left>
						<Thumbnail
							source={{
								uri: cardItems.image
							}}
						/>
						<Body>
							<Text>{cardItems.text}</Text>
							<Text note>inkmarket</Text>
						</Body>
					</Left>
					<View
						style={{
							width: 100,
							marginRight: -20,
							alignItems: 'flex-end',
							display: 'flex'
						}}>
						<Icon
							onPress={() => showOptions(cardItems.text)}
							name='more'
							style={{ color: '#1A2130', fontSize: 40 }}
						/>
					</View>
				</CardItem>
				<CardItem cardBody>
					<ImageBackground
						source={{ uri: cardItems.image }}
						style={styles.image}>
						<View style={styles.background}>
							<Text style={styles.description}>{cardItems.name}</Text>
						</View>
					</ImageBackground>
				</CardItem>
				<CardItem
					style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row' }}>
						<Icon name='eye' style={{ color: '#1A2130' }} />
						<Text>100</Text>
					</View>
					<Button
						onPress={() =>
							navigation.navigate('Screens', {
								screen: 'RecomenDesc',
								params: cardItems
							})
						}>
						<Text>comprar</Text>
					</Button>
					<Text>S/. 200.00</Text>
				</CardItem>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 250,
		flex: 1,
		resizeMode: 'cover'
	},
	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	description: {
		color: '#ffff',
		width: 350,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 20
	}
});

export default CardComponent;
