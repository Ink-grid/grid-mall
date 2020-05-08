/** @format */

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export interface BadgeProps {
	count: number;
	children: any;
}

const Badge: React.SFC<BadgeProps> = props => {
	const { count, children } = props;
	return (
		<View style={styles.bage}>
			{count > 0 && (
				<View style={styles.inconBagde}>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#fff',
							fontSize: 10,
							padding: 3,
							zIndex: 1
						}}>
						{count}
					</Text>
				</View>
			)}
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	bage: {
		position: 'relative',
		padding: 5
	},

	inconBagde: {
		zIndex: 1,
		position: 'absolute',
		top: 0,
		right: 0,
		minWidth: 18,
		height: 18,
		borderRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#77A765'
	}
});

export default Badge;
