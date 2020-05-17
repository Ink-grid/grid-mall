/** @format */

import * as React from 'react';
import useDidUpdate from '../../../../components/useDidUpdate';
import { View, StyleSheet, Alert, Dimensions } from 'react-native';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { Text, Item, Label, Input, Icon, Spinner } from 'native-base';
import Validate from '../validated';
import Stepper, { ProgressStep } from '../../../../components/Stepper';
import { validar_clave } from '../../../../utils/utils';
import ModalComponent from '../../../../components/Modal';
import {
	SelectComponent,
	SelectMultipleComponent
} from '../../../../components/Form/select/indext';

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
	userCLient: string;
	onSubmit?: () => Promise<void>;
	marginTop?: number;
}

// interface IndexPath {
// 	row: number;
// 	section?: number;
//   }

const height = Dimensions.get('screen').height;

const RegisterViews: React.SFC<RegisterOtionProps> = props => {
	const { marginTop, onSubmit, userCLient } = props;
	const [error, setError] = React.useState<Error>({
		errorType: true,
		status: false
	});

	const [frecuencia, setFrecuenciCompra] = React.useState('');
	const [categories, setCategories] = React.useState<string[]>([]);

	const phoneValid = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
	const emailValid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

	const useInputState = (initialValue: string = '') => {
		const [value, setValue] = React.useState<any>(initialValue);
		return {
			value,
			onChangeText: setValue,
			onKeyPress: () => setError(prev => ({ ...prev, status: false }))
			//onFocus: () => setError(prevs => ({ ...prevs, status: false }))
		};
	};

	const [visible, setVisible] = React.useState(false);

	const razon = useInputState();
	// const apellido = useInputState();
	const telefono = useInputState();
	const frecuencia_compra = useInputState();
	const ruc = useInputState();
	const password = useInputState();
	const driection = useInputState();
	const correo = useInputState();
	// const falimiliares = useInputState();

	const [isClose, setClose] = React.useState({
		name: false,
		telefono: false
	});

	// const setActionError = (type: TypeErro, status: boolean = true) => {
	// 	setError({ errorType: type, status: status });
	// };

	const validate = async () => {
		setVisible(true);
	};

	const showMessage = (message: string) =>
		Alert.alert(
			'Ocurrio un error inesperado',
			message,
			[
				{
					text: 'ok',
					onPress: () => {
						setVisible(false);
					}
				}
			],
			{ cancelable: false }
		);

	const getActionsError = (
		type: string,
		message: string,
		reload: React.Dispatch<any>
	) => {
		console.log(type);
		switch (type) {
			case 'invalid-email':
				showMessage(message);
				break;
			case 'email-already-in-use':
				showMessage(message);
				break;
			case 'weak-password':
				showMessage(message);
				break;

			default:
				Alert.alert(
					'Ocurrio un error inesperado',
					message,
					[
						{
							text: 'cancelar',
							onPress: () => setVisible(false)
						},
						{
							text: 'Volver a intentar',
							onPress: () => reload(Math.random)
						}
					],
					{ cancelable: false }
				);
				break;
		}
	};

	useDidUpdate(() => {
		if (razon.value.length === 0) {
			setClose(prevs => ({ ...prevs, name: false }));
		}
		if (razon.value.length > 1) {
			setClose(prevs => ({ ...prevs, name: true }));
		}
	}, [razon.value, correo.value]);

	return (
		<>
			<ModalComponent
				isVisible={visible}
				header={false}
				position='center'
				contendwidth='100%'>
				<View
					style={{
						height: height
					}}>
					<Validate
						data={{
							razon_social: razon.value,
							ruc: ruc.value,
							direction: driection.value,
							email: correo.value,
							phone: telefono.value,
							password: password.value,
							categories: categories,
							frecuencia_compra: frecuencia,
							tipo_client: userCLient,
							user: 'MW2jB9fvlqaqg49j3ZQf',
							lugares_compra: 'Mercado santa anita'
						}}
						errors={(type, message, reload) =>
							getActionsError(type, message, reload!)
						}>
						{status => {
							if (!status) {
								return (
									<View
										style={{
											flex: 1,
											alignContent: 'center',
											justifyContent: 'center',
											alignItems: 'center'
										}}>
										<Spinner color='#495FA5' />
										<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
											creando tu cuenta ...
										</Text>
									</View>
								);
							}
						}}
					</Validate>
				</View>
			</ModalComponent>
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
										marginTop: 15,
										marginBottom: 15
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

				<ProgressStep
					label='R.U.C'
					onNext={() => {
						if (ruc.value === '' || ruc.value.length < 5) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
					<View style={styles.root}>
						<View style={{ marginTop: marginTop, width: '90%' }}>
							<View>
								<Text style={styles.title}>Agrega tu R.U.C</Text>
								<Text
									note
									style={{
										textAlign: 'center',
										marginTop: 15,
										marginBottom: 10
									}}>
									Agregar tu R.U.C te ayuda a mejorar la confiabilidad de tus
									cliente.
								</Text>
							</View>
							<View
								style={{
									marginTop: 10,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								{error.errorType !== true && (
									<View style={{ marginBottom: 30 }}>
										<Text style={{ textAlign: 'center', color: 'red' }}>
											{error.errorType !== 'minCharacter' &&
												'El R.U.C ingresado es invalido, por favor ingrese un correo valido'}
										</Text>
									</View>
								)}
								<Item
									error={error.status}
									style={{ width: '95%' }}
									floatingLabel>
									<Label>R.U.C</Label>
									<Input {...ruc} autoFocus={true} />
									{isClose.name && (
										<Icon
											onPress={() => ruc.onChangeText('')}
											active
											name='close'
										/>
									)}
								</Item>
							</View>
						</View>
					</View>
				</ProgressStep>
				<ProgressStep
					label='Comp.'
					onNext={() => {
						if (ruc.value === '') {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
					<View style={styles.root}>
						<View style={{ marginTop: marginTop, width: '90%' }}>
							<View>
								<Text style={styles.title}>Frecuencia de compra</Text>
								<Text
									note
									style={{
										textAlign: 'center',
										marginTop: 15,
										marginBottom: 10
									}}>
									¡Ingrese la frecuencia de compra que realiza su negocio!
								</Text>
							</View>
							<View
								style={{
									marginTop: 10,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								{error.errorType !== true && (
									<View style={{ marginBottom: 30 }}>
										<Text note style={{ textAlign: 'center', color: 'red' }}>
											{error.errorType !== 'minCharacter' &&
												'Ingrese una frecuencia de compra válida'}
										</Text>
									</View>
								)}
								<View
									style={{ width: '95%' }}
									//error={error.status}
									//floatingLabel>
								>
									{/* <Label></Label> */}
									<SelectComponent
										label='Frecuencia de compra'
										onChangeValue={value => setFrecuenciCompra(value)}
										items={[
											{ label: 'Diario', value: '0' },
											{ label: 'Semanal', value: '1' },
											{ label: 'Mensual', value: '3' }
										]}
									/>

									{/* <Input {...frecuencia_compra} autoFocus={true} />
									{isClose.name && (
										<Icon
											onPress={() => frecuencia_compra.onChangeText(null)}
											active
											name='close'
										/>
									)} */}
								</View>
							</View>
						</View>
					</View>
				</ProgressStep>

				<ProgressStep
					label='Cate.'
					onNext={() => {
						if (categories.length === 0 || categories === undefined) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
					<View style={styles.root}>
						<View style={{ marginTop: marginTop, width: '90%' }}>
							<View>
								<Text style={styles.title}>
									Ingrese las categorias de su interes
								</Text>
								<Text
									note
									style={{
										textAlign: 'center',
										marginTop: 15,
										marginBottom: 10
									}}>
									Por favor selecione las categorias de su interes.
								</Text>
							</View>
							<View
								style={{
									marginTop: 10,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								{error.errorType !== true && (
									<View style={{ marginBottom: 30 }}>
										<Text note style={{ textAlign: 'center', color: 'red' }}>
											{error.errorType !== 'minCharacter' &&
												'Ingrese al menos un categoria de su preferencía'}
										</Text>
									</View>
								)}
								<View
									style={{ width: '95%' }}
									//error={error.status}
									//floatingLabel>
								>
									{/* <Label></Label> */}
									<SelectMultipleComponent
										data={[
											{ label: 'Diario', value: '0' },
											{ label: 'Semanal', value: '1' },
											{ label: 'Mensual', value: '3' }
										]}
										label='Categoria'
										onChangeValue={data => setCategories(data)}
									/>

									{/* <Select
										multiSelect={true}
										selectedIndex={selectedIndexCategorie}
										onSelect={(index: any) => setSelectedIndexCategorie(index)}>
										<SelectItem title='Frutas' />
										<SelectItem title='Verduras' />
										<SelectItem title='Abarrotes' />
										<SelectItem title='Otros' />
									</Select> */}
									{/* <Input {...frecuencia_compra} autoFocus={true} />
									{isClose.name && (
										<Icon
											onPress={() => frecuencia_compra.onChangeText(null)}
											active
											name='close'
										/>
									)} */}
								</View>
							</View>
						</View>
					</View>
				</ProgressStep>

				<ProgressStep
					label='Direc.'
					onNext={() => {
						if (driection.value === '' || driection.value.length < 3) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
					<View style={styles.root}>
						<View style={{ marginTop: marginTop, width: '90%' }}>
							<View>
								<Text style={styles.title}>Ingrese su Dirección</Text>
								<Text
									note
									style={{
										textAlign: 'center',
										marginTop: 15,
										marginBottom: 10
									}}>
									Ingrese la dirección de su negocio para determinar el nivel
									credibilidad a sus clientes.
								</Text>
							</View>
							<View
								style={{
									marginTop: 10,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								{error.errorType !== true && (
									<View style={{ marginBottom: 20 }}>
										<Text style={{ textAlign: 'center', color: 'red' }}>
											{error.errorType !== 'minCharacter' &&
												'Dirección incorrecta, por favor ingrese una direccón validad'}
										</Text>
									</View>
								)}
								<Item
									error={error.status}
									style={{ width: '95%' }}
									floatingLabel>
									<Label>Dirección</Label>
									<Input {...driection} autoFocus={true} />
									{isClose.name && (
										<Icon
											onPress={() => driection.onChangeText('')}
											active
											name='close'
										/>
									)}
								</Item>
							</View>
						</View>
					</View>
				</ProgressStep>
				<ProgressStep
					label='Email'
					onNext={() => {
						if (correo.value === '' || correo.value.length < 3) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else if (!correo.value.match(emailValid)) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
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
									marginTop: 10,
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
								<Item
									error={error.status}
									style={{ width: '95%' }}
									floatingLabel>
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
				<ProgressStep
					label='Cel.'
					onNext={() => {
						if (telefono.value === '' || telefono.value.length < 3) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else if (!telefono.value.match(phoneValid)) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
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
								<Item
									style={{ width: '95%' }}
									error={error.status}
									floatingLabel>
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
				<ProgressStep
					label='Pass.'
					onNext={() => {
						if (!validar_clave(password.value)) {
							setError({ status: true, errorType: 'Correo' });
							return false;
						} else {
							setError({ status: false, errorType: true });
							return true;
						}
					}}>
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
									marginTop: 20,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								{error.errorType !== true && (
									<View style={{ marginBottom: 30 }}>
										<Text style={{ textAlign: 'center', color: 'red' }}>
											{error.errorType !== 'minCharacter' &&
												'Tu contraseña debe tener como minimo 6 letras, número, simbolos (como "!" y "%%") y minimo una letra mayuscula'}
										</Text>
									</View>
								)}
								<Item
									error={error.status}
									style={{ width: '95%' }}
									floatingLabel>
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

				<ProgressStep
					label='Confir.'
					finishBtnText='Registrarte'
					onSubmit={() => validate()}>
					<View style={styles.root}>
						<View style={{ marginTop: 100, width: '90%' }}>
							<View>
								<Text style={styles.title}>Finalizar Registro</Text>
								<Text note style={{ textAlign: 'center', marginTop: 10 }}>
									Al tocar "Registrarte", aceptas nuestras Condiciones, la
									Política de datos y la Política de cookies. Es posible que te
									enviemos notificaciones, que puedes desactivar cuando quieras.
								</Text>
							</View>
						</View>
					</View>
				</ProgressStep>
			</Stepper>
		</>
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
