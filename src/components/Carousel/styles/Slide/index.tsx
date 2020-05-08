/** @format */

import * as React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';

export interface SlideProps {
	// title: string;
	component: any;
}

const Slide: React.SFC<SlideProps> = props => {
	const { component } = props;

	return (
		<View style={styles.slide}>
			{/* <Text style={{ ...styles.slideText }}>{title}</Text> */}
			{component}
		</View>
	);
};

const styles = StyleSheet.create({
	slide: {
		paddingHorizontal: 2,
		//paddingBottom: 10,
		//paddingTop: 30,
		flexBasis: '100%',
		flex: 1,
		maxWidth: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
		height: 200
	}
});

export default Slide;
