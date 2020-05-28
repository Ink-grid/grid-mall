/** @format */

import * as React from "react";
import { Container, Button, Text } from "native-base";
import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomeRegister from "./components/ImageLogo";

export interface RegisterProps {
  navigation: any;
  route: any;
}

const Register: React.SFC<RegisterProps> = (props) => {
  const { navigation, route } = props;

  if (!route) return null;

  return (
    <Container>
      <HomeRegister />

      <View style={{ padding: 10 }}>
        <Button
          onPress={() =>
            navigation.navigate("RegisterCLient", { uid: route.params.uid })
          }
          full
          style={{ borderRadius: 10, backgroundColor: "#75F075" }}
        >
          <Text style={{ textTransform: "lowercase" }}>{"Siguiente"}</Text>
        </Button>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footer}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
      </View>
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
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

  footer: {
    color: "#314F31",
    textAlign: "center",
    padding: 10,
    fontWeight: "bold",
  },
});

export default Register;
