/** @format */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Thumbnail, Text, Icon, Button, Spinner } from 'native-base';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useQuery } from '@apollo/react-hooks';

let uri =
	'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbEApV58sm7vioX-LBvzTljUrvFjXJ8YhlaM9R2yRbTcLEztQS&usqp=CAU';

export interface CustomDrawerContentProps {
	navigation?: any;
	query?: any;
	useruid: string;
}

const CustomDrawerContent: React.SFC<CustomDrawerContentProps> = props => {
	const { navigation, query, useruid } = props;

	const { loading, error, data, refetch } = useQuery(query, {
		variables: { uid: useruid }
	});

	if (error && !loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center',
					backgroundColor: '#fff'
				}}>
				<Text note>
					Ocurrio un error inesperado, revise su conexeón a internet.
				</Text>
				<Button onPress={() => refetch()}>
					<Text>Volver a intentar</Text>
				</Button>
			</View>
		);
	}

	if (loading && !data) {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: '#fff',
					justifyContent: 'center',
					alignContent: 'center',
					alignItems: 'center'
				}}>
				<Spinner></Spinner>
			</View>
		);
	}

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
				<Text note style={[styles.userName, { marginTop: 5 }]}>
					{data.getClient.razon_social}
				</Text>
				<Text
					numberOfLines={1}
					note
					style={[styles.userName, { marginTop: 1 }]}>
					{data.getClient.email}
				</Text>
			</View>
			<DrawerContentScrollView {...props}>
				{data.getClient.user.access.map((route: any, index: number) => (
					<DrawerItem
						key={index}
						style={[index !== 0 ? { marginTop: -10 } : { marginTop: 5 }]}
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
