/** @format */

import * as React from 'react';
import { Container, Text } from 'native-base';
import { View } from 'react-native';
import Stepper, { ProgressStep } from '../../../components/Stepper';
import HeaderComponent from '../../../components/Header';

export interface TransportProps {
	navigation: any;
}

const Transport: React.SFC<TransportProps> = props => {
	const { navigation } = props;

	const [state, setState] = React.useState({
		isValid: false,
		errors: false
	});

	const onNextStep = () => {
		if (!state.isValid) {
			setState(prevs => ({ ...prevs, errors: true }));
		} else {
			setState(prevs => ({ ...prevs, errors: false }));
		}
	};

	// debug
	console.log(navigation);

	const buttonTextStyle = {
		color: '#7DFF63'
	};

	return (
		<Container>
			<HeaderComponent title='prueba' background='green'></HeaderComponent>
			<View style={{ flex: 1 }}>
				<Stepper>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 1!</Text>
						</View>
					</ProgressStep>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 2!</Text>
						</View>
					</ProgressStep>
					<ProgressStep
						nextBtnTextStyle={buttonTextStyle}
						previousBtnTextStyle={buttonTextStyle}>
						<View style={{ alignItems: 'center' }}>
							<Text>This is the content within step 3!</Text>
						</View>
					</ProgressStep>
				</Stepper>
			</View>
		</Container>
	);
};

export default Transport;
