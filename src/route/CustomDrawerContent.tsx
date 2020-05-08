/** @format */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Thumbnail, Text, Spinner, Icon } from 'native-base';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

let uri =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbEApV58sm7vioX-LBvzTljUrvFjXJ8YhlaM9R2yRbTcLEztQS&usqp=CAU';

export interface CustomDrawerContentProps {
	navigation?: any;
	user?: any;
}

// obtenemos las rutas de la base de datos
const query = gql`
	query($type: String!) {
		getAccess(type: $type) {
			icon
			typeIcon
			name
			route
		}
	}
`;

const CustomDrawerContent: React.SFC<CustomDrawerContentProps> = props => {
	const { navigation, user } = props;

	// relizamos la consulta de las rutas con el hooks que nos da @apollo
	const { loading, error, data } = useQuery(query, {
		variables: { type: 'proveedor' }
	});

	// si existe un error en la consulta especificamos la falla al cliente
	if (error && !loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center'
				}}>
				<Text note>Ocurrio un error inesperado</Text>
			</View>
		);
	}

	// loading por defecto es true, por lo tanto retornamos un loading hasta que sea falso
	if (loading && !data) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center'
				}}>
				<Spinner></Spinner>
			</View>
		);
	}

	// si todo esta bien retornamos las routas
	return (
		<>
			<View style={styles.profile}>
				<Thumbnail large source={{ uri: uri }} />
				<Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>
					Grid
				</Text>
				<Text
					style={{
						fontWeight: 'bold',
						color: '#000000',
						fontSize: 35,
						marginTop: -25,
						marginLeft: 20
					}}>
					mall
				</Text>
				<Text note style={[styles.userName, { marginTop: -20 }]}>
					{user.user && user.user.displayName}
				</Text>
				<Text numberOfLines={1} note style={styles.userName}>
					{user.user && user.user.email}
				</Text>
			</View>
			<DrawerContentScrollView {...props}>
				{data.getAccess.map((route: any, index: number) => (
					<DrawerItem
						key={index}
						style={{ marginTop: -10 }}
						icon={({ size = 26 }) => (
							<Icon
								style={{
									color: 'white',
									fontSize: size
								}}
								type={route.typeIcon}
								name={route.icon}
							/>
						)}
						label={() => (
							<Text
								numberOfLines={1}
								style={{ color: 'white', ...styles.items }}>
								{route.name}
							</Text>
						)}
						onPress={() => navigation.navigate(route.route)}
					/>
				))}
			</DrawerContentScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	items: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: -10
	},
	profile: {
		height: 300,
		flex: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	userName: {
		textAlign: 'center',
		width: '90%',
		color: '#fff',
		fontWeight: 'bold'
	},
	avatar: {
		width: 150,
		height: 150
	}
});

export default CustomDrawerContent;
