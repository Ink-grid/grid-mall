/** @format */

import * as React from 'react';
import useDidUpdate from '../../../../components/useDidUpdate';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Item, Label, Input, Icon, Spinner } from 'native-base';
import Validate from '../validated';
import Stepper, { ProgressStep } from '../../../../components/Stepper';

type TypeErro = undefined | null | 'minCharacter' | 'Correo' | true;

interface Error {
	errorType: TypeErro;
	status: boolean;
}

export interface RegisterOtionProps {
	// index: number;
	// render: (
	// 	item?: string,
	// 	actions?: (type: TypeErro, state?: boolean) => void,
	// 	position?: string
	// ) => React.ReactNode;
	onSubmit?: () => Promise<void>;
	marginTop?: number;
}

const RegisterViews: React.SFC<RegisterOtionProps> = props => {
	const { marginTop, onSubmit } = props;
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

	const razon = useInputState();
	// const apellido = useInputState();
	const telefono = useInputState();
	const password = useInputState();
	const correo = useInputState();
	const falimiliares = useInputState();

	const [isClose, setClose] = React.useState({
		name: false,
		telefono: false
	});

	// const setActionError = (type: TypeErro, status: boolean = true) => {
	// 	setError({ errorType: type, status: status });
	// };

	// const getActionsError = (type: string, reload?: React.Dispatch<any>) => {
	// 	console.log(type);
	// 	switch (type) {
	// 		case 'invalid-email':
	// 			action!(3);
	// 			break;
	// 		case 'email-already-in-use':
	// 			action!(3);
	// 			break;
	// 		case 'weak-password':
	// 			action!(4);
	// 			break;

	// 		default:
	// 			reload!(Math.random());
	// 			break;
	// 	}
	// };

	useDidUpdate(() => {
		if (razon.value.length === 0) {
			setClose(prevs => ({ ...prevs, name: false }));
		}
		if (razon.value.length > 1) {
			setClose(prevs => ({ ...prevs, name: true }));
		}
	}, [razon.value, correo.value]);

	return (
		<Stepper>
			<ProgressStep
				label='Razon.'
				onNext={
					() => {
						if (razon.value === '' || razon.value.length < 5) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}
					// name.value === '' || name.value.length <= 4 ? false : true
				}
				previousBtnStyle={{ color: '#75F075' }}>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
						<View>
							<Text style={styles.title}>¿Cual es tu Razón social?</Text>
							<Text
								note
								style={{
									textAlign: 'center',
									marginTop: 10,
									marginBottom: 10
								}}>
								Ingresa su Razón social.
							</Text>
						</View>
						<View
							style={{
								marginTop: 5,
								width: '100%',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							{error.errorType !== true && (
								<View style={{ marginBottom: 20 }}>
									<Text note style={{ textAlign: 'center', color: 'red' }}>
										{error.errorType !== 'minCharacter' &&
											'Ingrese su razón social completo'}
									</Text>
								</View>
							)}
							<Item
								style={{
									width: '95%'
								}}
								error={error.status}
								floatingLabel>
								<Label>Razon Social</Label>
								<Input {...razon} autoFocus={true} />
								{isClose.name && (
									<Icon
										onPress={() => razon.onChangeText('')}
										active
										name='close'
									/>
								)}
							</Item>
						</View>
					</View>
				</View>
			</ProgressStep>
			<ProgressStep label='R.U.C' errors={error.status}>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
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
				</View>
			</ProgressStep>

			<ProgressStep label='Servicio'>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
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
				</View>
			</ProgressStep>

			<ProgressStep label='Direc.'>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
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
				</View>
			</ProgressStep>
			<ProgressStep label='Email'>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
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
				</View>
			</ProgressStep>
			<ProgressStep label='Cel.'>
				<View style={styles.root}>
					<View style={{ marginTop: marginTop, width: '90%' }}>
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
				</View>
			</ProgressStep>

			<ProgressStep label='Confirmar registro'>
				<Validate
					data={{
						displayName: razon.value,
						phone: telefono.value,
						password: password.value,
						numberFamily: falimiliares.value,
						email: correo.value
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
			</ProgressStep>
		</Stepper>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18
	},

	root: {
		marginTop: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
