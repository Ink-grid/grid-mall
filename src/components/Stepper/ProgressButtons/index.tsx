/** @format */

import * as React from 'react';
import { View } from 'react-native';

export interface ProgressButtonsProps {
	renderPreviousButton: () => React.ReactChild;
	renderNextButton: () => React.ReactChild;
}

const ProgressButtons: React.SFC<ProgressButtonsProps> = props => {
	const { renderPreviousButton, renderNextButton } = props;

	return (
		<View style={{ flexDirection: 'row', marginTop: 90 }}>
			<View style={{ position: 'absolute', left: 60, bottom: 40 }}>
				{renderPreviousButton()}
			</View>

			<View style={{ position: 'absolute', right: 60, bottom: 40 }}>
				{renderNextButton()}
			</View>
		</View>
	);
};

export default ProgressButtons;
