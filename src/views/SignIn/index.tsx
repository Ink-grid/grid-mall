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
  Container,
  Spinner,
} from "native-base";
import {
  StyleSheet,
  Keyboard,
  AsyncStorage,
  StatusBar,
  ToastAndroid,
  ImageBackground,
  Platform,
  Dimensions,
} from "react-native";

import { StoreContext } from "../../context/StoreContext";
import { auth } from "../../utils/firebase";
import { useFocusEffect } from "@react-navigation/core";
import {
  useDidErrorEmail,
  useDidPasswordLogin,
} from "../Register/components/Hooks";

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

  const user = useInputState();
  const password = useInputState();
  const errorUser = useDidErrorEmail(user.value);
  const errorPassword = useDidPasswordLogin(password.value);

  const SignInAsync = async () => {
    setLoading(true);
    try {
      const response = await auth().signInWithEmailAndPassword(
        user.value.replace(/" "/gi, ""),
        password.value.replace(/" "/gi, "")
      );
      if (response.user) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await AsyncStorage.setItem(
          "accessToken",
          JSON.stringify(response.user.displayName)
        );
        await AsyncStorage.setItem("userToken", response.user.uid);
        setLoading(false);
        actions.signIn(response.user.uid);
        actions.setAccessToken(response.user.displayName);
        actions.setUser(response.user);
      } else {
        setLoading(false);
        alert("ocurrio un error inesperado");
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          console.log(error);
          setLoading(false);
          ToastAndroid.showWithGravity(
            "La dirección de correo electrónico está mal formateada.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          //alert('La dirección de correo electrónico está mal formateada.');
          break;
        case "auth/wrong-password":
          setLoading(false);
          console.log(error);
          ToastAndroid.showWithGravity(
            "La contraseña no es válida o el usuario no tiene una contraseña.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          break;

        case "auth/too-many-requests":
          console.log(error);
          setLoading(false);
          ToastAndroid.showWithGravity(
            "Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
          break;

        case "auth/user-not-found":
          setLoading(false);
          // setError({ type: "user-not-found", status: true });
          //
          ToastAndroid.showWithGravity(
            "EL usuario no existe o esta mal escrito",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );

          break;
        default:
          console.log(error);
          setLoading(false);
          ToastAndroid.showWithGravity(
            error.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          );
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

  useFocusEffect(
    React.useCallback(() => {
      // console.log("focus singIng");
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      return () => {
        // console.log("no focus singIng");
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
                error={errorUser.status !== null ? !errorUser.status : false}
                style={{ marginBottom: 5 }}
              >
                <Icon active name="person"></Icon>
                <Input
                  {...user}
                  keyboardType="email-address"
                  placeholder="Correo"
                />
              </Item>
              <Item
                rounded
                error={
                  errorPassword.status !== null ? !errorPassword.status : false
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
                style={[
                  !errorPassword.status || !errorUser.status
                    ? { backgroundColor: "gray" }
                    : { backgroundColor: "#75F075" },
                ]}
                disabled={
                  !errorPassword.status || !errorUser.status ? true : false
                }
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
