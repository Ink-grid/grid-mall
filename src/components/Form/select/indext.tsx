/** @format */

import * as React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { Text } from "native-base";

type Items = {
  label: string;
  value: any;
};

export interface SelectProps {
  items: Items[];
  onChangeValue: (value: any, label?: string) => void;
  label?: string;
}

const Label = (props: any) => <Text note>{props.label}</Text>;

const SelectComponent: React.SFC<SelectProps> = (props) => {
  const { items, onChangeValue, label } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  React.useEffect(() => {
    onChangeValue(items[0].value, items[0].label);
  }, []);

  return (
    <Select
      label={() => <Label label={label} />}
      style={{ backgroundColor: "#fff" }}
      value={items[selectedIndex.row].label}
      selectedIndex={selectedIndex}
      placeholder="Selecione un opción"
      size="large"
      onSelect={(index: any) => {
        setSelectedIndex(index);
        onChangeValue(items[index.row].value, items[index.row].label);
      }}
    >
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

const SelectMultipleComponent: React.SFC<selectMultiple> = (props) => {
  const { data, label, onChangeValue } = props;
  const [selectedIndex, setSelectedIndex] = React.useState([new IndexPath(0)]);

  const groupDisplayValues = selectedIndex.map((index) => {
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
      label={() => <Label label={label} />}
      style={{ backgroundColor: "#fff" }}
      multiSelect={true}
      value={groupDisplayValues.join(", ")}
      placeholder="Selecione un opción"
      size="large"
      selectedIndex={selectedIndex}
      onSelect={(index: any) => {
        setSelectedIndex(index);
        onChangeValue(getValues(index));
      }}
    >
      {data.map((ele, index) => (
        <SelectItem key={index} title={ele.label} />
      ))}
    </Select>
  );
};

export { SelectComponent, SelectMultipleComponent };
