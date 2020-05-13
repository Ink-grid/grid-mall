/** @format */

import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import ProgressButtons from '../ProgressButtons';

export interface ProgressStepProps {
	onNext?: () => boolean;
	label?: string;
	onPrevious?: () => Promise<void>;
	setActiveStep?: (step: number) => void;
	onSubmit?: () => Promise<void>;
	nextBtnText?: string;
	previousBtnText?: string;
	activeStep?: number;
	finishBtnText?: string;
	stepCount?: number;
	nextBtnStyle?: any;
	nextBtnTextStyle?: any;
	nextBtnDisabled?: boolean;
	previousBtnStyle?: any;
	previousBtnTextStyle?: any;
	previousBtnDisabled?: boolean;
	scrollViewProps?: any;
	errors?: boolean;
	removeBtnRow?: boolean;
}

const ProgressStep: React.SFC<ProgressStepProps> = props => {
	const {
		onNext,
		setActiveStep,
		activeStep,
		nextBtnStyle,
		removeBtnRow = false,
		previousBtnText = 'Atras',
		previousBtnDisabled = false,
		scrollViewProps = {},
		previousBtnStyle,
		nextBtnText = 'Siguiente',
		stepCount,
		previousBtnTextStyle,
		finishBtnText = 'Términar',
		nextBtnDisabled = false,
		onPrevious,
		nextBtnTextStyle,
		onSubmit
	} = props;

	// const [isError, setError] = React.useState(false);

	const onNextStep = () => {
		if (onNext && onNext()) {
			setActiveStep && setActiveStep(activeStep! + 1);
		}
		// Return out of method before moving to next step if errors exist.
		// console.log(isError);
		// if (isError) {
		// 	return;
		// }
	};

	const onPreviousStep = () => {
		// Changes active index and calls previous function passed by parent
		onPrevious && onPrevious();

		setActiveStep && setActiveStep(activeStep! - 1);
	};

	const onSubmits = async () => {
		onSubmit && (await onSubmit());
	};

	const renderNextButton = () => {
		const btnStyle = {
			textAlign: 'center',
			padding: 8,

			...nextBtnStyle
		};

		const btnTextStyle = {
			color: '#fff',
			fontSize: 18,
			...nextBtnTextStyle
		};

		const disabledBtnText = {
			color: '#cdcdcd'
		};

		let textStyle = [btnTextStyle];

		if (nextBtnDisabled) textStyle.push(disabledBtnText);

		return (
			<TouchableOpacity
				style={[
					btnStyle,
					{ backgroundColor: '#75F075', padding: 5, borderRadius: 5 }
				]}
				onPress={activeStep === stepCount! - 1 ? onSubmits : onNextStep}
				disabled={nextBtnDisabled}>
				<Text style={textStyle}>
					{activeStep === stepCount! - 1 ? finishBtnText : nextBtnText}
				</Text>
			</TouchableOpacity>
		);
	};

	const renderPreviousButton = () => {
		const btnStyle = {
			textAlign: 'center',
			padding: 8,
			...previousBtnStyle
		};

		const btnTextStyle = {
			color: '#75F075',
			fontSize: 18,
			...previousBtnTextStyle
		};

		const disabledBtnText = {
			color: '#cdcdcd'
		};

		let textStyle = [btnTextStyle];
		if (previousBtnDisabled) textStyle.push(disabledBtnText);

		return (
			<TouchableOpacity
				style={btnStyle}
				onPress={onPreviousStep}
				disabled={previousBtnDisabled}>
				<Text style={textStyle}>{activeStep === 0 ? '' : previousBtnText}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<>
			<View style={{ flex: 1 }}>
				<ScrollView {...scrollViewProps}>{props.children}</ScrollView>

				{removeBtnRow ? null : (
					<ProgressButtons
						renderNextButton={renderNextButton}
						renderPreviousButton={renderPreviousButton}
					/>
				)}
			</View>
		</>
	);
};

export default ProgressStep;
