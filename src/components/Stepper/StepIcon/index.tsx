/** @format */

import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';

export interface StepIconsProps {
	stepCount: number;
	stepNum: number;
	label: string;
	isFirstStep: boolean;
	isLastStep: boolean;

	borderWidth?: number;
	borderStyle?: string;
	activeStepIconBorderColor?: string;

	progressBarColor?: string;
	completedProgressBarColor?: string;

	activeStepIconColor?: string;
	disabledStepIconColor?: string;
	completedStepIconColor?: string;

	labelFontFamily?: string;
	labelColor?: string;
	activeLabelColor?: string;
	completedLabelColor?: string;

	activeStepNumColor?: string;
	completedStepNumColor?: string;
	disabledStepNumColor?: string;

	completedCheckColor?: string;
	isActiveStep?: boolean;
	isCompletedStep?: boolean;
}

const height = Dimensions.get('screen').height;

const StepIcon: React.SFC<StepIconsProps> = props => {
	// console.log(height);
	const {
		isActiveStep,
		borderWidth = 3,
		borderStyle = 'solid',
		activeStepIconBorderColor = '#4BB543',

		progressBarColor = '#ebebe4',
		completedProgressBarColor = '#4BB543',

		activeStepIconColor = 'transparent',
		completedStepIconColor = '#4BB543',
		disabledStepIconColor = '#ebebe4',

		labelColor = 'lightgray',
		activeLabelColor = '#4BB543',
		completedLabelColor = 'lightgray',

		activeStepNumColor = 'black',
		completedStepNumColor = 'black',
		disabledStepNumColor = 'white',

		completedCheckColor = 'white'
	} = props;

	let styles: any;

	// console.log(isActiveStep);

	if (props.isActiveStep) {
		styles = {
			circleStyle: {
				zIndex: 100,
				width: 30,
				height: 30,
				borderRadius: 15,
				backgroundColor: activeStepIconColor,
				borderColor: activeStepIconBorderColor,
				borderWidth: 5,
				bottom: 2
			},
			circleText: {
				zIndex: 100,
				alignSelf: 'center'
			},
			labelText: {
				zIndex: 100,
				textAlign: 'center',
				flexWrap: 'wrap',
				width: 100,
				paddingTop: 2,
				fontFamily: props.labelFontFamily,
				color: activeLabelColor
			},
			leftBar: {
				position: 'absolute',
				top: 25 / 2.22,
				left: 0,
				right: 30 + 8,
				borderTopStyle: borderStyle,
				borderTopWidth: borderWidth,
				borderTopColor: completedProgressBarColor,
				marginRight: 40 / 2 + 2
			},
			rightBar: {
				position: 'absolute',
				top: 40 / 2.22,
				right: 0,
				left: 40 + 8,
				borderTopStyle: borderStyle,
				borderTopWidth: props.borderWidth,
				borderTopColor: progressBarColor,
				marginLeft: 40 / 2 + 2
			},
			stepNum: {
				color: activeStepNumColor
			}
		};
	} else if (props.isCompletedStep) {
		styles = {
			circleStyle: {
				zIndex: 100,
				width: 26,
				height: 26,
				borderRadius: 13,
				backgroundColor: completedStepIconColor
			},
			circleText: {
				alignSelf: 'center',
				top: 1
			},
			labelText: {
				textAlign: 'center',
				flexWrap: 'wrap',
				width: 100,
				paddingTop: 2,
				fontFamily: props.labelFontFamily,
				color: completedLabelColor,
				marginTop: 4
			},
			leftBar: {
				position: 'absolute',
				top: 23 / 2,
				left: 0,
				right: 26 + 8,
				backgroundColor: '#4BB543',
				borderTopStyle: borderStyle,
				borderTopWidth: props.borderWidth,
				borderTopColor: completedProgressBarColor,
				marginRight: 36 / 2 + 4,
				height: 3
			},
			rightBar: {
				position: 'absolute',
				top: 36 / 2,
				right: 0,
				left: 36 + 8,
				borderTopStyle: borderStyle,
				borderTopWidth: props.borderWidth,
				borderTopColor: completedProgressBarColor,
				marginLeft: 36 / 2 + 4
			},
			stepNum: {
				color: completedStepNumColor
			}
		};
	} else {
		styles = {
			circleStyle: {
				width: 26,
				height: 26,
				borderRadius: 13,
				backgroundColor: disabledStepIconColor
			},
			circleText: {
				alignSelf: 'center',
				top: 2
			},
			labelText: {
				textAlign: 'center',
				flexWrap: 'wrap',
				width: 100,
				paddingTop: 2,
				fontFamily: props.labelFontFamily,
				color: labelColor,
				marginTop: 4
			},
			leftBar: {
				position: 'absolute',
				zIndex: 5,
				top: 23 / 2,
				left: 10,
				right: 30 + 8,
				backgroundColor: disabledStepIconColor,
				borderTopStyle: borderStyle,
				borderTopWidth: props.borderWidth,
				borderTopColor: progressBarColor,
				marginLeft: 10,
				marginRight: 36 / 2 + 4,
				height: 3,
				width: 20
			},
			rightBar: {
				position: 'absolute',
				top: 2,
				right: 0,
				left: 36 + 8,
				backgroundColor: disabledStepIconColor,
				borderTopStyle: borderStyle,
				borderTopWidth: props.borderWidth,
				borderTopColor: progressBarColor,
				marginLeft: 36 / 2 + 4
			},
			stepNum: {
				color: disabledStepNumColor
			}
		};
	}

	return (
		<View
			style={{
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			{height > 650 && (
				<>
					<View style={styles.circleStyle}>
						<Text style={styles.circleText}>
							{props.isCompletedStep ? (
								<Text style={{ color: completedCheckColor }}>&#10003;</Text>
							) : (
								<Text style={styles.stepNum}>{props.stepNum}</Text>
							)}
						</Text>
					</View>
					<Text style={styles.labelText}>{isActiveStep && props.label}</Text>

					{!props.isFirstStep && <View style={styles.leftBar} />}
					{!props.isLastStep && <View style={styles.rightBar} />}
				</>
			)}
		</View>
	);
};

export default StepIcon;
