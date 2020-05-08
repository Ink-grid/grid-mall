/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';

export interface ProfileProps {
	navigation: any;
}

const Profile: React.SFC<ProfileProps> = props => {
	const { navigation } = props;
	//debug
	console.log(navigation);

	return (
		<Container style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>vista de perfiles</Text>
		</Container>
	);
};

export default Profile;
