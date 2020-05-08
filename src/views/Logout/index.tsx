/** @format */

import * as React from 'react';
import { View, Spinner, Text, Toast } from 'native-base';
import { StoreContext } from '../../context/StoreContext';
import { auth } from '../../utils/firebase';
import { AsyncStorage } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';

export interface LoguotProps {
	navigation: any;
}

const Loguot: React.SFC<LoguotProps> = props => {
	const { navigation } = props;
	const { actions } = React.useContext(StoreContext);
	// logout action
	const logoutAscyn = async () => {
		try {
			await auth().signOut();
			await AsyncStorage.removeItem('userToken');
			await AsyncStorage.removeItem('user');
			actions.signOut();
			Toast.show({
				buttonText: 'ok',
				buttonTextStyle: { color: '#008000' },
				text: 'Sesión cerrada',
				duration: 4000
			});
		} catch (error) {
			console.log('error');
			navigation.goBack();
			Toast.show({
				buttonText: 'ok',
				buttonTextStyle: { color: '#008000' },
				text: 'Ocurrio un error inesperado por favor intentalo de nuevo.',
				duration: 4000
			});
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			logoutAscyn();
		}, [])
	);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Spinner />
			<Text note>saliendo...</Text>
		</View>
	);
};

export default Loguot;
