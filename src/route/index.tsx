/** @format */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerItem,
	DrawerContentScrollView
} from '@react-navigation/drawer';
import { StoreContext } from '../context/StoreContext';
import { Root, Thumbnail } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import SignIn from '../views/SignIn';
import Home from '../views/Home';
import { Entypo } from '@expo/vector-icons';
import RecomenDesc from '../views/RecomenDesc/index';
import Register from '../views/Register';
// import views
export interface RouteProps {}

// create new instance of drawer navigation
const Stack = createDrawerNavigator();

const Route: React.SFC<RouteProps> = () => {
	const { state } = React.useContext(StoreContext);

	const CustomDrawerContent = (props: any) => {
		let uri =
			'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRbEApV58sm7vioX-LBvzTljUrvFjXJ8YhlaM9R2yRbTcLEztQS&usqp=CAU';
		return (
			<>
				<View style={styles.profile}>
					<Thumbnail large source={{ uri: uri }} />
					<Text style={styles.userName}>
						{state.user && state.user.displayName}
					</Text>
					<Text style={styles.userName}>{state.user && state.user.email}</Text>
				</View>
				<DrawerContentScrollView {...props}>
					<DrawerItem
						icon={({ size = 26 }) => (
							<Entypo color='#1A2138' size={size} name={'shopping-bag'} />
						)}
						label={({ color }) => (
							<Text style={{ color: color, ...styles.items }}>Mi cesta</Text>
						)}
						onPress={() => props.navigation.closeDrawer()}
					/>
				</DrawerContentScrollView>
			</>
		);
	};

	if (state.isLoading) {
		return (
			<View>
				<Text>cargando</Text>
			</View>
		);
	}
	return (
		<Root>
			<NavigationContainer>
				<Stack.Navigator
					drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
					{state.userToken !== null ? (
						<>
							<Stack.Screen name='Home' component={Home} />
							<Stack.Screen
								name='RecomenDesc'
								component={RecomenDesc}
								options={{ swipeEnabled: false }}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name='SignIn'
								component={SignIn}
								options={{ swipeEnabled: false }}
							/>
							<Stack.Screen
								name='Register'
								component={Register}
								options={{ swipeEnabled: false }}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</Root>
	);
};

const styles = StyleSheet.create({
	items: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: -10
	},
	profile: {
		height: 250,
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#1A2138'
	},
	userName: {
		color: '#fff',
		fontWeight: 'bold'
	},
	avatar: {
		width: 150,
		height: 150
	}
});

export default Route;
