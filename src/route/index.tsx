/** @format */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { StoreContext } from '../context/StoreContext';
import { Root, Spinner, View, Text, Button } from 'native-base';
import Animated from 'react-native-reanimated';
import CustomDrawerContent from './CustomDrawerContent';

// import views
import SignIn from '../views/SignIn';
import Register from '../views/Register';
import Loguot from '../views/Logout';
import {
	Home,
	Products,
	Profile,
	Orders,
	Clients,
	Contracts,
	Transport
} from '../views/proveedores';

import {
	HomeClient,
	ProductsClient,
	DashboardClient,
	OrdersClient,
	ProfileCliente
} from '../views/Clients';

import Prueba from '../views/proveedores/Prueba';
import Usuarios from '../views/Register/Usuarios';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Shoping from '../views/Clients/Shoping';
import ConfirOrders from '../views/Clients/ComfirOrders';

//import  home de proveedores, ayuda, perfil, terminos y condiciones
import AyudaSoporte from '../views/proveedores/Home/ayudaSoporte';
import TerminosCondiciones from '../views/proveedores/Home/terminosCondiciones/index';
import Perfil from '../views/proveedores/Home/perfil';

// import views
export interface RouteProps {}
interface ScreensProps {
	style: any;
}

const Drawer = createDrawerNavigator();
const Stacks = createStackNavigator();

// obtenemos las rutas y los datos del cliente
const query = gql`
	query($uid: String!) {
		getClient(uid: $uid) {
			razon_social
			email
			user {
				type
				access {
					icon
					name
					route
					typeIcon
				}
			}
		}
	}
`;

const Route: React.SFC<RouteProps> = () => {
	const { state } = React.useContext(StoreContext);
	const [progress, setProgress] = React.useState(new Animated.Value(0));
	const [isError, setError] = React.useState(true);

	// [*] CREATE ANIMATION FOR SCAELE
	const scale = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [1, 0.8]
	});

	//animate the broderRdius of the scene screens
	const borderRadius = Animated.interpolate(progress, {
		inputRange: [0, 1],
		outputRange: [0, 10]
	});

	const screenStyles = { borderRadius, transform: [{ scale }] };

	const Screens: React.SFC<ScreensProps> = props => {
		const { loading, error, data, refetch } = useQuery(query, {
			variables: { uid: state.userToken }
		});

		if (error && !loading) {
			setError(false);
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
			setError(false);
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

		if (data) {
			setError(true);
		}
		return (
			<Animated.View style={[{ flex: 1, overflow: 'hidden' }, props.style]}>
				<Stacks.Navigator
					screenOptions={{
						headerShown: false
					}}
					initialRouteName='HomeClie'>
					{/* navigation prooveedore */}

					{getRoute(data.getClient.user.type)}
				</Stacks.Navigator>
			</Animated.View>
		);
	};

	const getRoute = (type: string) => {
		switch (type) {
			case 'clientes':
				return (
					<>
						<Stacks.Screen name='HomeClie' component={HomeClient} />
						<Stacks.Screen name='OrdersClie' component={OrdersClient} />
						<Stacks.Screen name='ProductsClie' component={ProductsClient} />
						<Stacks.Screen name='ProfileClie' component={ProfileCliente} />
						<Stacks.Screen name='DashboardClie' component={DashboardClient} />
					</>
				);
			default:
				return (
					<>
						<Stacks.Screen name='Home' component={Home} />
						<Stacks.Screen name='Products' component={Products} />
						<Stacks.Screen name='Profile' component={Profile} />
						<Stacks.Screen name='Orders' component={Orders} />
						<Stacks.Screen name='Clients' component={Clients} />
						<Stacks.Screen name='Contracts' component={Contracts} />
						<Stacks.Screen name='Transport' component={Transport} />
						<Stacks.Screen name='Prueba' component={Prueba} />
					</>
				);
		}
	};

	if (state.isLoading) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Spinner />
			</View>
		);
	}
	return (
		<Root>
			<LinearGradient style={{ flex: 1 }} colors={['#75F075', '#1C3A1C']}>
				<NavigationContainer>
					<Drawer.Navigator
						unmountInactiveRoutes={true}
						drawerType={'slide'}
						overlayColor='transparent'
						drawerStyle={{ width: '50%', backgroundColor: 'transparent' }}
						contentContainerStyle={{ flex: 1 }}
						drawerContentOptions={{
							activeBackgroundColor: 'transparent',
							activeTincolor: 'green',
							inactiveTincolor: 'greem'
						}}
						navigationOptions={{
							header: null
						}}
						sceneContainerStyle={{ backgroundColor: 'transparent' }}
						drawerContent={(props: any) => {
							setProgress(props.progress);
							return (
								<CustomDrawerContent
									query={query}
									useruid={state.userToken}
									{...props}
								/>
							);
						}}>
						{state.userToken !== null ? (
							<>
								<Drawer.Screen
									name='Screens'
									options={{ swipeEnabled: isError }}>
									{() => <Screens style={screenStyles} />}
								</Drawer.Screen>

								<Drawer.Screen
									name='Logout'
									options={{ swipeEnabled: false }}
									component={Loguot}
								/>

								<Drawer.Screen
									name='Shoping'
									options={{ swipeEnabled: false }}
									component={Shoping}
								/>

								<Drawer.Screen
									name='confirOrders'
									options={{ swipeEnabled: false }}
									component={ConfirOrders}
								/>

								{/* <Drawer.Screen
									name='Shoping'
									component={Shoping}
									options={{ swipeEnabled: false }}
								/> */}
							</>
						) : (
							<>
								<Drawer.Screen
									name='SignIn'
									component={SignIn}
									options={{ swipeEnabled: false }}
								/>

								<Drawer.Screen
									name='UserOption'
									component={Usuarios}
									options={{ swipeEnabled: false }}
								/>

								<Drawer.Screen
									name='Register'
									component={Register}
									options={{ swipeEnabled: false }}
								/>
							</>
						)}
					</Drawer.Navigator>
				</NavigationContainer>
			</LinearGradient>
		</Root>
	);
};

export default Route;
