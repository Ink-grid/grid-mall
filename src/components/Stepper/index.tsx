/** @format */

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressStep from './ProgressStep';

import StepIcons from './StepIcon';
import useDidUpdate from '../useDidUpdate';

export interface StepperProps {
	navigation?: any;
	isComplete?: boolean;
	activeStep?: number;
	children: any;
}

const Stepper: React.SFC<StepperProps> = props => {
	const { navigation, isComplete = false, activeStep = 0, children } = props;

	const [state, setState] = React.useState({
		stepCount: 0,
		activeStep: activeStep
	});

	// Callback function from ProgressStep that passes current step.
	const setActiveStep = (step: number) => {
		// Guard against setting current step higher than total step count.
		if (step >= state.stepCount - 1) {
			setState(prevs => ({ ...prevs, activeStep: state.stepCount - 1 }));
		}

		if (step > -1 && step < state.stepCount - 1) {
			setState(prevs => ({ ...prevs, activeStep: step }));
		}
	};

	const getChildProps = () => ({ ...props, ...state });

	// basic vanilla javaScript lodash times method clone
	// my own custom times method with a ccustom api
	let times = (
		count: number,
		func: (i: number, count: number, per: number) => void
	) => {
		var i = 0,
			per,
			results: any = [];
		count = count || 0;
		func = func || function() {};

		// while i is less than len
		while (i < count) {
			per = i / count;

			// call function with a custom api that can be
			// used via the this keyword
			results.push(
				func.call(
					{
						i: i,
						count: count,
						per: per,
						bias: 1 - Math.abs(0.5 - per) / 0.5,
						results: results
					},
					i,
					count,
					per
				)
			);

			i += 1;
		}
		return results;
	};

	const renderStepIcons = () => {
		let steps: any = [];
		times(state.stepCount, (i: number) => {
			const isCompletedStep = isComplete ? true : i < state.activeStep;
			const isActiveStep = isComplete ? false : i === state.activeStep;
			steps.push(
				<View key={i}>
					<View>
						<StepIcons
							{...getChildProps()}
							stepNum={i + 1}
							label={children[i].props.label}
							isFirstStep={i === 0}
							isLastStep={i === state.stepCount - 1}
							isCompletedStep={isCompletedStep}
							isActiveStep={isActiveStep}
						/>
					</View>
				</View>
			);
		});

		return steps;
	};

	useDidUpdate(() => {
		setActiveStep(activeStep);
	}, [activeStep]);

	React.useEffect(() => {
		setState(prevs => ({
			...prevs,
			stepCount: React.Children.count(props.children)
		}));
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.stepIcons}>{renderStepIcons()}</View>
			<View style={{ flex: 1 }}>
				{React.cloneElement(props.children[state.activeStep], {
					setActiveStep: setActiveStep,
					activeStep: state.activeStep,
					stepCount: state.stepCount
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	stepIcons: {
		position: 'relative',
		width: '80%',
		marginTop: 30,
		justifyContent: 'space-evenly',
		alignSelf: 'center',
		flexDirection: 'row'
	}
});

export { ProgressStep };

export default Stepper;
