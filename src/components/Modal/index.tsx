/** @format */

import * as React from "react";
import { Modal, StyleSheet } from "react-native";
import { View, Text, Button, Icon, Spinner } from "native-base";

type animated = "slide" | "fade" | "none";
type position = "flex-start" | "flex-end" | "center";

export interface ModalComponentProps {
  title?: string;
  close?: () => void;
  header?: boolean;
  isVisible: boolean;
  children: React.ReactChild;
  position?: position;
  transparent?: boolean;
  style?: any;
  styleConten?: any;
  styleTitle?: any;
  contendwidth?: string;
  animated?: animated;
  loading?: boolean;
}

const ModalComponent: React.SFC<ModalComponentProps> = (props) => {
  const {
    title,
    close,
    children,
    isVisible,
    style,
    styleTitle,
    styleConten,
    loading = false,
    contendwidth = "85%",
    header = true,
    transparent = true,
    position = "center",
    animated = "slide",
  } = props;

  return (
    <Modal
      animationType={animated}
      transparent={transparent}
      visible={isVisible}
    >
      <View style={style || [styles.root, { justifyContent: position }]}>
        <View style={styleConten || [styles.content, { width: contendwidth }]}>
          {loading && (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "absolute",
                zIndex: 400,
                height: "100%",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Spinner />
            </View>
          )}
          {header && (
            // <Card>
            <View
              style={{
                padding: 10,
                //elevation: 3,
                //backgroundColor: 'red',
                //	elevation: 3,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text style={styleTitle || styles.title}>{title}</Text>
              {close && (
                <Button transparent small onPress={close}>
                  <Icon
                    name="close"
                    style={{ color: "black", fontSize: 20 }}
                    type="AntDesign"
                  />
                </Button>
              )}
            </View>
            // </Card>
          )}
          <View style={{ padding: 10 }}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  content: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 10,
    //padding: 10
  },
  title: {
    //	marginTop: -4,
    fontWeight: "200",
    fontSize: 20,
  },
});

export default ModalComponent;
