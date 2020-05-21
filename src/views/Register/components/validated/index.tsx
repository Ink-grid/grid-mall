/** @format */

import * as React from 'react';
import { auth } from '../../../../utils/firebase';
import { View } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Alert, AsyncStorage } from 'react-native';
import { StoreContext } from '../../../../context/StoreContext';

type user = {
	razon_social: string;
	tipo_client: string;
	user: string;
	ruc: string;
	frecuencia_compra: string;
	categories: string[];
	lugares_compra: string;
	phone: string;
	email: string;
	password: string;
	direction: string;
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

const CREATE_CLIENT = gql`
	mutation CreateClient(
		$uid: String!
		$razon_social: String!
		$tipo_client: String!
		$user: String!
		$ruc: String!
		$frecuencia_compra: String!
		$categories: [String]!
		$lugares_compra: String!
		$phone: String!
		$email: String!
		$direction: String!
	) {
		createClient(
			input: {
				uid: $uid
				razon_social: $razon_social
				tipo_client: $tipo_client
				user: $user
				ruc: $ruc
				frecuencia_compra: $frecuencia_compra
				categories: $categories
				lugares_compra: $lugares_compra
				phone: $phone
				email: $email
				direction: $direction
			}
		)
	}
`;

const Validate: React.SFC<ValidateProps> = props => {
	// create mutation
	const [createClient] = useMutation(CREATE_CLIENT);
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

	console.log(data);

	const registerUser = async () => {
		try {
			await auth().createUserWithEmailAndPassword(data.email, data.password);
			//console.log(data);
			const users = auth().currentUser;
			if (users) {
				//console.log(user.uid);

				let uid = users.uid;
				let razon_social = data.razon_social;
				let tipo_client = data.tipo_client;
				let user = data.user;
				let ruc = data.ruc;
				let frecuencia_compra = data.frecuencia_compra;
				let categories = data.categories;
				let lugares_compra = data.lugares_compra;
				let phone = data.phone;
				let email = data.email;
				let direction = data.direction;

				await createClient({
					variables: {
						uid,
						razon_social,
						tipo_client,
						user,
						ruc,
						frecuencia_compra,
						categories,
						lugares_compra,
						phone,
						email,
						direction
					}
				});
				await AsyncStorage.setItem('userToken', users.uid);
				await AsyncStorage.setItem('user', JSON.stringify(users));
				setRegister(true);

				Alert.alert(
					'Se creo con exito tu cuenta',
					`Recuerda ingresar con tu usuario: ${email}`,
					[
						{
							text: 'ok',
							onPress: () => {
								setToken(users.uid, user);
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

	return <View style={{ flex: 1 }}>{children(isRegister)}</View>;
};

export default Validate;
