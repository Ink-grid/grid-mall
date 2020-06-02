/** @format */

import * as React from "react";
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import { Text, Item, Label, Input, Icon, Spinner } from "native-base";
import Stepper, { ProgressStep } from "../../../../components/Stepper";
import ModalComponent from "../../../../components/Modal";
import { SelectMultipleComponent } from "../../../../components/Form/select/indext";
import CustomList from "../../../../components/CustomList";
import gql from "graphql-tag";
import {
  useDidError,
  useDidErrorRuc,
  useDidErrorEmail,
  useDidErrorPhone,
  useDidPassword,
} from "../../components/Hooks";
import ValidatedRegister from "../../components/ValidateRegister";

const getCategory = gql`
  {
    categories {
      _uid
      title
    }
  }
`;

const CREATE_PROVEEDOR = gql`
  mutation CreateProviders(
    $uid: String!
    $razon_social: String!
    $user: String!
    $ruc: String!
    $category: [String]!
    $phone: String!
    $email: String!
    $direction: String!
  ) {
    createProviders(
      input: {
        uid: $uid
        razon_social: $razon_social
        user: $user
        ruc: $ruc
        category: $category
        phone: $phone
        email: $email
        direction: $direction
      }
    )
  }
`;

export interface ProveedorOtionProps {
  //userCLient: string;
  //onSubmit?: () => Promise<void>;
  marginTop?: number;
}

const height = Dimensions.get("screen").height;

const ProveedorViews: React.SFC<ProveedorOtionProps> = (props) => {
  const { marginTop = 15 } = props;

  // const [frecuencia, setFrecuenciCompra] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);

  const useInputState = (initialValue: string = "") => {
    const [value, setValue] = React.useState<any>(initialValue);
    return {
      value,
      onChangeText: setValue,
      // onKeyPress: () => setError((prev) => ({ ...prev, status: false })),
      //onFocus: () => setError(prevs => ({ ...prevs, status: false }))
    };
  };

  const [visible, setVisible] = React.useState(false);

  const razon = useInputState();
  // const apellido = useInputState();
  const telefono = useInputState();
  //const frecuencia_compra = useInputState();
  const ruc = useInputState();
  const password = useInputState();
  const driection = useInputState();
  const correo = useInputState();
  // const falimiliares = useInputState();

  const razonNameError = useDidError(razon.value);
  const rucError = useDidErrorRuc(ruc.value);
  const categoriaError = useDidError(categories);
  const directionError = useDidError(driection.value);
  const emailError = useDidErrorEmail(correo.value);
  const phoneError = useDidErrorPhone(telefono.value);
  const passworError = useDidPassword(password.value);

  const validate = async () => {
    setVisible(true);
  };

  const showMessage = (message: string) =>
    Alert.alert(
      "Ocurrio un error inesperado",
      message,
      [
        {
          text: "ok",
          onPress: () => {
            setVisible(false);
          },
        },
      ],
      { cancelable: false }
    );

  const getActionsError = (
    type: string,
    message: string,
    reload: React.Dispatch<any>
  ) => {
    console.log(type);
    switch (type) {
      case "invalid-email":
        showMessage(message);
        break;
      case "email-already-in-use":
        showMessage(message);
        break;
      case "weak-password":
        showMessage(message);
        break;

      default:
        Alert.alert(
          "Ocurrio un error inesperado",
          message,
          [
            {
              text: "cancelar",
              onPress: () => setVisible(false),
            },
            {
              text: "Volver a intentar",
              onPress: () => reload(Math.random),
            },
          ],
          { cancelable: false }
        );
        break;
    }
  };

  return (
    <>
      <ModalComponent
        isVisible={visible}
        header={false}
        position="center"
        contendwidth="100%"
      >
        <View
          style={{
            height: height,
          }}
        >
          <ValidatedRegister
            query={CREATE_PROVEEDOR}
            password={password.value}
            data={{
              razon_social: razon.value,
              ruc: ruc.value,
              direction: driection.value,
              email: correo.value,
              phone: telefono.value,
              category: categories,
              user: "RpieM5aIyCcrZedKwQZN",
            }}
            errors={(type, message, reload) =>
              getActionsError(type, message, reload!)
            }
          >
            {(status) => {
              if (!status) {
                return (
                  <View
                    style={{
                      flex: 1,
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spinner color="#495FA5" />
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                      creando tu cuenta ...
                    </Text>
                  </View>
                );
              }
            }}
          </ValidatedRegister>
        </View>
      </ModalComponent>
      <Stepper>
        <ProgressStep
          label="Datos"
          onNext={() =>
            razonNameError.status !== null &&
            emailError !== null &&
            phoneError.status !== null
              ? razonNameError.status && emailError.status && phoneError.status
                ? true
                : false
              : false
          }
          previousBtnStyle={{ color: "#75F075" }}
        >
          <View style={styles.root}>
            <View style={{ width: "90%" }}>
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "row",
                }}
              >
                <Text style={[styles.title, { width: "80%" }]}>
                  Por favor ingrese sus datos personales.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  width: "100%",
                  //justifyContent: "center",
                  //alignItems: "center",
                }}
              >
                <Item
                  style={{
                    width: "95%",
                  }}
                  error={
                    razonNameError.status !== null
                      ? !razonNameError.status
                      : false
                  }
                  floatingLabel
                >
                  <Label>Razon Social</Label>
                  <Input {...razon} />
                  {razonNameError.status && (
                    <Icon
                      onPress={() => razon.onChangeText("")}
                      active
                      name="close"
                    />
                  )}
                </Item>
                <View style={{ marginBottom: 2, marginTop: 5 }}>
                  <Text note style={{ fontSize: 10, color: "red" }}>
                    {razonNameError.show && "Ingrese su razón social completo"}
                  </Text>
                </View>

                <Item
                  error={
                    emailError.status !== null ? !emailError.status : false
                  }
                  style={{ width: "95%", marginTop: 10 }}
                  floatingLabel
                >
                  <Label>Correo electronico</Label>
                  <Input {...correo} keyboardType="email-address" />
                  {emailError.status && (
                    <Icon
                      onPress={() => correo.onChangeText("")}
                      active
                      name="close"
                    />
                  )}
                </Item>
                <View style={{ marginTop: 5 }}>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "red",
                      fontSize: 10,
                      width: "100%",
                    }}
                  >
                    {emailError.show && "Ingrese un correo valido"}
                  </Text>
                </View>

                <Item
                  style={{ width: "95%", marginTop: 10 }}
                  error={
                    phoneError.status !== null ? !phoneError.status : false
                  }
                  floatingLabel
                >
                  <Label>Número de celular</Label>
                  <Input {...telefono} keyboardType="phone-pad" />
                  {phoneError.status && (
                    <Icon
                      onPress={() => telefono.onChangeText(null)}
                      active
                      name="close"
                    />
                  )}
                </Item>
                <View style={{ marginBottom: 10, marginTop: 5 }}>
                  <Text note style={{ color: "red", fontSize: 10 }}>
                    {phoneError.show && "Ingrese un número de celular válido"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="R.U.C"
          onNext={() => (rucError.status !== null ? rucError.status : false)}
        >
          <View style={styles.root}>
            <View style={{ marginTop: marginTop, width: "90%" }}>
              <View>
                <Text style={styles.title}>Agrega tu R.U.C</Text>
                <Text
                  note
                  style={{
                    textAlign: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  Agregar tu R.U.C te ayuda a mejorar la confiabilidad de tus
                  cliente.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ marginBottom: 15, marginTop: -10 }}>
                  <Text
                    style={{ textAlign: "center", fontSize: 12, color: "red" }}
                  >
                    {rucError.show &&
                      "El R.U.C ingresado es invalido, por favor ingrese un RUC valido"}
                  </Text>
                </View>

                <Item
                  error={rucError.status !== null ? !rucError.status : false}
                  style={{ width: "95%" }}
                  floatingLabel
                >
                  <Label>R.U.C</Label>
                  <Input {...ruc} keyboardType="numeric" autoFocus={true} />
                  {rucError.status && (
                    <Icon
                      onPress={() => ruc.onChangeText("")}
                      active
                      name="close"
                    />
                  )}
                </Item>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Categoria"
          onNext={() =>
            categoriaError.status !== null ? categoriaError.status : false
          }
        >
          <View style={styles.root}>
            <View style={{ marginTop: marginTop, width: "90%" }}>
              <View>
                <Text style={styles.title}>Categoria de productos</Text>
                <Text
                  note
                  style={{
                    textAlign: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  Seleccione categoría de productos que ofrece.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ marginBottom: 15, marginTop: -10 }}>
                  <Text
                    note
                    style={{ textAlign: "center", fontSize: 12, color: "red" }}
                  >
                    {categoriaError.show && "Ingrese una categoria"}
                  </Text>
                </View>

                <View
                  style={{ width: "95%" }}
                  //error={error.status}
                  //floatingLabel>
                >
                  <CustomList
                    query={getCategory}
                    resolve="categories"
                    renderIten={(data) => {
                      const formatData: any = [];
                      data.forEach((element: any) => {
                        formatData.push({
                          label: element.title,
                          value: element._uid,
                        });
                      });
                      return (
                        <SelectMultipleComponent
                          data={formatData}
                          label="Categoria"
                          onChangeValue={(data) => setCategories(data)}
                        />
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Direccón"
          onNext={() =>
            directionError.status !== null ? directionError.status : false
          }
        >
          <View style={styles.root}>
            <View style={{ marginTop: marginTop, width: "90%" }}>
              <View>
                <Text style={styles.title}>Ingrese su Dirección</Text>
                <Text
                  note
                  style={{
                    textAlign: "center",
                    marginTop: 15,
                    marginBottom: 10,
                  }}
                >
                  Ingrese la dirección de su negocio para determinar el nivel
                  credibilidad a sus clientes.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ marginBottom: 15, marginTop: -10 }}>
                  <Text
                    style={{ textAlign: "center", color: "red", fontSize: 12 }}
                  >
                    {directionError.show &&
                      "Dirección incorrecta, por favor ingrese una dirección valida"}
                  </Text>
                </View>

                <Item
                  error={
                    directionError.status !== null
                      ? !directionError.status
                      : false
                  }
                  style={{ width: "95%" }}
                  floatingLabel
                >
                  <Label>Dirección</Label>
                  <Input {...driection} autoFocus={true} />
                  {directionError.status && (
                    <Icon
                      onPress={() => driection.onChangeText("")}
                      active
                      name="close"
                    />
                  )}
                </Item>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          label="Password."
          onNext={() =>
            passworError.status !== null ? passworError.status : false
          }
        >
          <View style={styles.root}>
            <View style={{ marginTop: marginTop, width: "90%" }}>
              <View>
                <Text style={styles.title}>Elige una contraseña</Text>
                <Text note style={{ textAlign: "center", marginTop: 10 }}>
                  Crea una contraseña que tenga al menos 6 caracteres, Debe ser
                  algo dificil de adivinar.
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={{ marginBottom: 15, marginTop: -10 }}>
                  <Text
                    style={{ textAlign: "center", color: "red", fontSize: 12 }}
                  >
                    {passworError.show &&
                      'Tu contraseña debe tener como minimo 6 letras, número, simbolos (como "!" y "%%") y minimo una letra mayuscula'}
                  </Text>
                </View>

                <Item
                  error={
                    passworError.status !== null ? !passworError.status : false
                  }
                  style={{ width: "95%" }}
                  floatingLabel
                >
                  <Label>contraseña</Label>
                  <Input {...password} autoFocus={true} />
                  {passworError.status && (
                    <Icon
                      onPress={() => password.onChangeText("")}
                      active
                      name="close"
                    />
                  )}
                </Item>
              </View>
            </View>
          </View>
        </ProgressStep>

        <ProgressStep
          label="Confirmar."
          finishBtnText="Registrarte"
          onSubmit={() => validate()}
        >
          <View style={styles.root}>
            <View style={{ marginTop: 100, width: "90%" }}>
              <View>
                <Text style={styles.title}>Finalizar Registro</Text>
                <Text note style={{ textAlign: "center", marginTop: 10 }}>
                  Al tocar "Registrarte", aceptas nuestras Condiciones, la
                  Política de datos y la Política de cookies. Es posible que te
                  enviemos notificaciones, que puedes desactivar cuando quieras.
                </Text>
              </View>
            </View>
          </View>
        </ProgressStep>
      </Stepper>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },

  root: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    width: "100%",
    position: "relative",
  },
});

export default ProveedorViews;
