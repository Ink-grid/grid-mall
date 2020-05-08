/** @format */

import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'native-base';

export interface PortadaProps {
	title: string;
	uri: string;
	description: string;
	styleRoot?: any;
}

const Portada: React.SFC<PortadaProps> = props => {
	const { title, uri, description, styleRoot } = props;
	return (
		<View style={styleRoot || styles.container}>
			<Image
				style={styles.headerImage}
				source={{
					uri: uri
				}}
			/>
			<View style={styles.contentText}>
				<Text style={styles.text}>{title.toUpperCase()}</Text>
				<Text style={styles.descipcion}>{description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	contentText: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		width: '100%',
		alignItems: 'center',
		height: '100%',
		justifyContent: 'center',
		top: 0,
		left: 0
	},
	text: {
		color: '#ffff',
		fontWeight: 'bold',
		fontSize: 20
	},
	descipcion: {
		color: '#ffff',
		width: 350,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 13
	},
	container: {
		flex: 0,
		height: 150
	},
	headerImage: {
		flex: 0,
		height: '100%',
		width: '100%'
	}
});

export default Portada;
