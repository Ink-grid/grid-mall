import * as React from "react";
import { Layout, Input } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { Text } from "native-base";

type input =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad"
  | "decimal-pad"
  | "visible-password"
  | "ascii-capable"
  | "numbers-and-punctuation"
  | "url"
  | "name-phone-pad"
  | "twitter"
  | "web-search"
  | undefined;

type dataInput = {
  input?: input;
  status: "basic" | "primary" | "success" | "info" | "warning" | "danger";
  label: string;
  placeholder: string;
  disabled: boolean;
  defaultState: any;
};

type Data = {
  direction: "row" | "column";
  items: dataInput[];
};

export interface InputGroudProps {
  data: Data[];
}

const InputGroud: React.SFC<InputGroudProps> = (props) => {
  const { data } = props;

  const Labe = (props: any) => <Text note>{props.label}</Text>;

  return (
    <View style={{ flex: 1 }}>
      {data.map((ele, index) => (
        <React.Fragment key={index + ele.direction}>
          {ele.direction === "row" ? (
            ele.items.map((ele, index) => (
              <Input
                // textStyle={}
                label={() => <Labe label={ele.label} />}
                key={index + ele.label}
                style={styles.input}
                disabled={ele.disabled}
                status={ele.status}
                placeholder={ele.placeholder}
                keyboardType={ele.input}
                {...ele.defaultState}
                //{...warningInputState}
              />
            ))
          ) : (
            <Layout style={styles.rowContainer} level="1">
              {ele.items.map((ele, index) => (
                <Input
                  label={() => <Labe label={ele.label} />}
                  key={index + ele.label}
                  disabled={ele.disabled}
                  style={styles.input}
                  status={ele.status}
                  placeholder={ele.placeholder}
                  keyboardType={ele.input}
                  {...ele.defaultState}
                  //{...warningInputState}
                />
              ))}
            </Layout>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 2,
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: "#3366FF",
  },
});

export default InputGroud;
