/** @format */

import * as React from 'react';
import { Container, Text, Card, Button } from 'native-base';
import HeaderComponent from '../../../components/Header';
import gql from 'graphql-tag';
import CustomList from '../../../components/CustomList';
import { View, Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

export interface HomeProps {
	navigation: any;
}

type Category = {
	_uid: string;
	title: string;
	description: string;
};

const Home: React.SFC<HomeProps> = props => {
	// recuperar los parametros
	const { navigation } = props;

	// degug
	console.log('props home', navigation);

	// custon alert
	const AlertCustom = (ok: any) => {
		console.log(ok);
		Alert.alert(
			'Confirmat',
			'Estas seguro de realizar esta acción',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
				//{ text: 'OK', onPress: ok }
			],
			{ cancelable: false }
		);
	};

	return (
		<Container style={{ backgroundColor: 'gray' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'menu',
					iconType: 'Entypo',
					actions: () => navigation.openDrawer()
				}}
				background='purple'
				title='GridMall'
				rightItems={[
					{
						iconName: 'home',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					},
					{
						iconName: 'menu',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					}
				]}
			/>

			<Text
				onPress={() => navigation.navigate('Logout')}
				style={{ color: 'black' }}>
				Home
			</Text>
		</Container>
	);
};

export default Home;
