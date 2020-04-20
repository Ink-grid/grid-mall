/** @format */

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';

export interface ErrorProps {
	onPress?: () => void;
	title: string;
}
const Error: React.SFC<ErrorProps> = props => {
	const { onPress, title } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Se produjo un error</Text>
			<Text style={styles.description}>
				{title} no está disponible. Es posible que un error del sistema o tu
				conexión a internet evite la carga de los datos. Actualiza la página y
				vuelva a intentarlo
			</Text>
			<Button onPress={onPress}>
				<Text style={{ padding: 5, color: '#fff' }}>Intentar de nuevo</Text>
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

	title: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 20
	},
	description: {
		width: '80%',
		textAlign: 'center',
		fontSize: 15,
		color: '#fff'
	}
});

export default Error;
