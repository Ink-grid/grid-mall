/** @format */

import * as React from 'react';
import { Container, Text, Content} from 'native-base';
import HeaderIcon from './header_home';

export interface HomeProps {
	navigation: any;
}

const Home: React.SFC<HomeProps> = props => {
	// recuperar los parametros
	const { navigation } = props;

	// degug
	console.log('props home', navigation);

	return (

		<Container >
			<HeaderIcon></HeaderIcon>
			<Content padder>
				<Text>:::::::::::::</Text>
				<Text >♦Beta ♣ 001 ♦</Text>
				<Text>=============</Text>
			</Content>
		</Container>
	);
};

export default Home;
