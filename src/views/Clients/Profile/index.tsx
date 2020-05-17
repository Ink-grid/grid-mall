/** @format */

import * as React from 'react';
import { View, Text } from 'react-native';

export interface ProfileProps {
	navigation: any;
}

const Profile: React.SFC<ProfileProps> = props => {
	const { navigation } = props;
	return (
		<View>
			<Text>DKFSLDFL</Text>
		</View>
	);
};

export default Profile;
