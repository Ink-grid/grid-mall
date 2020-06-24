import * as React from "react";
import { usePedidoPer } from "../hooks";
import { View, Text, Button, Icon, Spinner } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import { Layout, Input } from "@ui-kitten/components";
import { StyleSheet, ToastAndroid } from "react-native";
import ModalComponent from "../../../../../components/Modal";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { StoreContext } from "../../../../../context/StoreContext";
//import { useFocusEffect } from "@react-navigation/native";

export interface GenerarPedidoProps {
  action?: () => void;
}

type product = {
  name: string;
  quantity: number;
  unidad_medida: string;
};

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const createCotizacion = gql`
  mutation CreateCotizacion(
    $client: String
    $state: Boolean
    $products: [CotizacionDetail]
  ) {
    createCotizacion(
      input: { client: $client, state: $state, products: $products }
    )
  }
`;

const GenerarPedido: React.SFC<GenerarPedidoProps> = (props) => {
  const { action } = props;
  const [producto, setProduct] = React.useState<product>();
  // const [isModal, setModal] = React.useState(false);
  const [createAction, { loading }] = useMutation(createCotizacion);
  const { state } = React.useContext(StoreContext);
  //   const [isPedido, setPedido] = React.useState(true);
  const { peido, handleDeletesProduct, handleClearProduct } = usePedidoPer(
    producto
  );

  const inputName = useInputState();
  const inputCantidad = useInputState();
  const unidadMedida = useInputState();

  const Label = (props: any) => (
    <Text numberOfLines={1} note>
      {props.label}
    </Text>
  );

  const setCotizacion = async () => {
    // setModal(true);
    const data = {
      client: state.userToken,
      state: false,
      products: peido.products,
    };
    try {
      const response = await createAction({ variables: data });
      if (response) {
        ToastAndroid.showWithGravity(
          "Se ingreso con exito su cotización, pronto le enviaremos una respuesta.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        inputName.onChangeText("");
        inputCantidad.onChangeText("");
        unidadMedida.onChangeText("");
        handleClearProduct();
        action && action();
        // setModal(false);
      } else {
        ToastAndroid.showWithGravity(
          "No se puedo enviar su cotización por favor intentelo mas tarde.",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        "Ocurrio un error inesperado al enviar su cotización!",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#red" }}
      //behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      <ModalComponent
        isVisible={loading}
        animated="fade"
        title="Enviando cotización..."
      >
        <Spinner></Spinner>
      </ModalComponent>
      {/* <TouchableWithoutFeedback> */}
      <View style={{ padding: 10, backgroundColor: "#fff", marginTop: -5 }}>
        <Text note style={{ textAlign: "center" }}>
          Genera tu pedido personalizado y obten una cotización de tu lista de
          pedido al mejor precio.
        </Text>
      </View>

      <Layout style={styles.rowContainer} level="1">
        <Input
          label={() => <Label label="Nombre:" />}
          style={styles.input}
          placeholder="Manzana"
          {...inputName}
        />

        <Input
          keyboardType="numeric"
          label={() => <Label label="Cantidad:" />}
          style={styles.input}
          placeholder="10"
          {...inputCantidad}
        />
        <Input
          label={() => <Label label="Unidad de medida:" />}
          style={styles.input}
          placeholder="Kg"
          {...unidadMedida}
        />
      </Layout>

      <ScrollView
        style={{ flex: 1, backgroundColor: "#E9EEE8", paddingTop: 5 }}
      >
        {peido.products.length !== 0 ? (
          peido.products
            .map((ele, index) => (
              <View
                key={index}
                style={{
                  borderBottomColor: "gray",
                  backgroundColor: "#fff",
                  borderBottomWidth: 0.5,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: "40%",
                      paddingLeft: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Text note numberOfLines={1}>
                      - {ele?.name}
                    </Text>
                  </View>
                  <View style={{ width: "25%", justifyContent: "center" }}>
                    <Text note>{ele?.quantity}</Text>
                  </View>
                  <View style={{ width: "25%", justifyContent: "center" }}>
                    <Text numberOfLines={1} note>
                      {ele?.unidad_medida}
                    </Text>
                  </View>
                  <View style={{ padding: 3 }}>
                    <Button
                      small
                      onPress={() => handleDeletesProduct(index)}
                      style={{
                        width: 30,
                        backgroundColor: "green",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        style={{
                          position: "absolute",
                        }}
                        name="delete"
                        type="MaterialIcons"
                      ></Icon>
                    </Button>
                  </View>
                </View>
              </View>
            ))
            .reverse()
        ) : (
          <Text note style={{ textAlign: "center" }}>
            No hay productos.
          </Text>
        )}
      </ScrollView>
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          backgroundColor: "#ffffff",
        }}
      >
        <View style={{ width: "20%" }}>
          <Text style={{ marginTop: 3 }}>Total: {peido.total}</Text>
        </View>
        <View style={{ width: "40%", paddingRight: 5 }}>
          <Button
            disabled={peido.products.length < 5 ? true : loading}
            onPress={() => setCotizacion()}
            small
            style={[
              peido.products.length < 5 || loading
                ? { backgroundColor: "gray" }
                : { backgroundColor: "#1A751B" },
            ]}
            full
          >
            <Text>Enviar</Text>
          </Button>
        </View>
        <View style={{ width: "40%" }}>
          {/* {isPedido ? (
            <Button
              disabled={peido.products.length === 0 ? true : false}
              small
              style={{ backgroundColor: "#1A751B" }}
              full
            >
              <Text>Enviar Pedido</Text>
            </Button>
          ) : ( */}
          <Button
            small
            full
            disabled={
              inputName.value.length === 0 ||
              inputCantidad.value.length === 0 ||
              unidadMedida.value.length === 0
                ? true
                : false
            }
            style={[
              inputName.value.length === 0 ||
              inputCantidad.value.length === 0 ||
              unidadMedida.value.length === 0
                ? { backgroundColor: "gray" }
                : { backgroundColor: "#1A751B" },
            ]}
            onPress={() => {
              setProduct({
                name: inputName.value,
                quantity: parseInt(inputCantidad.value),
                unidad_medida: unidadMedida.value,
              });
            }}
          >
            <Text>Agregar</Text>
          </Button>
          {/* )} */}
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    margin: 2,
    backgroundColor: "#fff",
  },
  rowContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlContainer: {
    borderRadius: 4,
    margin: 2,
    padding: 6,
    backgroundColor: "#3366FF",
  },
});

export default GenerarPedido;
