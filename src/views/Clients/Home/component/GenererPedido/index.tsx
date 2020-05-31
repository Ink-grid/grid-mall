import * as React from "react";
import { usePedidoPer } from "../hooks";
import { View, Text, Button, Icon } from "native-base";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Layout, Input } from "@ui-kitten/components";
import {
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
//import { useFocusEffect } from "@react-navigation/native";

export interface GenerarPedidoProps {}

type product = {
  name: string;
  quantity: number;
  unidad_medida: string;
};

const useInputState = (initialValue = "") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const GenerarPedido: React.SFC<GenerarPedidoProps> = () => {
  const [producto, setProduct] = React.useState<product>();
  const [isUpItem, setUpItem] = React.useState(false);
  //   const [isPedido, setPedido] = React.useState(true);
  const { peido, handleDeletesProduct } = usePedidoPer(producto);

  const inputName = useInputState();
  const inputCantidad = useInputState();
  const unidadMedida = useInputState();

  console.log(isUpItem);

  //   const _upContainer = () => {
  //     setUpItem(true);
  //     //setPedido(false);
  //   };

  //   const defaultContainer = () => {
  //     setUpItem(true);
  //     //setPedido(true);
  //   };

  return (
    <View
      style={{ flex: 1, backgroundColor: "#red" }}
      //behavior={Platform.OS === "ios" ? "padding" : "position"}
    >
      {/* <TouchableWithoutFeedback> */}
      <View style={{ padding: 10, backgroundColor: "#fff", marginTop: -5 }}>
        <Text note style={{ textAlign: "center" }}>
          Genera tu pedido personalizado
        </Text>
      </View>

      <Layout style={styles.rowContainer} level="1">
        <Input
          onFocus={() => setUpItem(true)}
          label="Nombre:"
          style={styles.input}
          placeholder="Manzana"
          {...inputName}
        />

        <Input
          keyboardType="numeric"
          label="Cantidad:"
          style={styles.input}
          placeholder="10"
          {...inputCantidad}
        />
        <Input
          label="Unidad de medida:"
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
                  <View style={{ width: "40%", paddingLeft: 5 }}>
                    <Text numberOfLines={1}>{ele?.name}</Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text>{ele?.quantity}</Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text>{ele?.unidad_medida}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => handleDeletesProduct(index)}
                    >
                      <Icon name="delete" type="MaterialIcons"></Icon>
                    </TouchableOpacity>
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
            disabled={peido.products.length === 0 ? true : false}
            small
            style={[
              peido.products.length < 5
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
