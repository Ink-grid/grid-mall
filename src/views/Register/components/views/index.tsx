/** @format */

import * as React from 'react';
import useDidUpdate from '../../../../components/useDidUpdate';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Text, Item, Label, Input, Icon, Spinner, Button } from 'native-base';
import Validate from '../validated';

type TypeErro = undefined | null | 'minCharacter' | 'Correo' | true;

interface Error {
	errorType: TypeErro;
	status: boolean;
}

export interface RegisterOtionProps {
	index: number;
	render: (
		item?: string,
		actions?: (type: TypeErro, state?: boolean) => void,
		position?: string
	) => React.ReactNode;
	action?: React.Dispatch<number>;
	marginTop?: number;
}

const RegisterViews: React.SFC<RegisterOtionProps> = props => {
	const { index, marginTop, render, action } = props;
	const [error, setError] = React.useState<Error>({
		errorType: true,
		status: false
	});

	const useInputState = (initialValue: string = '') => {
		const [value, setValue] = React.useState<any>(initialValue);
		return {
			value,
			onChangeText: setValue,
			onKeyPress: () => setError(prev => ({ ...prev, status: false }))
			//onFocus: () => setError(prevs => ({ ...prevs, status: false }))
		};
	};

	const name = useInputState();
	// const apellido = useInputState();
	const telefono = useInputState();
	const password = useInputState();
	const correo = useInputState();
	const falimiliares = useInputState();

	const [isClose, setClose] = React.useState({
		name: false,
		telefono: false
	});

	const setActionError = (type: TypeErro, status: boolean = true) => {
		setError({ errorType: type, status: status });
	};

	const getActionsError = (type: string, reload?: React.Dispatch<any>) => {
		console.log(type);
		switch (type) {
			case 'invalid-email':
				action!(3);
				break;
			case 'email-already-in-use':
				action!(3);
				break;
			case 'weak-password':
				action!(4);
				break;

			default:
				reload!(Math.random());
				break;
		}
	};

	useDidUpdate(() => {
		if (name.value.length === 0) {
			setClose(prevs => ({ ...prevs, name: false }));
		}
		if (name.value.length > 1) {
			setClose(prevs => ({ ...prevs, name: true }));
		}
	}, [name.value, correo.value]);

	switch (index) {
		case 0:
			return (
				<>
					<View style={{ flex: 1 }}>
						<ImageBackground
							style={{ flex: 1 }}
							source={{
								uri:
									'https://previews.123rf.com/images/romastudio/romastudio1602/romastudio160200293/52915695-foto-de-la-comida-org%C3%A1nica-fondo-del-estudio-de-diferentes-verduras-en-mesa-de-madera.jpg'
							}}>
							<View style={styles.background}>
								<View
									style={{
										position: 'absolute',
										left: 30,
										top: 50
									}}>
									<Text
										style={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>
										Grid
									</Text>
									<Text
										style={{
											fontSize: 50,
											marginTop: -38,
											marginLeft: 1,
											fontWeight: 'bold',
											color: '#75F075'
										}}>
										mall
									</Text>
								</View>
								<View style={{ position: 'absolute', left: 30, bottom: 120 }}>
									<Text
										style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
										Únete a GridMall
									</Text>
									<Text style={{ fontSize: 13, width: '45%', color: '#fff' }}>
										Te ayudaremos a crear una cuenta en pocos pasos
									</Text>
								</View>
							</View>
						</ImageBackground>
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
					{render(name.value, setActionError, 'displayName')}
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
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 30 }}>
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
					{render(telefono.value, setActionError, 'phone')}
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
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 30 }}>
									<Text style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'El correo ingresado es invalido, por favor ingrese un correo valido'}
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
					{render(correo.value, setActionError, 'email')}
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
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 30 }}>
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
					{render(password.value, setActionError, 'password')}
				</>
			);
		case 5:
			return (
				<>
					<View style={{ marginTop: marginTop }}>
						<View>
							<Text style={styles.title}>¡Ya casi terminanos!</Text>
							<Text note style={{ textAlign: 'center', marginTop: 10 }}>
								Agrega el numero de personas que viven en su hogar, de esta
								manera podremos realizar una entrega acorde a sus necesidades
								familiares.
							</Text>
						</View>

						<View
							style={{
								marginTop: 40,
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 30 }}>
									<Text note style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Ingrese un número válido y menor a 2 dígitos'}
									</Text>
								</View>
							)}
							<Item style={{ width: '95%' }} error={error.status} floatingLabel>
								<Label>Número</Label>
								<Input
									{...falimiliares}
									keyboardType='numeric'
									autoFocus={true}
								/>
								{isClose.name && (
									<Icon
										onPress={() => falimiliares.onChangeText(null)}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
					{render(falimiliares.value, setActionError, 'falimiliares')}
				</>
			);
		case 6:
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

		case 7:
			return (
				<Validate
					data={{
						displayName: name.value,
						phone: telefono.value,
						password: password.value,
						numberFamily: falimiliares.value,
						email: correo.value
					}}
					errors={(type, message, reload) => {
						if (type) {
							if (type === 'network-request-failed') {
								Alert.alert(
									'¿Ocurrio un error?',
									message,
									[
										{
											text: 'cancelar',
											onPress: () => {
												action!(0);
											}
										},

										{
											text: 'volver a intentar',
											onPress: () => {
												getActionsError(type, reload);
											}
										}
									],
									{ cancelable: false }
								);
							} else {
								Alert.alert(
									'¿Ocurrio un error?',
									message,
									[
										{
											text: 'ok',
											onPress: () => {
												getActionsError(type, reload);
											}
										}
									],
									{ cancelable: false }
								);
							}
						}
					}}>
					{status => {
						if (!status) {
							return (
								<>
									<Spinner color='#495FA5' />
									<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
										creando tu cuenta ...
									</Text>
								</>
							);
						}
					}}
				</Validate>
			);

		default:
			return (
				<View>
					<Text>Ocurrio un error inesperado</Text>
				</View>
			);
	}
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18
	},

	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		width: '100%',
		position: 'relative'

		// justifyContent: 'center',
		// alignItems: 'center'
	}
});

export default RegisterViews;
