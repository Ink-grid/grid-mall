/** @format */

import * as React from 'react';
import { Button, Left, Icon, Body, Header, Title, Right } from 'native-base';
//import { useIsDrawerOpen } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';

type RightType = {
	iconName: string;
	iconType: any;
	actions: () => void;
};

type backgroundType =
	| 'white'
	| 'silver'
	| 'gray'
	| 'maroon'
	| 'olive'
	| 'lime'
	| 'green'
	| 'aqua'
	| 'teal'
	| 'navy'
	| 'fuchsia'
	| 'purple'
	| 'default';

export interface HeaderComponentProps {
	title?: string;
	leftActions?: RightType;
	rightItems?: Array<RightType>;
	androidStatusBarColor?: string;
	background?: backgroundType;
	badge?: React.ReactChild;
}

const HeaderComponent: React.SFC<HeaderComponentProps> = props => {
	const {
		leftActions,
		rightItems,
		androidStatusBarColor = '#000000',
		title,
		badge,
		background = 'white'
	} = props;

	const getBackgorundColor = (name: string) => {
		switch (name) {
			case 'white':
				return '#FFFFFF';
			case 'silver':
				return '#C0C0C0';
			case 'gray':
				return '#808080';
			case 'maroon':
				return '#800000';
			case 'olive':
				return '#808000';
			case 'lime':
				return '#00FF00';
			case 'green':
				return '#008000';
			case 'aqua':
				return '#00FFFF';
			case 'teal':
				return '#008080';
			case 'navy':
				return '#000080';
			case 'fuchsia':
				return '#FF00FF';
			case 'purple':
				return '#800080';
			// n colores ...
			default:
				return '#ffffff';
		}
	};

	return (
		<Header
			noShadow
			androidStatusBarColor={androidStatusBarColor}
			style={[
				background === 'default'
					? null
					: { backgroundColor: getBackgorundColor(background) }
			]}>
			<Left>
				{leftActions && (
					<Button onPress={leftActions.actions} transparent>
						<Icon
							style={[
								background === 'white' ? styles.white : { color: '#FFFFFF' }
							]}
							type={leftActions.iconType}
							name={leftActions.iconName}
						/>
					</Button>
				)}
			</Left>

			<Body>
				<Title
					style={[
						background === 'white' ? styles.white : { color: '#FFFFFF' }
					]}>
					{title}
				</Title>
			</Body>
			{rightItems && (
				<Right>
					{rightItems.map((item, index) => (
						<Button key={index} onPress={item.actions} transparent>
							<Icon
								style={[
									background === 'white' ? styles.white : { color: '#FFFFFF' }
								]}
								type={item.iconType}
								name={item.iconName}
							/>
						</Button>
					))}
				</Right>
			)}

			{badge && <Right>{badge}</Right>}
		</Header>
	);
};

const styles = StyleSheet.create({
	white: {
		color: '#000000'
	}
});

export default HeaderComponent;
