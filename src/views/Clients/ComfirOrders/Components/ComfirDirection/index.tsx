/** @format */

import * as React from 'react';
import ModalComponent from '../../../../../components/Modal';
import { View, Text, Button, Icon, Card, Spinner } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import SetDirection from '../SetDirection';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { StoreContext } from '../../../../../context/StoreContext';
import { RefreshControl, TouchableOpacity } from 'react-native';

export interface ComfirDirectionsProps {
	visibleDirection: boolean;
	direction: any;
	confirm: (state: boolean) => void;
	setdirection: React.Dispatch<any>;
	close: () => void;
}

const query = gql`
	query($uid: String!) {
		directions(uid: $uid) {
			_uid
			avenida
			distrito
			referencie
		}
	}
`;

const ComfirDirections: React.SFC<ComfirDirectionsProps> = props => {
	const { visibleDirection, close, direction, setdirection, confirm } = props;
	const [isAddDirestion, setDirection] = React.useState(false);

	// [*] get uid for client
	const { state } = React.useContext(StoreContext);

	const { loading, error, data, refetch } = useQuery(query, {
		variables: { uid: state.user.uid }
	});

	// [*] action state for refresh
	const [refreshing, setRefreshing] = React.useState(false);

	// [*] refres for fireciont Gradql
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch();
		setRefreshing(false);
	}, [refreshing]);

	React.useEffect(() => {
		if (data) {
			if (data.directions.length !== 0) {
				setdirection({ value: data.directions[0]._uid, active: 0 });
			}
		}
	}, [data]);

	return (
		<ModalComponent
			position='flex-end'
			title='Confirma tu dirección'
			contendwidth='95%'
			isVisible={visibleDirection}
			close={close}>
			<View>
				<View style={{ alignItems: 'center' }}>
					<Button
						onPress={() => setDirection(true)}
						transparent
						style={{ width: '80%' }}>
						<Text note style={{ textAlign: 'center', width: '100%' }}>
							Agregar una dirección
						</Text>
					</Button>
				</View>
				{error && (
					<Text note style={{ textAlign: 'center' }}>
						ocurrio un error inesperado
					</Text>
				)}
				{loading && !error && <Spinner color='#1A2138'></Spinner>}
				<SetDirection
					success={state => state && refetch()}
					uidClient={state.user.uid}
					isVisible={isAddDirestion}
					close={() => setDirection(false)}
				/>

				{!loading && !error && data && data.directions.length === 0 && (
					<View style={{ padding: 10, marginBottom: 15 }}>
						<Text note style={{ textAlign: 'center' }}>
							No se a registrado ningúna dirección por el momento, por favor
							ingrese una nueva dirección.
						</Text>
					</View>
				)}

				{!loading && !error && data && data.directions.length !== 0 && (
					<ScrollView
						style={{ maxHeight: 195, marginBottom: 20 }}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}>
						<View>
							{data.directions.map((ele: any, index: number) => (
								<Card key={index}>
									<TouchableOpacity
										onPress={() => {
											setdirection({ value: ele._uid, active: index });
										}}>
										<View style={{ padding: 10, flexDirection: 'row' }}>
											<View style={{ width: '15%' }}>
												<Icon name='direction' type='Entypo'></Icon>
											</View>
											<View style={{ width: '75%' }}>
												<Text>{ele.avenida}</Text>
												<Text note>{ele.distrito}</Text>
												<Text numberOfLines={1} note>
													Referencia: {ele.referencie}
												</Text>
												<Text note>Lima-perú</Text>
											</View>

											<View style={{ width: '10%' }}>
												{index === direction.active && (
													<Icon name='check' type='AntDesign'></Icon>
												)}
											</View>
										</View>
									</TouchableOpacity>
								</Card>
							))}
						</View>
					</ScrollView>
				)}
				<View style={{ alignItems: 'center' }}>
					<Button
						onPress={() => {
							confirm(true);
							close();
						}}
						iconRight
						style={{ backgroundColor: '#77A765', width: '40%' }}>
						<Text
							style={{
								textTransform: 'lowercase',
								fontWeight: 'bold',
								marginTop: -4,
								fontSize: 15
							}}>
							continuar
						</Text>
						<Icon name='arrowright' style={{ fontSize: 20 }} type='AntDesign' />
					</Button>
				</View>
			</View>
		</ModalComponent>
	);
};

export default ComfirDirections;
