/** @format */

import * as React from "react";
import {
  View,
  Text,
  Button,
  Header,
  Left,
  Icon,
  Title,
  Body,
  Card,
  Spinner,
} from "native-base";
import {
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  AsyncStorage,
} from "react-native";
import formatMoney from "../../../utils/utils";
import ModalComponent from "../../../components/Modal";
import ComfirDirections from "./Components/ComfirDirection";
import SavePedido from "./Components/SavePedido";
import { StoreContext } from "../../../context/StoreContext";
import GenerateList from "./GenererateList";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Input } from "@ui-kitten/components";

export interface ConfirOrdersProps {
  navigation: any;
  route: any;
}

const useInputState = (initialValue = "1") => {
  const [value, setValue] = React.useState(initialValue);
  return { value, onChangeText: setValue };
};

const ConfirOrders: React.SFC<ConfirOrdersProps> = (props) => {
  const { navigation, route } = props;

  // [*] get uid for client
  const { state } = React.useContext(StoreContext);

  const [isModal, setModal] = React.useState(false);
  const [edit, setEdit] = React.useState({
    actived: false,
    quantity: 1,
    sku: "",
  });
  const [isDireciont, setDirection] = React.useState(false);
  const [isSavePedido, setPedido] = React.useState(false);
  const [direction, setdirection] = React.useState<any>({
    value: null,
    active: 0,
  });

  //console.log(edit);

  const quantity = useInputState(edit.quantity.toString());

  const getDay = (): string => {
    const date = new Date();
    let weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekday = weekdays[date.getDay()];
    return weekday;
  };

  if (!route.params) {
    return null;
  }

  //console.log(route.params);
  const savePedido = async (data: any) => {
    await AsyncStorage.setItem("pedido", JSON.stringify(data));
    // actions(Math.random);
    //return false;
  };

  //[*] get items sku, quantity, price from products
  const getProductItem = (data: any) => {
    let newProduct: any = [];
    data.forEach((element: any) => {
      newProduct.push({
        sku: element.sku,
        quantity: element.quantity,
        price: element.price,
      });
    });

    return newProduct;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#E3E8E5" }}>
      <Header noShadow androidStatusBarColor="#000000" style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() =>
              // navigation.navigate('Screens', {
              // 	screen: 'Shoping'
              // })
              navigation.goBack()
            }
          >
            <Icon
              style={{ color: "#000000" }}
              name="md-arrow-round-back"
              type="Ionicons"
            />
          </Button>
        </Left>
        <Body>
          <Title
            style={{
              fontWeight: "bold",
              color: "#000000",
              textAlign: "center",
            }}
          >
            Lista de pedido
          </Title>
        </Body>
      </Header>

      <ComfirDirections
        confirm={(state) => state && setPedido(true)}
        direction={direction}
        setdirection={setdirection}
        visibleDirection={isDireciont}
        close={() => setDirection(false)}
      />

      <SavePedido
        order={{
          client: state.userToken!,
          direction: direction.value,
          price_total: route.params.precioTotal,
          quantity_total: route.params.total,
          products: getProductItem(
            route.params.products.filter((e: any) => e.quantity !== 0)
          ),
        }}
        active={isSavePedido}
        errors={(state, reload) =>
          state &&
          Alert.alert(
            "Error",
            "Ocurrio un error inesperado. verifique su conexion a internet y vuelva a intentarlo",
            [
              {
                text: "Cancelar",
                onPress: () => setPedido(false),
                style: "cancel",
              },
              {
                text: "Volver a intentar",
                onPress: () => {
                  reload(Math.random());
                },
              },
            ],
            { cancelable: true }
          )
        }
        close={() => setPedido(false)}
      >
        {(state) => {
          if (!state) {
            return (
              <View style={styles.action}>
                <Spinner color="#77A765" />
                <Text note>Gerenerando pedido...</Text>
              </View>
            );
          } else {
            return (
              <View style={styles.action}>
                <Text style={{ padding: 20 }} note>
                  Se genero con éxito su pedido.
                </Text>
                <Button
                  onPress={() => {
                    setPedido(false);
                    navigation.navigate("Screens", {
                      screen: "Home",
                    });
                  }}
                  style={{ width: "70%", backgroundColor: "#77A765" }}
                >
                  <Text style={{ width: "100%", textAlign: "center" }}>
                    Aceptar
                  </Text>
                </Button>
              </View>
            );
          }
        }}
      </SavePedido>

      <ModalComponent
        position="center"
        animated="fade"
        transparent={true}
        header={false}
        isVisible={isModal}
      >
        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={{ fontWeight: "200" }}>
            Por el momento no puede realizar ningún pedido. Los únicos dias para
            realizar sus pedidos son los dias sabados y la entrega de sus
            productos son los lunes. Gracias por su comprensión.
          </Text>
          <View
            style={{
              paddingTop: 10,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              alignContent: "flex-end",
            }}
          >
            <Button
              transparent
              small
              style={{ width: 55 }}
              onPress={() => setModal(false)}
            >
              <Text style={{ textAlign: "right", width: "100%" }}>ok</Text>
            </Button>
          </View>
          {/* <Button onPress={() => setModal(false)}>
						<Text>close</Text>
					</Button> */}
        </View>
      </ModalComponent>

      <GenerateList
        data={route.params}
        renderItem={(data, pedido, onsave, onRemoved) => {
          savePedido(pedido);
          return (
            <>
              <ModalComponent
                isVisible={edit.actived}
                title="Editar"
                close={() => setEdit((prevs) => ({ ...prevs, actived: false }))}
              >
                <View style={{ padding: 5 }}>
                  <Input
                    label="Cantidad:"
                    keyboardType="numeric"
                    {...quantity}
                  />
                  <Button
                    style={{ backgroundColor: "green", marginTop: 10 }}
                    onPress={() => {
                      onsave!(edit.sku, parseInt(quantity.value));
                      setEdit((prevs) => ({
                        ...prevs,
                        actived: false,
                      }));
                    }}
                  >
                    <Text style={{ textAlign: "center", width: "100%" }}>
                      guardar
                    </Text>
                  </Button>
                </View>
              </ModalComponent>
              <ScrollView style={{ flex: 1, paddingLeft: 2, paddingRight: 2 }}>
                {data.map((product: any, index: number) => (
                  <Card
                    style={{ elevation: 3, flexDirection: "row" }}
                    key={index}
                  >
                    <View
                      style={{
                        width: "30%",
                        padding: 1,
                        borderRightColor: "#E3E8E5",
                        borderRightWidth: 1,
                      }}
                    >
                      <Image
                        style={{ height: 50, resizeMode: "contain" }}
                        source={{
                          uri: product.uri,
                        }}
                      ></Image>
                      <Text
                        style={{
                          padding: 0.5,
                          textAlign: "center",
                          fontSize: 10,
                        }}
                        note
                      >
                        {product.name}
                      </Text>
                    </View>
                    <View style={{ padding: 5, width: "100%" }}>
                      <View
                        style={{
                          width: "69%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 8 }} note>
                          sku: {product.sku}
                        </Text>
                        <Text
                          note
                          style={{
                            padding: 0.5,
                            textAlign: "center",
                            fontSize: 7,
                          }}
                        >
                          PEN {formatMoney(product.price)} x{" "}
                          {product.unidad_media}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View style={{ width: "49%" }}>
                          <Text>
                            Cantidad:{" "}
                            <Text note>
                              {product.quantity} {product.unidad_media}{" "}
                            </Text>
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            width: "25%",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() =>
                              setEdit({
                                quantity: product.quantity,
                                sku: product.sku,
                                actived: true,
                              })
                            }
                          >
                            <Icon name="edit" type="MaterialIcons"></Icon>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() =>
                              Alert.alert(
                                "¿Estas seguro de realizar esta acción?",
                                "Seguro que quieres eliminar el producto de tu lista de pedido!.",
                                [
                                  {
                                    text: "cancelar",
                                    onPress: () => console.log("cancel"),
                                    style: "cancel",
                                  },
                                  {
                                    text: "eliminar",
                                    onPress: () => {
                                      onRemoved!(product.sku);
                                    },
                                  },
                                ],
                                { cancelable: true }
                              )
                            }
                          >
                            <Icon name="delete" type="MaterialIcons"></Icon>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Card>
                ))}
              </ScrollView>
            </>
          );
        }}
      >
        {(total, precioTotal) => (
          <>
            <View style={{ backgroundColor: "#fff" }}>
              <View
                style={{
                  borderTopColor: "#E3E8E5",
                  borderTopWidth: 1,
                  paddingTop: 15,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: 10,
                }}
              >
                <Text>Total: {total}</Text>
                <Text>Precio Total: PEN {formatMoney(precioTotal)}</Text>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  note
                  style={{ fontSize: 10, width: "80%", textAlign: "center" }}
                >
                  * Por el momento la modalidad de pago se efectuara una vez que
                  usted tenga el producto en sus manos, pronto se habilitara
                  otros metodos de pago como visa, paypal, etc.
                </Text>
              </View>

              <View
                style={{
                  justifyContent: "center",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Button
                  iconRight
                  style={{ backgroundColor: "#77A765", width: "40%" }}
                  onPress={() => {
                    if (getDay() === "Friday") {
                      setModal(true);
                    } else if (precioTotal < 150) {
                      Alert.alert(
                        "Error",
                        "El preció minimo para la entrega es de PEN 150.00, por favor agrega mas productos a su cesta"
                      );
                    } else {
                      setDirection(true);
                      //etModal(true);
                    }
                  }}
                >
                  <Text
                    style={{
                      textTransform: "lowercase",
                      fontWeight: "bold",
                      marginTop: -4,
                      fontSize: 15,
                    }}
                  >
                    continuar
                  </Text>
                  <Icon
                    name="arrowright"
                    style={{ fontSize: 20 }}
                    type="AntDesign"
                  />
                </Button>
                <Text note style={{ fontSize: 10, marginTop: 10 }}>
                  Al precionar continuar, usted acepta nuestros terminos y
                  condiciones.
                </Text>
              </View>
            </View>
          </>
        )}
      </GenerateList>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
  },
  action: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});

export default ConfirOrders;
