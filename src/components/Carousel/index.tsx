/** @format */

import * as React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import Slide from './styles/Slide';
import Stat from './styles/Stat';
import { useInterval } from '../../Hooks';

export interface CarouselProps {
	items: any;
	style: 'stats' | 'Slide';
	transparent?: boolean;
	title?: string;
	bulletTheme?: 'dark' | 'white';
	PerInterval?: number;
	renderItem?: (data: any, index?: number) => React.ReactChild;
	auto?: boolean;
	delay?: number;
	bulledPosition?: any;
	nextAction?: (next: () => void) => React.ReactChild;
}

const Carousel: React.SFC<CarouselProps> = props => {
	const scroolRef = React.useRef<any>();

	const {
		items,
		style,
		PerInterval = 1,
		renderItem,
		bulletTheme = 'dark',
		transparent = false,
		bulledPosition = { top: 0 },
		auto = false,
		delay = 3000,
		nextAction,
		title
	} = props;

	//[*] items perInterval default 1
	const itemsPerInterval = PerInterval;
	const [interval, setInterval] = React.useState<any>(1);
	const [intervals, setIntervals] = React.useState(1);
	const [width, setWidth] = React.useState(0);
	const [fraction, setFraction] = React.useState(0);

	const init = (width: number) => {
		//[*] initialise width
		setWidth(width);
		//[*] initialise total intervals
		const totalItems = items.length;
		setIntervals(Math.ceil(totalItems / itemsPerInterval));
	};

	const getInterval = (offset: any) => {
		for (let i = 1; i <= intervals; i++) {
			if (offset + 1 < (width / intervals) * i) {
				return i;
			}
			if (i == intervals) {
				return i;
			}
		}
	};

	let bullets = [];
	for (let i = 1; i <= intervals; i++) {
		bullets.push(
			<Text
				key={i}
				style={[
					{
						...styles[bulletTheme],
						opacity: interval === i ? 0.5 : 0.1
					}
				]}>
				&bull;
			</Text>
		);
	}

	// [*] función para especificar a la siguiente vista
	const stepperPlay = () => {
		//[*] seteamos el valor del fracionamiento
		setFraction(prevs =>
			prevs > width - width / intervals
				? width / intervals
				: prevs + width / intervals
		);

		//[*] generemoas el nuevo intervalo para el steeps
		setInterval((prevs: any) => (interval === intervals ? 1 : prevs));

		//[*] movemos el scroll a las coordenas correspodiente
		scroolRef.current.scrollTo({
			animated: true,
			y: 0,
			x: interval === intervals ? 1 : fraction
		});
	};

	useInterval(() => {
		if (auto) {
			stepperPlay();
		}
	}, delay);

	return (
		<>
			<View
				style={[
					styles.container,
					{ backgroundColor: transparent ? 'transparent' : '#fff' }
				]}>
				<ScrollView
					ref={scroolRef}
					horizontal={true}
					contentContainerStyle={{
						...styles.scrollView,
						width: `${100 * intervals}%`
					}}
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(w, h) => init(w)}
					onScroll={data => {
						setWidth(data.nativeEvent.contentSize.width);
						setInterval(getInterval(data.nativeEvent.contentOffset.x));
					}}
					scrollEventThrottle={200}
					pagingEnabled
					decelerationRate='fast'>
					{items.map((item: any, index: number) => {
						switch (style) {
							case 'stats':
								return (
									<Stat key={index} component={renderItem!(item, index)} />
								);
							default:
								return <Slide key={index} component={item.component} />;
						}
					})}
				</ScrollView>
				<View style={[styles.bullets, bulledPosition]}>{bullets}</View>
				{title && (
					<View
						style={[styles.bullets, { top: 0, justifyContent: 'flex-start' }]}>
						<Text>{title}</Text>
					</View>
				)}
			</View>
			{nextAction && (
				<View style={{ marginTop: 20 }}>{nextAction(stepperPlay)}</View>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	statsHead: {
		paddingTop: 10,
		paddingHorizontal: 12
	},
	container: {
		width: '100%',
		borderColor: '#ebebeb',
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: '#fcfcfc',
		shadowOpacity: 1,
		marginTop: 10,
		shadowOffset: {
			width: 0,
			height: 5
		}
	},
	scrollView: {
		display: 'flex',
		flexDirection: 'row',
		overflow: 'hidden'
	},
	bullets: {
		width: '100%',
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		paddingHorizontal: 10,
		paddingTop: 5
	},
	white: {
		fontWeight: 'bold',
		color: '#fff',
		paddingHorizontal: 5,
		fontSize: 20
	},

	dark: {
		fontWeight: 'bold',
		color: 'black',
		paddingHorizontal: 5,
		fontSize: 20
	}
});

export default Carousel;
