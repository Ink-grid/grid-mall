/** @format */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { StoreContext } from '../context/StoreContext';
import { Root, Spinner, View } from 'native-base';
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
import { Platform } from 'react-native';
import Prueba from '../views/proveedores/Prueba';
import Usuarios from '../views/Register/Usuarios';

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

const Route: React.SFC<RouteProps> = () => {
	const { state } = React.useContext(StoreContext);
	const [progress, setProgress] = React.useState(new Animated.Value(0));

	// [*] CREATE ANIMATION FOR SCALE

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

	const Screens: React.SFC<ScreensProps> = props => (
		<Animated.View style={[{ flex: 1, overflow: 'hidden' }, props.style]}>
			<Stacks.Navigator
				screenOptions={{
					headerShown: false
				}}>
				<Stacks.Screen name='Home' component={Home} />
				<Stacks.Screen name='Products' component={Products} />
				<Stacks.Screen name='Profile' component={Profile} />
				<Stacks.Screen name='Orders' component={Orders} />
				<Stacks.Screen name='Clients' component={Clients} />
				<Stacks.Screen name='Contracts' component={Contracts} />
				<Stacks.Screen name='Transport' component={Transport} />
				<Stacks.Screen name='Logout' component={Loguot} />
				<Stacks.Screen name='Prueba' component={Prueba} />
				<Stacks.Screen name='Perfil' component={Perfil} /> 
				<Stacks.Screen name='AyudaSoporte' component={AyudaSoporte} />
				<Stacks.Screen name='TerminosCondiciones' component={TerminosCondiciones} />				
			</Stacks.Navigator>
		</Animated.View>
	);

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
							return <CustomDrawerContent user={state} {...props} />;
						}}>
						{state.userToken !== null ? (
							<>
								<Drawer.Screen name='Screens'>
									{() => <Screens style={screenStyles} />}
								</Drawer.Screen>

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
