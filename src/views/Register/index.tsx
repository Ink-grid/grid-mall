/** @format */

import * as React from 'react';
import { Container, Icon, Button, Text } from 'native-base';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/core';
// //import RegisterViews from './components/views';
// import Stepper, { ProgressStep } from '../../components/Stepper';
// import HomeRegister from './components/Views';
import RegisterViews from './components/views';
import HomeRegister from './components/ImageLogo';

export interface RegisterProps {
	navigation: any;
	route: any;
}

const Register: React.SFC<RegisterProps> = props => {
	const { navigation, route } = props;
	const [state, setstate] = React.useState(0);
	// const [marginTop, setMargintop] = React.useState(-100);
	console.log(route);

	// const _keyboardDidShow = () => {
	// 	setMargintop(0);
	// };

	// const _keyboardDidHide = () => {
	// 	setMargintop(-100);
	// };

	const showessage = () => {
		if (state === 0) {
			setstate(0);
			navigation.goBack();
		} else if (state > 1 && state < 6) {
			setstate(prevs => prevs - 1);
		} else {
			Alert.alert(
				'¿Quieres salir sin terminar de crear la cuenta?',
				'Si sales ahora, perderás el progreso que hayas hecho.',
				[
					{
						text: 'Seguir creando la cuenta',
						onPress: () => console.log('cancel'),
						style: 'cancel'
					},
					{
						text: 'Salir sin crear la cuenta',
						onPress: () => {
							setstate(0);
							navigation.goBack();
						}
					}
				],
				{ cancelable: true }
			);
			return true;
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			if (state >= 1) {
				BackHandler.addEventListener('hardwareBackPress', showessage);
			}
			// Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
			// Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
			return () => {
				BackHandler.removeEventListener('hardwareBackPress', showessage);
				// Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
				// Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
			};
		}, [state])
	);

	return (
		<Container>
			{state !== 0 ? (
				<View style={styles.header}>
					{/* <Text style={{fontWeight: "bold"}}></Text> */}
					<Button transparent onPress={() => showessage()}>
						<Icon
							type='AntDesign'
							style={{ color: 'black', fontSize: 25 }}
							name='arrowleft'
						/>
					</Button>
				</View>
			) : null}

			{state === 0 && <HomeRegister />}

			{state !== 0 && (
				<View style={{ flex: 1 }}>
					<RegisterViews userCLient={route.params.uid} />
				</View>
			)}

			{state === 0 && (
				<View style={{ padding: 10 }}>
					<Button
						onPress={() => setstate(1)}
						full
						style={{ borderRadius: 10, backgroundColor: '#75F075' }}>
						<Text style={{ textTransform: 'lowercase' }}>{'Siguiente'}</Text>
					</Button>

					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text style={styles.footer}>¿Ya tienes una cuenta?</Text>
					</TouchableOpacity>
				</View>
			)}
		</Container>
	);
};

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#fff',
		height: 50,
		borderBottomColor: '#B8B8B8',
		borderBottomWidth: 1
	},
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18
	},
	content: {
		flex: 1,
		padding: 10,
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},

	footer: {
		color: '#314F31',
		textAlign: 'center',
		padding: 10,
		fontWeight: 'bold'
	}
});

export default Register;
