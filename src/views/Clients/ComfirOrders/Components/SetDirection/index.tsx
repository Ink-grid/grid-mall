/** @format */

import * as React from 'react';
import ModalComponent from '../../../../../components/Modal';
import { View, Text, Item, Input, Button, Icon } from 'native-base';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Alert } from 'react-native';

export interface SetDirectionProps {
	isVisible: boolean;
	success: (state: boolean) => void;
	uidClient: string;
	close: () => void;
}

const CREATE_DIRECTION = gql`
	mutation CreateDirection(
		$avenida: String!
		$distrito: String!
		$referencie: String!
		$client: String!
	) {
		createDirection(
			input: {
				avenida: $avenida
				distrito: $distrito
				referencie: $referencie
				client: $client
			}
		) {
			_uid
		}
	}
`;

const useInputState = (initialValue: string = '') => {
	const [value, setValue] = React.useState(initialValue);
	return { value, onChangeText: setValue };
};

const SetDirection: React.SFC<SetDirectionProps> = props => {
	const { isVisible, close, uidClient, success } = props;

	// [*] create mutation for client add direction
	const [createClient] = useMutation(CREATE_DIRECTION);

	// [*] state loading for save direction usState
	const [loading, setLoadig] = React.useState<boolean>(false);

	// [*] prepare value and setText for input
	const avenida = useInputState();
	const distrito = useInputState();
	const referencia = useInputState();

	// [*] useError for input requerid
	const [error, setError] = React.useState({
		name: '',
		status: false
	});

	// [*]  save direction asycn
	const saveDirecitionAsync = async () => {
		if (avenida.value.length < 4) {
			setError({ name: 'avenida', status: true });
			return null;
		}
		if (distrito.value.length < 4) {
			setError({ name: 'distrito', status: true });
			return null;
		}
		if (referencia.value.length < 4) {
			setError({ name: 'referencia', status: true });
			return null;
		}

		setLoadig(true);
		try {
			await createClient({
				variables: {
					avenida: avenida.value,
					distrito: distrito.value,
					referencie: referencia.value,
					client: uidClient
				}
			});
			setLoadig(false);
			success(true);
			close();
		} catch (error) {
			setLoadig(false);
			console.log(error);
			Alert.alert(
				'ocurrio un error inesperado por favor verifique su conexción a internet'
			);
		}
	};

	return (
		<ModalComponent
			position='flex-end'
			title='Ingresar nueva dirección'
			contendwidth='95%'
			loading={loading}
			isVisible={isVisible}
			close={close}>
			<View>
				<Text note>Dirección</Text>
				<View style={{ paddingTop: 20, height: 250 }}>
					<Item regular error={error.name === 'avenida' ? true : false}>
						<Icon type='Entypo' active name='direction' />
						<Input
							onKeyPress={() => setError({ name: '', status: false })}
							{...avenida}
							placeholder='Av. los alamos'
						/>
					</Item>
					<View style={{ height: 10 }}></View>
					<Item regular error={error.name === 'distrito' ? true : false}>
						<Icon type='Entypo' active name='location-pin' />
						<Input
							onKeyPress={() => setError({ name: '', status: false })}
							{...distrito}
							placeholder='Distrito'
						/>
					</Item>
					<View style={{ height: 10 }}></View>
					<Item regular error={error.name === 'referencia' ? true : false}>
						<Icon type='AntDesign' active name='staro' />
						<Input
							onKeyPress={() => setError({ name: '', status: false })}
							{...referencia}
							placeholder='Referencia'
						/>
					</Item>
				</View>
				<Button
					style={{ backgroundColor: '#77A765' }}
					full
					onPress={() => saveDirecitionAsync()}
					disabled={loading}>
					<Text>Guardar </Text>
				</Button>
			</View>
		</ModalComponent>
	);
};

export default SetDirection;
