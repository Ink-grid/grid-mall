/** @format */

import * as React from 'react';
import {
	AsyncStorage,
	StyleSheet,
	ScrollView,
	SafeAreaView
} from 'react-native';
import {
	Button,
	Container,
	Header,
	ActionSheet,
	Left,
	Body,
	Title,
	Right,
	Icon,
	View
} from 'native-base';
import { StoreContext } from '../../context/StoreContext';
import Ofertas from '../../components/Ofertas';
import Recetas from '../../components/Recetas';
import Category from '../../components/Category';
import Recomendaciones from '../../components/Recomendaciones';
export interface HomeProps {
	navigation: any;
}

const Home: React.SFC<HomeProps> = props => {
	const { navigation } = props;
	const { actions } = React.useContext(StoreContext);

	const logoutAscyn = async () => {
		await AsyncStorage.removeItem('userToken');
		await AsyncStorage.removeItem('user');
		actions.signOut();
	};

	let butttonOptions = [
		{ text: 'Perfil', icon: 'ios-person' },
		{ text: 'Privacidad', icon: 'ios-lock' },
		{ text: 'Ayuda y soporte técnico', icon: 'ios-help-circle-outline' },
		{ text: 'Cerrar sesión', icon: 'ios-log-out' },
		{ text: 'Cancel', icon: 'close' }
	];

	const optionsActionsAsync = async (index: number) => {
		switch (index) {
			case 0:
				alert('profile');
				break;
			case 1:
				alert('privacidad');
				break;
			case 2:
				alert('ayuda');
				break;
			case 3:
				await logoutAscyn();
				break;
			default:
				break;
		}
	};

	return (
		<Container style={{ backgroundColor: '#1A2138' }}>
			<Header noShadow androidStatusBarColor='#1A2138' transparent>
				<Left>
					<Button transparent onPress={() => navigation.openDrawer()}>
						<Icon name='menu' />
					</Button>
				</Left>
				<Body>
					<Title>inkmarket</Title>
				</Body>
				<Right>
					<Button transparent>
						<Icon name='search' />
					</Button>
					<Button transparent>
						<Icon name='heart' />
					</Button>
					<Button
						transparent
						onPress={() =>
							ActionSheet.show(
								{
									options: butttonOptions,
									cancelButtonIndex: 4,
									title: 'Configuración de usuario'
								},
								buttonIndex => {
									optionsActionsAsync(buttonIndex);
								}
							)
						}>
						<Icon name='more' />
					</Button>
				</Right>
			</Header>

			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.scrollView}>
					<Recomendaciones navigation={navigation} />
					<View style={{ height: 10 }}></View>
					<Category />
					<Recetas />
					<Ofertas />
				</ScrollView>
			</SafeAreaView>

			{/* <Button onPress={logoutAscyn}>
				<Text>Logout</Text>
			</Button> */}
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		flex: 1,
		resizeMode: 'cover'
	},
	scrollView: {
		backgroundColor: '#1A2130'
	},
	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default Home;
