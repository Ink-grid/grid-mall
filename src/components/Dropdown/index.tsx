/** @format */

import * as React from 'react';
import {
	View,
	TouchableOpacity,
	UIManager,
	findNodeHandle
} from 'react-native';
import { Icon } from 'native-base';

export interface DropdownProps {
	actions: Array<string>;
	onPress: () => void;
	children: any;
}

const Dropdown: React.SFC<DropdownProps> = props => {
	const { actions, onPress, children } = props;

	const handleShowPopupError = () => {};

	// const handleMenuPress = () => {
	//     UIManager.showPopupMenu(
	//         findNodeHandle(ref),
	//         actions,
	//         handleShowPopupError,
	//         onPress
	//     )
	// }

	return (
		<TouchableOpacity>
			<Icon name='more' ref='menu' />
		</TouchableOpacity>
	);
};

export default Dropdown;
