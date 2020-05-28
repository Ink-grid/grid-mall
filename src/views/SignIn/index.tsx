/** @format */

import * as React from "react";
import {
  View,
  Text,
  Form,
  Item,
  Button,
  Input,
  Icon,
  Toast,
  Container,
  Spinner,
} from "native-base";
import {
  StyleSheet,
  Keyboard,
  AsyncStorage,
  StatusBar,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";

import { StoreContext } from "../../context/StoreContext";
import { auth } from "../../utils/firebase";
import useDidUpdate from "../../components/useDidUpdate";
import { useFocusEffect } from "@react-navigation/core";

export interface SignInProps {
  navigation: any;
}

interface ErrorCode {
  type: string | null;
  status: boolean;
}

const height = Dimensions.get("screen").height;

const useInputState = (initialValue: string = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const SignIn: React.SFC<SignInProps> = (props) => {
  const { navigation } = props;
  const { actions } = React.useContext(StoreContext);
  const [isTransparent, setTransparent] = React.useState(true);
  const [isLoading, setLoading] = React.useState(false);
  const [isSecutiry, setSecurity] = React.useState(true);

  const [error, setError] = React.useState<ErrorCode>({
    type: null,
    status: false,
  });

  const user = useInputState();
  const password = useInputState();

  const SignInAsync = async () => {
    if (user.value.length === 0) {
      setError({ type: "invalid-email", status: true });
      return;
    }
    if (password.value.length === 0) {
      setError({ type: "isMin", status: true });
      return;
    }
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(
        user.value.replace(/" "/gi, ""),
        password.value.replace(/" "/gi, "")
      );

      if (response.user) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await AsyncStorage.setItem("userToken", response.user.uid);
        setLoading(false);
        actions.signIn(response.user.uid);
        actions.setUser(response.user);
      } else {
        setLoading(false);
        alert("ocurrio un error inesperado");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          setError({ type: "invalid-email", status: true });
          setLoading(false);
          Toast.show({
            buttonText: "ok",
            buttonTextStyle: { color: "#008000" },
            text: "La dirección de correo electrónico está mal formateada.",
            duration: 4000,
          });
          //alert('La dirección de correo electrónico está mal formateada.');
          break;
        case "auth/wrong-password":
          setError({ type: "wrong-password", status: true });
          setLoading(false);

          Toast.show({
            buttonTextStyle: { color: "#008000" },
            text:
              "La contraseña no es válida o el usuario no tiene una contraseña.",
            buttonText: "ok",
            duration: 3000,
          });
          break;

        case "auth/too-many-requests":
          setLoading(false);
          setError({ type: "too-many-requests", status: true });
          Toast.show({
            buttonTextStyle: { color: "#008000" },
            text:
              "Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.",
            buttonText: "ok",
            duration: 3000,
          });
          break;

        default:
          setLoading(false);
          Toast.show({
            buttonTextStyle: { color: "#008000" },
            text: error.message,
            buttonText: "ok",
            duration: 3000,
          });
          break;
      }
    }
  };

  const _keyboardDidShow = () => {
    setTransparent(false);
  };

  const _keyboardDidHide = () => {
    setTransparent(true);
  };

  useDidUpdate(() => {
    if (user.value.length > 0 || password.value.length > 4) {
      setError({
        type: null,
        status: false,
      });
    }
    if (user.value.length === 0) {
      setError({
        type: "invalid-email",
        status: true,
      });
    }
    if (password.value.length < 4) {
      setError({
        type: "isMin",
        status: true,
      });
    }
  }, [user.value, password.value]);

  useFocusEffect(
    React.useCallback(() => {
      // console.log("focus singIng");
      setError({ type: null, status: false });
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      return () => {
        // console.log("no focus singIng");
        setError({ type: null, status: false });
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, [])
  );
  return (
    <View
      style={[
        Platform.OS === "web"
          ? {
              flexDirection: "row",
              flex: 1,
              backgroundColor: "#fff",
            }
          : { flex: 1 },
      ]}
    >
      {Platform.OS === "web" && (
        <View style={{ width: "50%", height: "100%" }}>
          <ImageBackground
            style={{ flex: 1, height: "100%" }}
            imageStyle={{ resizeMode: "cover" }}
            source={{
              uri:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSz4rBtZgK-nf5HRSfmLXJ8jR1q5tswb9238qqJLr0vmGqVJneV&usqp=CAU",
            }}
          />
        </View>
      )}

      <View style={[Platform.OS === "web" ? { width: "50%" } : { flex: 1 }]}>
        {isTransparent && (
          <View style={{ height: 210 }}>
            <View style={styles.background}>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>Grid</Text>
              <Text
                style={{
                  fontSize: 50,
                  marginLeft: 30,
                  marginTop: -35,
                  color: "#75F075",
                  fontWeight: "bold",
                }}
              >
                mall
              </Text>
            </View>
            {/* </ImageBackground> */}
          </View>
        )}
        <Container style={styles.root}>
          <StatusBar
            animated
            barStyle={isTransparent ? "dark-content" : "default"}
            backgroundColor={isTransparent ? "#fff" : "transparent"}
          />
          {!isTransparent && (
            <View
              style={[
                height < 550
                  ? {
                      height: 300,
                      marginBottom: 2,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }
                  : {
                      height: 400,
                      marginBottom: 30,
                      alignItems: "center",
                      justifyContent: "flex-end",
                    },
              ]}
            >
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Grid</Text>
              <Text
                style={{
                  fontSize: 40,
                  marginLeft: 23,
                  marginTop: -30,
                  color: "#75F075",
                  fontWeight: "bold",
                }}
              >
                mall
              </Text>
            </View>
          )}
          <View>
            <Form style={{ padding: 10 }}>
              <Item
                rounded
                error={
                  error.type &&
                  error.type === ("invalid-email" || "wrong-password")
                    ? true
                    : false
                }
                style={{ marginBottom: 5 }}
              >
                <Icon active name="person"></Icon>
                <Input
                  {...user}
                  keyboardType="email-address"
                  placeholder="Usuario"
                />
                {error.type &&
                  error.type === ("invalid-email" || "wrong-password") && (
                    <Icon active name="close-circle" />
                  )}
              </Item>
              <Item
                rounded
                error={
                  error.type && error.type === ("isMin" || "wrong-password")
                    ? true
                    : false
                }
              >
                <Icon active name="navigate" />
                <Input
                  secureTextEntry={isSecutiry}
                  {...password}
                  placeholder="Password"
                />
                <Icon
                  active
                  onPress={() => setSecurity(!isSecutiry)}
                  name="eye"
                />
              </Item>
            </Form>
            <View style={{ padding: 10 }}>
              <Button
                block
                style={{ backgroundColor: "#75F075" }}
                disabled={isLoading ? true : false}
                onPress={SignInAsync}
              >
                <Text>Inicair sesión</Text>
              </Button>
            </View>
            <Text note style={{ textAlign: "center" }}>
              ¿Olvidaste tu contraseña?
            </Text>
            <View
              style={{
                marginTop: 60,
              }}
            >
              <Text note style={{ textAlign: "center" }}>
                OR
              </Text>
            </View>
            <View
              style={{
                padding: 10,
                marginTop: 100,
                alignItems: "center",
              }}
            >
              <Button onPress={() => navigation.navigate("UserOption")} success>
                <Text style={{ textTransform: "lowercase" }}>
                  Crear cuenta de gridmall
                </Text>
              </Button>
            </View>
          </View>
        </Container>
        {isLoading && (
          <View style={styles.spinner}>
            <Spinner color="#1A2138" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    zIndex: 0,
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
    ...Platform.select({
      web: {
        backgroundColor: "red",
        width: "80%",
      },
    }),
  },
  background: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  spinner: {
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  text: {
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    padding: 10,
    fontWeight: "bold",
  },

  padding: {
    padding: 10,
  },
});

export default SignIn;
