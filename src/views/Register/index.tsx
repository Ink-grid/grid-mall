/** @format */

import * as React from 'react';
import { Container, Icon, Button, Text, Item, Label, Input } from 'native-base';
import { View, StyleSheet, Keyboard, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useDidUpdate from '../../components/useDidUpdate';
import { useFocusEffect } from '@react-navigation/core';

export interface RegisterProps {
	navigation: any;
}

type TypeErro = undefined | null | 'minCharacter' | true;

interface RegisterOtionProps {
	index: number;
	render: (
		item?: string,
		actions?: (type: TypeErro, state?: boolean) => void
	) => React.ReactNode;
	marginTop?: number;
}

interface Error {
	errorType: TypeErro;
	status: boolean;
}

const RegisterOtion: React.SFC<RegisterOtionProps> = props => {
	const { index, marginTop, render } = props;
	const [error, setError] = React.useState<Error>({
		errorType: true,
		status: false
	});

	const useInputState = (initialValue: string = '') => {
		const [value, setValue] = React.useState<any>(initialValue);
		return {
			value,
			onChangeText: setValue,
			onPress: () => setError(prevs => ({ ...prevs, status: false }))
		};
	};

	const name = useInputState();
	// const apellido = useInputState();
	const telefono = useInputState();
	const password = useInputState();
	const correo = useInputState();

	const [isClose, setClose] = React.useState({
		name: false,
		telefono: false
	});

	const setActionError = (type: TypeErro, status: boolean = true) => {
		setError({ errorType: type, status: status });
	};

	useDidUpdate(() => {
		if (name.value.length === 0) {
			setClose(prevs => ({ ...prevs, name: false }));
		}
		if (name.value.length > 1) {
			setClose(prevs => ({ ...prevs, name: true }));
		}
	}, [name.value]);

	switch (index) {
		case 0:
			return (
				<>
					<View>
						<Text style={styles.title}>Únete a inkmarket</Text>
						<Text note style={{ marginTop: 10 }}>
							Te ayudaremos a crear una cuenta en pocos pasos.
						</Text>
					</View>
					{render()}
				</>
			);
		case 1:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>¿Cómo te llamas?</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Ingresa tu nombre verdadero.
							</Text>
						</View>
						<View
							style={{
								marginTop: 40,
								width: '100%',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 30 }}>
									<Text note style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Ingrese su nombre completo'}
									</Text>
								</View>
							)}
							<Item
								style={{
									width: '95%'
								}}
								error={error.status}
								floatingLabel>
								<Label>Nombre completo</Label>
								<Input {...name} autoFocus={true} />
								{isClose.name && (
									<Icon
										onPress={() => name.onChangeText('')}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
					{render(name.value, setActionError)}
				</>
			);
		case 2:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>Ingresa tu número de celular</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Ingresa tu número de celular de contacto. para poder efectuar
								una mejor comunicación.
							</Text>
						</View>

						<View
							style={{
								marginTop: 50,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ padding: 10 }}>
									<Text note style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Ingrese un número de celular válido'}
									</Text>
								</View>
							)}
							<Item style={{ width: '95%' }} error={error.status} floatingLabel>
								<Label>Número de celular</Label>
								<Input
									{...telefono}
									keyboardType='phone-pad'
									autoFocus={true}
								/>
								{isClose.name && (
									<Icon
										onPress={() => telefono.onChangeText(null)}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
					{render(telefono.value, setActionError)}
				</>
			);

		case 3:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>Agrega tu correo electrónico</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Agregar un correo electrónico te ayuda a proteger tu cuenta,
								recibir facturas electronicas y mucho más.
							</Text>
						</View>
						<View
							style={{
								marginTop: 50,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ padding: 10 }}>
									<Text style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Ingrese su correo electrónico'}
									</Text>
								</View>
							)}
							<Item error={error.status} style={{ width: '95%' }} floatingLabel>
								<Label>Correo electronico</Label>
								<Input
									{...correo}
									keyboardType='email-address'
									autoFocus={true}
								/>
								{isClose.name && (
									<Icon
										onPress={() => correo.onChangeText('')}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
					{render(correo.value, setActionError)}
				</>
			);
		case 4:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>Elige una contraseña</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Crea una contraseña que tenga al menos 6 caracteres, Debe ser
								algo dificil de adivinar.
							</Text>
						</View>
						<View
							style={{
								marginTop: 50,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ padding: 10 }}>
									<Text style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Tu contraseña debe tener como minimo 6 letras, número y simbolos (como "!" y "%%")'}
									</Text>
								</View>
							)}
							<Item error={error.status} style={{ width: '95%' }} floatingLabel>
								<Label>contraseña</Label>
								<Input {...password} autoFocus={true} />
								{isClose.name && (
									<Icon
										onPress={() => password.onChangeText('')}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
					{render(password.value, setActionError)}
				</>
			);
		case 5:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>Finalizar Registro</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Al tocar "Registrarte" , aceptas nuestras Condiciones, la
								Política de datos y la Política de cookies. Es posible que te
								enviemos notificaciones por SMS, que puedes desactivar cuando
								quieras.
							</Text>
						</View>

						{/* <View
						style={{
							marginTop: 50,
							justifyContent: 'center',
							alignItems: 'center'
						}}>
						<Item style={{ width: '95%' }} floatingLabel>
							<Label>contraseña</Label>
							<Input {...password} autoFocus={true} />
							{isClose.name && (
								<Icon
									onPress={() => password.onChangeText('')}
									active
									name='close'
								/>
							)}
						</Item>
					</View> */}
					</View>
					{render()}
				</>
			);

		default:
			return (
				<View>
					<Text>Ocurrio un error inesperado</Text>
				</View>
			);
	}
};

const Register: React.SFC<RegisterProps> = props => {
	const { navigation } = props;
	const [state, setstate] = React.useState(0);
	const [marginTop, setMargintop] = React.useState(-100);

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
			<View style={styles.content}>
				<RegisterOtion
					index={state}
					marginTop={marginTop}
					render={(item, errorAction) => (
						<View style={{ marginTop: 50, width: '95%' }}>
							<Button
								onPress={() => {
									if (item === undefined) {
										if (state === 0) {
											setstate(prevs => prevs + 1);
											return;
										}
										errorAction!(undefined);

										//alert('por favor registre su' + item);
										return;
									}
									if (item!.length === 0) {
										errorAction!(null);
										return;
									}
									errorAction!(true, false);
									setstate(prevs => prevs + 1);
								}}
								full
								style={{ borderRadius: 10, backgroundColor: '#495FA5' }}>
								<Text style={{ textTransform: 'lowercase' }}>
									{state === 5 ? 'Registrarte' : 'Siguiente'}
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
		color: '#495FA5',
		textAlign: 'center',
		padding: 10,
		fontWeight: 'bold'
	}
});

export default Register;
