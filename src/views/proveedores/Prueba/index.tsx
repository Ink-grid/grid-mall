/** @format */

import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Container, Text, View, Card, Button } from 'native-base';
import HeaderComponent from '../../../components/Header';
import gql from 'graphql-tag';
import CustomList from '../../../components/CustomList';
import { useMutation } from '@apollo/react-hooks';

export interface PruebaProps {
	navigation: any;
}

// esto es una consulta gradql.
const query = gql`
	{
		categories {
			_uid
			title
			description
		}
	}
`;

const DELETED_Cateory = gql`
	mutation DeletedCategory($uid: String!) {
		deletedCategory(uid: $uid)
	}
`;

type categoria = {
	_uid: string;
	title: string;
	description: string;
};

const Prueba: React.SFC<PruebaProps> = props => {
	const { navigation } = props;
	// instacion el hook de apollo client
	const [deletedCategory] = useMutation(DELETED_Cateory);

	console.log('desde pruensa', navigation);

	return (
		<Container>
			<HeaderComponent
				leftActions={{
					iconName: 'menu',
					iconType: 'Entypo',
					actions: () => navigation.openDrawer()
				}}
				title='GridMall'
				background='purple'
				rightItems={[
					{
						iconName: 'home',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					},
					{
						iconName: 'menu',
						iconType: 'Entypo',
						actions: () => alert('hola mundo')
					}
				]}
			/>

			<View style={{ backgroundColor: 'red', flex: 1 }}>
				<CustomList
					query={query}
					resolve='categories'
					resolveDeleted='deletedCategory'
					isError={(state, reload) => {
						console.log(state);
						state ? reload && reload() : alert('ocurrio un erro');
					}}
					deletedAction={(value: any) =>
						deletedCategory({ variables: { ...value } })
					}
					renderIten={(data: [categoria], deletedItems) => (
						<View>
							{data.map((categoria, index) => (
								<Card key={index}>
									<Text>{categoria.title}</Text>
									<Button
										onPress={() => {
											if (deletedItems) {
												Alert.alert(
													'Confirmat',
													'Estas seguro de realizar esta acción',
													[
														{
															text: 'Cancel',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel'
														},
														{
															text: 'OK',
															onPress: () =>
																deletedItems({ uid: categoria._uid })
														}
													],
													{ cancelable: false }
												);
											}
										}}>
										<Text>Eliminar</Text>
									</Button>
								</Card>
							))}
						</View>
					)}
				/>
			</View>
			<Text>hola mundo</Text>
		</Container>
	);
};

const styles = StyleSheet.create({
	root: {
		backgroundColor: 'red',
		flex: 1
	}
});

export default Prueba;
