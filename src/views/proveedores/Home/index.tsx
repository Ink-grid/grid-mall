/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';
import HeaderComponent from '../../../components/Header';

export interface HomeProps {
	navigation: any;
}

const Home: React.SFC<HomeProps> = props => {
	// recuperar los parametros
	const { navigation } = props;

	// degug
	console.log('props home', navigation);

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
