/** @format */

import * as React from "react";
import { View, Spinner, Text } from "native-base";
import { StoreContext } from "../../context/StoreContext";
import { auth } from "../../utils/firebase";
import { AsyncStorage, ToastAndroid } from "react-native";
import { useFocusEffect } from "@react-navigation/core";

export interface LoguotProps {
  navigation: any;
}

const Loguot: React.SFC<LoguotProps> = (props) => {
  const { navigation } = props;
  const { actions } = React.useContext(StoreContext);
  // logout action
  const logoutAscyn = async () => {
    try {
      await auth().signOut();
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("accessToken");
      actions.signOut();
      ToastAndroid.showWithGravity(
        "Sesión cerrada.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } catch (error) {
      console.log("error");
      navigation.goBack();
      ToastAndroid.showWithGravity(
        "Ocurrio un error inesperado por favor intentalo de nuevo.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      logoutAscyn();
    }, [])
  );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Spinner />
      <Text note>saliendo...</Text>
    </View>
  );
};

export default Loguot;
