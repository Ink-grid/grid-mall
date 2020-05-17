/** @format */

import * as React from 'react';
import {
	Container,
	ActionSheet,
	View,
	Text,
	Button,
	Icon,
	Thumbnail
} from 'native-base';
import HeaderComponent from '../../../components/Header';
import Carousel from '../../../components/Carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomList from '../../../components/CustomList';
import gql from 'graphql-tag';
import Portada from '../../../components/Portada';

export interface HomeProps {
	navigation: any;
}

type category = {
	_uid: string;
	uri: string;
	title: string;
	description: string;
};

const query = gql`
	{
		categories {
			_uid
			uri
			title
			description
		}
	}
`;

const Home: React.SFC<HomeProps> = props => {
	const { navigation } = props;

	//[*] determinamos los botones de nuestro menu
	let butttonOptions = [
		{ text: 'Perfil', icon: 'ios-person' },
		{ text: 'Privacidad', icon: 'ios-lock' },
		{ text: 'Ayuda y soporte técnico', icon: 'ios-help-circle-outline' },
		{ text: 'Cerrar sesión', icon: 'ios-log-out' },
		{ text: 'Cancel', icon: 'close' }
	];

	//[*] creamos una funcion para obtener la accion de nuetro menu,como parametro principal recibe un number.
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
				navigation.navigate('Logout');
				break;
			default:
				break;
		}
	};

	return (
		<Container style={{ backgroundColor: '#E9EEE8' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'menu',
					iconType: 'Entypo',
					actions: () => navigation.openDrawer()
				}}
				background='white'
				title='GridMall'
				rightItems={[
					{
						// este icono lo obtengo de esta url -> https://icons.expo.fyi/
						iconName: 'more-vertical',
						iconType: 'Feather',
						// [*] mostramos el menu de opciones, para ello usaremos el componente ActionSheet saber mas -> https://docs.nativebase.io/Components.html#actionsheet-def-headref
						actions: () =>
							ActionSheet.show(
								{
									// @options se encargara de mostrar nuestros botones que son @butttonOptions
									options: butttonOptions,
									// le indicamos que el botton de la poscion 4, sera el encargado de cancelar nuestro menu
									cancelButtonIndex: 4,
									title: 'Configuración de usuario'
								},
								// recuperamos el indice del menu precionado por el usuario, y de acuerdo a ello generamos nuestra acción
								buttonIndex => {
									//[*] es aqui donde utilizamos nuestra funcion @ optionsActionsAsync para retornar
									// la acción del botton
									optionsActionsAsync(buttonIndex);
								}
							)
					}
				]}
			/>

			<View style={{ padding: 5, paddingTop: 10 }}>
				<Carousel
					style='Slide'
					auto
					bulletTheme='white'
					transparent
					bulledPosition={{ bottom: 0 }}
					items={[
						{
							component: (
								<View
									style={{
										width: '100%',
										height: '100%',
										borderRadius: 8,
										padding: 10,
										backgroundColor: '#142215'
									}}>
									<Text style={{ color: '#1A751B', fontWeight: 'bold' }}>
										Aviso importante
									</Text>
									<Text style={{ color: '#fff', fontSize: 10, width: '60%' }}>
										Para grid mall la seguridad es una prioridad. Desde este
										16/03 y hasta nuevo aviso, las compras diarias no estan
										perimitidas
									</Text>
									<Button
										transparent
										style={{ marginTop: '5%' }}
										onPress={() => alert('hola')}>
										<Text
											style={{
												color: '#fff'
											}}>
											Sigue los consejos de salud emitido por el gobierno
										</Text>
									</Button>
								</View>
							)
						},
						{
							component: (
								<View
									style={{
										width: '100%',
										height: '100%',
										borderRadius: 8,
										padding: 10,
										backgroundColor: '#362849'
									}}>
									<Text
										style={{
											paddingLeft: 10,
											color: '#fff',
											fontWeight: 'bold',
											fontSize: 20
										}}>
										!Hola!
									</Text>
									<Text
										style={{
											color: '#fff',
											fontSize: 13,
											paddingLeft: 10,
											width: '60%'
										}}>
										Ingresa aquí para ver consejos útiles de como usar la app
									</Text>
									<View style={{ paddingLeft: 10 }}>
										<Button
											iconRight
											style={{
												width: '50%',
												height: 30,
												marginTop: 10,
												backgroundColor: '#1A751B'
											}}
											onPress={() => alert('hola')}>
											<Text
												style={{
													textTransform: 'lowercase',
													color: '#fff'
												}}>
												Dale click aqui
											</Text>
											<Icon
												name='arrowright'
												style={{ color: '#fff' }}
												type='AntDesign'
											/>
										</Button>
										<View style={{ marginTop: 10 }}>
											<Text
												style={{
													color: '#fff',
													fontSize: 21,
													fontWeight: 'bold'
												}}>
												Grid
											</Text>
											<Text
												style={{
													fontWeight: 'bold',
													color: '#1A751B',
													fontSize: 30,
													marginTop: -20
												}}>
												mall
											</Text>
										</View>
									</View>
								</View>
							)
						}
					]}
				/>
			</View>

			<CustomList
				query={query}
				resolve='categories'
				renderIten={(data: [category]) => (
					<View style={{ padding: 1, paddingTop: 0 }}>
						<Carousel
							style='stats'
							title='Categorias'
							auto
							delay={4000}
							bulledPosition={{ top: 0, justifyContent: 'flex-end' }}
							PerInterval={3}
							items={data}
							renderItem={(data: category) => (
								<TouchableOpacity
									onPress={() => navigation.jumpTo('Shoping', data)}>
									<View
										style={{
											paddingTop: 10,
											width: 120
											//width: '100%'
										}}>
										<Portada title={data.title} uri={data.uri} />
									</View>
								</TouchableOpacity>
							)}
						/>
					</View>
				)}
			/>
		</Container>
	);
};

export default Home;
