/** @format */

import * as React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export interface HomeRegisterProps {}

const HomeRegister: React.SFC<HomeRegisterProps> = () => {
	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				style={{ flex: 1 }}
				source={{
					uri:
						'https://previews.123rf.com/images/romastudio/romastudio1602/romastudio160200293/52915695-foto-de-la-comida-org%C3%A1nica-fondo-del-estudio-de-diferentes-verduras-en-mesa-de-madera.jpg'
				}}>
				<View style={styles.background}>
					<View
						style={{
							position: 'absolute',
							left: 30,
							top: 50
						}}>
						<Text style={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>
							Grid
						</Text>
						<Text
							style={{
								fontSize: 50,
								marginTop: -38,
								marginLeft: 1,
								fontWeight: 'bold',
								color: '#75F075'
							}}>
							mall
						</Text>
					</View>
					<View style={{ position: 'absolute', left: 30, bottom: 120 }}>
						<Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>
							Únete a GridMall
						</Text>
						<Text style={{ fontSize: 13, width: '45%', color: '#fff' }}>
							Te ayudaremos a crear una cuenta en pocos pasos
						</Text>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 18
	},

	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		width: '100%',
		position: 'relative'

		// justifyContent: 'center',
		// alignItems: 'center'
	}
});

export default HomeRegister;
