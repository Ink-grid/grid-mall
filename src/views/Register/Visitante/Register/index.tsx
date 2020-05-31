import * as React from "react";
import { View, Button, Icon, Container } from "native-base";
import RegisterViews from "../../components/views";
import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, Alert, StyleSheet } from "react-native";

export interface RegsiterClientProps {
  route: any;
  navigation: any;
}

const RegsiterClient: React.SFC<RegsiterClientProps> = (props) => {
  const { route, navigation } = props;

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

  if (!route) return null;

  return (
    <Container>
      <View style={styles.header}>
        {/* <Text style={{fontWeight: "bold"}}></Text> */}
        <Button transparent onPress={() => showessage()}>
          <Icon
            type="AntDesign"
            style={{ color: "black", fontSize: 25 }}
            name="arrowleft"
          />
        </Button>
      </View>
      <RegisterViews userCLient={route.params.uid} />
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    height: 50,
    borderBottomColor: "#B8B8B8",
    borderBottomWidth: 1,
  },
});

export default RegsiterClient;
