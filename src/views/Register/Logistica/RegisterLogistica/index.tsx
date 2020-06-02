import * as React from "react";
import { Container } from "native-base";
import HeaderComponent from "../../../../components/Header";
import LogisticaViews from "../RegisterViews";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";

export interface LogisticaRegisterProps {
  navigation: any;
  route: any;
}

const LogisticaRegister: React.SFC<LogisticaRegisterProps> = (props) => {
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

  if (!route.params) return null;

  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <HeaderComponent
        leftActions={{
          iconName: "arrowleft",
          iconType: "AntDesign",
          actions: () => showessage(),
        }}
      />

      <LogisticaViews uidClient={route.params.uid} />
    </Container>
  );
};

export default LogisticaRegister;
