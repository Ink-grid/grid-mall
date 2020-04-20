/** @format */

import * as React from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	Animated,
	PanResponder
} from 'react-native';

export interface SwiperComponentProps {
	dataSource: Array<any>;
	renderItem: (item: any, key: number) => React.ReactNode;
}

//const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const SwiperComponent: React.SFC<SwiperComponentProps> = props => {
	const { dataSource, renderItem } = props;

	const [state, setState] = React.useState({
		currentIndex: 0
	});

	// new instance Animated
	const position = React.useRef(new Animated.ValueXY()).current;

	// rotate for position
	const rotate = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: ['-10deg', '0deg', '10deg'],
		extrapolate: 'clamp'
	});

	const rotateAndTranslate = {
		transform: [
			{
				rotate: rotate
			},
			...position.getTranslateTransform()
		]
	};

	const nextCardOpacity = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: [1, 0, 1],
		extrapolate: 'clamp'
	});

	const nextCardScale = position.x.interpolate({
		inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
		outputRange: [1, 0.8, 1],
		extrapolate: 'clamp'
	});

	const panResponder = React.useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: (evt, getstureState) => true,
			onPanResponderMove: (evt, getstureState) => {
				position.setValue({ x: getstureState.dx, y: getstureState.dy });
			},
			onPanResponderRelease: (evt, getstureState) => {
				if (getstureState.dx > 120) {
					Animated.spring(position, {
						toValue: { x: SCREEN_WIDTH + 20, y: getstureState.dy },
						useNativeDriver: true
					}).start(() => {
						setState(prevs => ({
							currentIndex:
								dataSource.length - 1 === prevs.currentIndex
									? 0
									: prevs.currentIndex + 1
						}));
						position.setValue({ x: 0, y: 0 });
					});
				} else if (getstureState.dx < -120) {
					Animated.spring(position, {
						toValue: { x: -SCREEN_WIDTH - 20, y: getstureState.dy },
						useNativeDriver: true
					}).start(() => {
						setState(prevs => ({
							currentIndex:
								dataSource.length - 1 === prevs.currentIndex
									? 0
									: prevs.currentIndex + 1
						}));
						position.setValue({ x: 0, y: 0 });
					});
				} else {
					Animated.spring(position, {
						toValue: { x: 0, y: 0 },
						friction: 4,
						tension: 40,
						useNativeDriver: true
					}).start();
					//position.setValue({ x: 0, y: 0 });
				}
			}
		})
	).current;

	const render = () =>
		dataSource
			.map((ele, index) => {
				if (index < state.currentIndex) {
					return null;
				} else if (index === state.currentIndex) {
					return (
						<Animated.View
							key={index}
							{...panResponder.panHandlers}
							style={[
								rotateAndTranslate,
								{
									flex: 1,
									padding: 10,
									position: 'absolute'
								}
							]}>
							{renderItem(ele, index + Math.random())}
						</Animated.View>
					);
				} else {
					return (
						<Animated.View
							key={index}
							{...panResponder.panHandlers}
							style={[
								{
									opacity: nextCardOpacity,
									transform: [{ scale: nextCardScale }],
									flex: 1,
									padding: 10,
									position: 'absolute'
								}
							]}>
							{renderItem(ele, index)}
						</Animated.View>
					);
				}
			})
			.reverse();

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1, borderRadius: 25 }}>{render()}</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default SwiperComponent;
