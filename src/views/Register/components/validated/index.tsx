/** @format */

import * as React from 'react';
import { auth } from '../../../../utils/firebase';
import { View } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Alert, AsyncStorage } from 'react-native';
import { StoreContext } from '../../../../context/StoreContext';

type user = {
	displayName: string;
	phone: number;
	email: string;
	password: string;
	numberFamily: number;
};

export interface ValidateProps {
	data: user;
	children: (status: boolean) => React.ReactNode;
	navigation?: any;
	errors?: (
		type: string,
		message: string,
		reload?: React.Dispatch<any>
	) => void;
}

const CREATE_USER = gql`
	mutation CreateClient(
		$_uid: String!
		$razon_social: String!
		$phone: String!
		$email: String!
		$password: String!
		$quantity_family: Int!
	) {
		createClient(
			input: {
				_uid: $_uid
				razon_social: $razon_social
				phone: $phone
				email: $email
				password: $password
				quantity_family: $quantity_family
			}
		) {
			_uid
		}
	}
`;

const Validate: React.SFC<ValidateProps> = props => {
	// create mutation
	const [createClient] = useMutation(CREATE_USER);
	const { data, navigation, children, errors } = props;
	const [isRegister, setRegister] = React.useState(false);
	const [reloadstatus, setReload] = React.useState<any>(false);

	// acttion storage login
	const { actions } = React.useContext(StoreContext);

	//remove user error grapql
	const removeUserAsync = async () => {
		const user = auth().currentUser;
		if (user) await user.delete();
	};

	// const singInt register token
	const setToken = async (token: string, user: any) => {
		actions.signIn(token);
		actions.setUser(user);
	};

	const registerUser = async () => {
		try {
			await auth().createUserWithEmailAndPassword(data.email, data.password);
			//console.log(data);
			const user = auth().currentUser;
			if (user) {
				//console.log(user.uid);
				let _uid: string = user.uid;
				let razon_social = data.displayName;
				let phone = data.phone;
				let email = data.email;
				let password = data.password;
				let quantity_family = parseInt(data.numberFamily.toString());
				await createClient({
					variables: {
						_uid,
						razon_social,
						phone,
						email,
						password,
						quantity_family
					}
				});
				await AsyncStorage.setItem('userToken', user.uid);
				await AsyncStorage.setItem('user', JSON.stringify(user));
				setRegister(true);

				Alert.alert(
					'Se creo con exito tu cuenta',
					`Recuerda ingresar con tu usuario: ${email}.`,
					[
						{
							text: 'ok',
							onPress: () => {
								setToken(user.uid, user);
							}
						}
					],
					{ cancelable: false }
				);
			}
			//alert('se creo con exito su cuenta');
		} catch (error) {
			switch (error.code) {
				case 'auth/invalid-email':
					errors!(
						'invalid-email',
						'La dirección de correo electrónico está mal formateada'
					);
					break;
				case 'auth/email-already-in-use':
					errors!(
						'email-already-in-use',
						'La dirección de correo electrónico ya está en uso por otra cuenta'
					);
					break;
				case 'auth/weak-password':
					errors!(
						'weak-password',
						'La contraseña debe tener al menos 6 caracteres.'
					);
					break;
				case 'auth/argument-error':
					errors!('argument-error', error.message);
					break;
				case 'auth/network-request-failed':
					errors!(
						'network-request-failed',
						'No es posible conectarse con gridmall, verifique su conexion a internet',
						setReload
					);
				default:
					console.log('grapql: ', error);
					errors!(
						'network-request-failed',
						'No es posible conectarse con gridmall, verifique su conexion a internet',
						setReload
					);
					removeUserAsync();
					console.log(error.code);
					console.log(error.message);
					break;
			}
		}
	};

	React.useEffect(() => {
		registerUser();
	}, [reloadstatus]);

	return <View>{children(isRegister)}</View>;
};

export default Validate;
