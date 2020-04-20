/** @format */

import * as React from 'react';
import {
	Container,
	Header,
	Button,
	Text,
	Left,
	Icon,
	Body,
	Title,
	Right,
	Tabs,
	Tab,
	TabHeading
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import Days from './Components/Days';
import Detalles from './Components/Detalles';
import Factura from './Components/Factura';
import SwiperComponent from '../../components/DeckSwiper';
//import DeckSwipers from '../../components/DeckSwiper';

export interface RecomenDescProps {
	navigation: any;
	route: any;
}

const RecomenDesc: React.SFC<RecomenDescProps> = props => {
	const { navigation, route } = props;
	console.log(route);

	const dataSOrces = [
		{ day: 'lunes' },
		{ day: 'martes' },
		{ day: 'miercoles' }
	];

	return (
		<Container style={{ backgroundColor: '#1A2125' }}>
			<Header
				style={{ backgroundColor: '#1A2138', marginTop: 25 }}
				androidStatusBarColor='#1A2138'>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon type='AntDesign' name='arrowleft' />
					</Button>
				</Left>
				<Body
					style={{
						marginLeft: 20
					}}>
					<Title>{route.params && route.params.text}</Title>
				</Body>
			</Header>
			<View style={{ padding: 4, height: 360 }}>
				<SwiperComponent
					dataSource={dataSOrces}
					renderItem={(item, index) => {
						return <Days day={item.day} key={index} />;
					}}
				/>
			</View>
			<Tabs>
				<Tab
					heading={
						<TabHeading style={{ backgroundColor: '#1A2130' }}>
							<Icon name='list' />
							<Text>Detalle</Text>
						</TabHeading>
					}>
					<View style={{ flex: 1, backgroundColor: 'gray' }}>
						<Detalles />
					</View>
				</Tab>
				<Tab
					heading={
						<TabHeading style={{ backgroundColor: '#1A2130' }}>
							<Icon name='bookmarks' />
							<Text>Comprar</Text>
						</TabHeading>
					}>
					<View style={{ flex: 1, backgroundColor: 'gray', padding: 10 }}>
						<Factura />
					</View>
				</Tab>
			</Tabs>
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5FCFF'
	},
	card: {
		flex: 1,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: '#E8E8E8',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	text: {
		textAlign: 'center',
		fontSize: 50,
		backgroundColor: 'transparent'
	}
});

export default RecomenDesc;
