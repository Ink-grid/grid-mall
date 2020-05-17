/** @format */

import * as React from 'react';
import {
	Container,
	Text,
	View,
	Button,
	Icon,
	Card,
	ActionSheet
} from 'native-base';
import HeaderComponent from '../../../components/Header';
// import { Alert } from 'react-native';
import Carousel from '../../../components/Carousel';
import { Image, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Perfil from './perfil';
import TerminosCondiciones from './terminosCondiciones';
import AyudaSoporte from './ayudaSoporte';

export interface HomeProps {
	navigation: any;
}

const Home: React.SFC<HomeProps> = props => {
	// recuperar los parametros
	const { navigation } = props;

	// creamos los datos de las noticias
	/*primero determinaremos datos fictisios para crear el componente*/
	/* data de noticias, que despues seran remplazados por la respuesta del servidor */
	const data = [
		{
			title: 'noticia 1',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 1'
		},
		{
			title: 'noticia 2',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 2'
		},
		{
			title: 'noticia 3',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 3'
		},
		{
			title: 'noticia 4',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 4'
		},
		{
			title: 'noticia 4',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 4'
		},
		{
			title: 'noticia 4',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 4'
		},
		{
			title: 'noticia 4',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 4'
		},
		{
			title: 'noticia 4',
			url:
				'https://concepto.de/wp-content/uploads/2014/09/agricultura-e1551193452226.jpg',
			description: 'esto es una prueba de noticia 4'
		}
	];

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
				navigation.navigate('Perfil');
				//alert('profile');
				break;
			case 1:
				navigation.navigate('TerminosCondiciones');
				//alert('privacidad');
				break;
			case 2:
				navigation.navigate('AyudaSoporte');
				//alert('ayuda');
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
			{/* este componente crea el header de la vista no es necesatio que crees otro header como lo que hiciste que 
			es header_home, para implementar iconos url -> https://icons.expo.fyi/ */}

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

			{/*[*] envolvemos todo en un scroll view para tener el efecto de deslizamiento  saber mas -> https://reactnative.dev/docs/scrollview */}

			<ScrollView>
				{/* implementacion de mensage de bienvenida utilizando el componente carrousel */}
				{/* [*] pasos para usar el componente carousel */}
				{/*  @bulledPosition: hace referencia a los ... del carousel que va a mostrat */}
				{/*  existe dos stylos para el carousel que son @Slide y @stats */}
				{/* @auto sigfica que el carrousel se ejecutara 3 segundos de intervalo */}
				{/* @items es un array de objetos que recive un solo parametro que es @component : React Child  */}
				{/* con esto logramos crear un carrousel de bienvenida personalisado */}

				{/*[+] determinamos los siguiente estelios al padre del carousel. saber mas -> Readme */}
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

				<Text style={{ fontWeight: 'bold', padding: 5, paddingLeft: 10 }}>
					Noticias:
				</Text>

				{/*[*] seccion de noticias */}
				{/* [*] para mostrar las noticias utilizamos el componente de @FlatList saber mas ->  https://reactnative.dev/docs/flatlist */}

				<FlatList
					style={{ padding: 5 }}
					key='product'
					numColumns={2}
					keyExtractor={(item, index) => index.toString()}
					// @data recive conjunto de datos para mostrar
					data={data}
					renderItem={({ item }) => (
						// contenedor del template
						// ocupamos el 50% porciento de la pantalla para terner un mager horizonta como en el diseño
						<Card style={{ width: '50%' }}>
							{/* // header del template */}
							<View style={{ padding: 10 }}>
								{/* // pintamos el titulo de la noticia y la descripción */}
								<Text>{item.title}</Text>
								<Text note>{item.description}</Text>
							</View>

							{/* creamos el contenedor de la imagen. para ello utilizamos el componente Image de react native  sabe mas -> https://reactnative.dev/docs/image */}
							<View style={{ height: 100 }}>
								<Image
									style={{ flex: 0, height: '100%', width: '100%' }}
									source={{
										uri: item.url
									}}
								/>
							</View>
						</Card>
					)}
				/>

				{/* final de la seccion de noticias */}
			</ScrollView>
		</Container>
	);
};

export default Home;
