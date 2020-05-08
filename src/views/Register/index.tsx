/** @format */

import * as React from 'react';
import { Container, Icon, Button, Text } from 'native-base';
import { View, StyleSheet, Keyboard, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/core';
import RegisterViews from './components/views';

export interface RegisterProps {
	navigation: any;
}

const Register: React.SFC<RegisterProps> = props => {
	const { navigation } = props;
	const [state, setstate] = React.useState(0);
	const [marginTop, setMargintop] = React.useState(-100);
	const phoneValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
	const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

	const _keyboardDidShow = () => {
		setMargintop(0);
	};

	const _keyboardDidHide = () => {
		setMargintop(-100);
	};

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
			Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
			Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
			return () => {
				BackHandler.removeEventListener('hardwareBackPress', showessage);
				Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
				Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
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
			<View style={state !== 0 ? styles.content : { flex: 1 }}>
				<RegisterViews
					index={state}
					action={setstate}
					marginTop={marginTop}
					render={(item, errorAction, position) => (
						<View
							style={{
								marginTop: 20,
								width: '100%',
								paddingLeft: 10,
								paddingRight: 10
							}}>
							<Button
								onPress={() => {
									if (position) {
										if (position === 'phone') {
											if (!item!.match(phoneValid)) {
												errorAction!('Correo', true);
												return null;
											}
										}
										if (position === 'email') {
											if (!item!.match(emailValid)) {
												errorAction!('Correo', true);
												return null;
											}
										}
										if (position === 'password') {
											if (item!.length <= 5) {
												errorAction!('Correo', true);
												return null;
											}
										}
										if (position === 'falimiliares') {
											if (item!.length >= 2) {
												errorAction!('Correo', true);
												return null;
											}
										}
									}
									if (item === undefined) {
										if (state === 0 || state === 6) {
											setstate(prevs => prevs + 1);
											return;
										}
										if (errorAction) {
											errorAction(undefined);
										}

										//alert('por favor registre su' + item);
										return;
									}
									if (item!.length === 0) {
										errorAction!(null);
										return;
									}
									//console.log(errorAction);
									if (errorAction) {
										errorAction(true, false);
									}
									setstate(prevs => prevs + 1);
								}}
								full
								style={{ borderRadius: 10, backgroundColor: '#75F075' }}>
								<Text style={{ textTransform: 'lowercase' }}>
									{state === 6 ? 'Registrarte' : 'Siguiente'}
								</Text>
							</Button>
						</View>
					)}
				/>
				{/* {RegisterOtion(state, marginTop)} */}
			</View>
			{state === 0 && (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.footer}>¿Ya tienes una cuenta?</Text>
				</TouchableOpacity>
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
