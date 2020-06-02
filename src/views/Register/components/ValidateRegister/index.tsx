/** @format */

import * as React from "react";
import { auth } from "../../../../utils/firebase";
import { View } from "native-base";
import { useMutation } from "@apollo/react-hooks";
import { Alert, AsyncStorage } from "react-native";
import { StoreContext } from "../../../../context/StoreContext";
import useDidUpdate from "../../../../components/useDidUpdate";

export interface ValidatedRegisterProps {
  data: any;
  password: string;
  children: (status: boolean) => React.ReactNode;
  navigation?: any;
  query: any;
  errors?: (
    type: string,
    message: string,
    reload?: React.Dispatch<any>
  ) => void;
}

const ValidatedRegister: React.SFC<ValidatedRegisterProps> = (props) => {
  const { data, children, errors, query, password } = props;
  // create mutation
  const [createAction] = useMutation(query);

  const [isRegister, setRegister] = React.useState(false);
  const [reloadstatus, setReload] = React.useState<any>(false);

  // acttion storage login
  const { actions } = React.useContext(StoreContext);

  //remove user error grapql
  const removeUserAsync = async () => {
    const user = auth().currentUser;
    if (user) await user.delete();
  };

  // const singInt register token
  const setToken = async (token: string, user: any, accessToken: string) => {
    actions.signIn(token);
    actions.setAccessToken(accessToken);
    actions.setUser(user);
  };

  const registerUser = async () => {
    //[*] debug time steep
    try {
      await auth().createUserWithEmailAndPassword(data.email, password);
      //console.log(data);
      const users = auth().currentUser;

      if (users) {
        //console.log(user.uid);
        await users.updateProfile({
          displayName: data.user,
        });
        let uid = users.uid;

        await createAction({
          variables: {
            uid,
            ...data,
          },
        });
        await AsyncStorage.setItem("userToken", users.uid);
        await AsyncStorage.setItem("accessToken", data.user);
        await AsyncStorage.setItem("user", JSON.stringify(users));
        setRegister(true);

        Alert.alert(
          "Se creo con exito tu cuenta",
          `Recuerda ingresar con tu usuario: ${data.email}`,
          [
            {
              text: "ok",
              onPress: () => {
                setToken(users.uid, users, data.user);
              },
            },
          ],
          { cancelable: false }
        );
      }
      //alert('se creo con exito su cuenta');
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          errors!(
            "invalid-email",
            "La dirección de correo electrónico está mal formateada"
          );
          break;
        case "auth/email-already-in-use":
          errors!(
            "email-already-in-use",
            "La dirección de correo electrónico ya está en uso por otra cuenta"
          );
          break;
        case "auth/weak-password":
          errors!(
            "weak-password",
            "La contraseña debe tener al menos 6 caracteres."
          );
          break;
        case "auth/argument-error":
          errors!("argument-error", error.message);
          break;
        case "auth/network-request-failed":
          errors!(
            "network-request-failed",
            "No es posible conectarse con gridmall, verifique su conexion a internet",
            setReload
          );
        default:
          console.log("grapql: ", error);
          errors!(
            "network-request-failed",
            "No es posible conectarse con gridmall, verifique su conexion a internet",
            setReload
          );
          removeUserAsync();
          console.log(error.code);
          console.log(error.message);
          break;
      }
    }
  };

  useDidUpdate(() => {
    registerUser();
  }, [reloadstatus]);

  React.useEffect(() => {
    registerUser();
  }, []);

  return <View style={{ flex: 1 }}>{children(isRegister)}</View>;
};

export default ValidatedRegister;
