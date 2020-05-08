/** @format */

import * as React from 'react';
//import { View } from 'native-base';
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity
} from 'react-native';

interface PaperImageProps {
	description?: string;
	onPress?: () => void;
	title: string;
	uri: string;
	vertical?: boolean;
}

const PaperImage: React.SFC<PaperImageProps> = props => {
	const { description, title, uri, vertical, onPress } = props;
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				style={
					vertical
						? { width: '100%', marginRight: 10, height: 150 }
						: styles.headerImage
				}>
				<ImageBackground
					source={{ uri: uri }}
					imageStyle={{ borderRadius: 10 }}
					style={styles.image}>
					<View style={styles.background}>
						<Text style={styles.text}>{title.toUpperCase()}</Text>
						<Text style={styles.description}>{description}</Text>
					</View>
				</ImageBackground>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		borderRadius: 10,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},

	image: {
		borderRadius: 10,
		flex: 1,
		resizeMode: 'cover'
	},
	text: {
		textAlign: 'center',
		width: '80%',
		color: '#ffff',
		fontWeight: 'bold',
		fontSize: 13
	},

	description: {
		color: '#ffff',
		width: 350,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 10
	},
	headerImage: {
		width: 122.5,
		backgroundColor: 'red',
		borderRadius: 10,
		//width: 200,
		height: 100
	}
});

export default PaperImage;
