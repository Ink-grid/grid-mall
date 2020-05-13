/** @format */

import * as React from 'react';
import { View } from 'react-native';
import PaperImage from '../../../components/PaperImage';
import { Container } from 'native-base';
import HeaderComponent from '../../../components/Header';

export interface UsuariosProps {
	navigation: any;
}

const Usuarios: React.SFC<UsuariosProps> = props => {
	const { navigation } = props;
	return (
		<Container style={{ backgroundColor: '#fff' }}>
			<HeaderComponent
				leftActions={{
					iconName: 'arrowleft',
					iconType: 'AntDesign',
					actions: () => navigation.goBack()
				}}></HeaderComponent>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				{[
					{
						uri:
							'https://www.esan.edu.pe/conexion/actualidad/2020/03/09/1500x844_gestion_proveedores.jpg',
						title: 'Proveedor',
						description:
							'se parte de nuestros servicios para facilitar tus ventas al por mayor con las mejores herramientas'
					},
					{
						uri: 'https://lyd.org/wp-content/uploads/2019/03/consumidor.jpg',
						title: 'Consumidor',
						description:
							'En grid mall encontrars los mejores productos de primera necesidad al por mayor de los mejores proveedore de lima'
					}
				].map(ele => (
					<View key={ele.uri} style={{ padding: 10, width: '90%' }}>
						<PaperImage
							onPress={() => navigation.navigate('Register')}
							vertical
							description={ele.description}
							title={ele.title}
							uri={ele.uri}></PaperImage>
					</View>
				))}
			</View>
		</Container>
	);
};

export default Usuarios;
