import * as React from "react";
import { Container } from "native-base";
import HeaderComponent from "../../../components/Header";
import ProveedorViews from "./ResisterViews";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";

export interface ProveedorProps {
  navigation: any;
  route: any;
}

const Proveedor: React.SFC<ProveedorProps> = (props) => {
  const { navigation, route } = props;

  const showessage = () => {
    Alert.alert(
      "¿Quieres salir sin terminar de crear la cuenta?",
      "Si sales ahora, perderás el progreso que hayas hecho.",
      [
        {
          text: "Seguir creando la cuenta",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        {
          text: "Salir sin crear la cuenta",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", showessage);

      // Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      // Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", showessage);
        // Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        // Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      };
    }, [])
  );

  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <HeaderComponent
        leftActions={{
          iconName: "arrowleft",
          iconType: "AntDesign",
          actions: () => showessage(),
        }}
      />

      <ProveedorViews />
    </Container>
  );
};

export default Proveedor;
