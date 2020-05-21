/** @format */

import * as React from 'react';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';

type Items = {
	label: string;
	value: string;
};

export interface SelectProps {
	items: Items[];
	onChangeValue: (value: string) => void;
	label?: string;
}

const SelectComponent: React.SFC<SelectProps> = props => {
	const { items, onChangeValue, label } = props;
	const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

	React.useEffect(() => {
		onChangeValue(items[0].value);
	}, []);

	return (
		<Select
			label={label}
			value={items[selectedIndex.row].label}
			selectedIndex={selectedIndex}
			placeholder='Selecione un opción'
			size='large'
			onSelect={(index: any) => {
				setSelectedIndex(index);
				onChangeValue(items[index.row].value);
			}}>
			{items.map((ele, index) => (
				<SelectItem key={index} title={ele.label} />
			))}
		</Select>
	);
};

type selectItem = {
	label: string;
	value: string;
};

interface selectMultiple {
	data: selectItem[];
	label: string;
	onChangeValue: (values: string[]) => void;
}

const SelectMultipleComponent: React.SFC<selectMultiple> = props => {
	const { data, label, onChangeValue } = props;
	const [selectedIndex, setSelectedIndex] = React.useState([new IndexPath(0)]);

	const groupDisplayValues = selectedIndex.map(index => {
		// const groupTitle = Object.keys(data);
		return data[index.row].label;
	});

	const getValues = (index: any) => {
		const labels: any = [];
		index.map((ele: any) => {
			labels.push(data[ele.row].value);
		});
		return labels;
	};

	React.useEffect(() => {
		onChangeValue(getValues([{ row: 0 }]));
	}, []);

	return (
		<Select
			label={label}
			multiSelect={true}
			value={groupDisplayValues.join(', ')}
			placeholder='Selecione un opción'
			size='large'
			selectedIndex={selectedIndex}
			onSelect={(index: any) => {
				setSelectedIndex(index);
				onChangeValue(getValues(index));
			}}>
			{data.map((ele, index) => (
				<SelectItem key={index} title={ele.label} />
			))}
		</Select>
	);
};

export { SelectComponent, SelectMultipleComponent };
