/** @format */

import * as React from "react";
import { Text, View, Container, Card, Button } from "native-base";
import { ScrollView, Image, RefreshControl } from "react-native";
import HeaderComponent from "../../../components/Header";
import CustomList from "../../../components/CustomList";
import gql from "graphql-tag";
// import { FlatList } from 'react-native-gesture-handler';
import formatMoney from "../../../utils/utils";
import { StoreContext } from "../../../context/StoreContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import ModalComponent from "../../../components/Modal";

export interface OrdersProps {
  navigation: any;
}

const query = gql`
  query($_uid: String!) {
    order(_uid: $_uid) {
      _uid
      products {
        product {
          sku
          name
          price
          unidad_media
          uri
        }
        quantity
      }
      distrito
      direction
      price_total
      statePedido {
        color
        type
      }
      quantity_total
      state
    }
  }
`;

const Orders: React.SFC<OrdersProps> = (props) => {
  const { navigation } = props;

  const { state } = React.useContext(StoreContext);
  const [products, setProducts] = React.useState<{
    isActive: boolean;
    pedido: any;
  }>({
    isActive: false,
    pedido: null,
  });
  //console.log(products.product);
  return (
    <Container>
      <HeaderComponent
        leftActions={{
          iconName: "md-arrow-round-back",
          iconType: "Ionicons",
          actions: () => navigation.navigate("HomeClie"),
        }}
        background="green"
        title="Cesta de pedidos"
        rightItems={[]}
      />
      {products.pedido !== null && (
        <ModalComponent
          isVisible={products.isActive}
          animated="fade"
          title="Productos:"
          close={() => setProducts({ isActive: false, pedido: null })}
        >
          <View style={{ padding: 5, height: 400 }}>
            <ScrollView>
              {products.pedido.products
                .map((product: any, index: number) => (
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
                          uri: product.product.uri,
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
                        {product.product.name}
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
                          sku: {product.product.sku}
                        </Text>
                        <Text style={{ fontSize: 8 }} note>
                          {formatMoney(product.product.price)} x{" "}
                          {product.product.unidad_media}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <View>
                          <Text>
                            Cantidad:{" "}
                            <Text note>
                              {product.quantity} {product.product.unidad_media}{" "}
                            </Text>
                          </Text>
                          <Text>
                            Precio:{" "}
                            <Text note>
                              {formatMoney(
                                product.product.price * product.quantity
                              )}
                            </Text>
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Card>
                ))
                .reverse()}
            </ScrollView>
            {!products.pedido.state && (
              <Button
                onPress={() => {
                  setProducts({ isActive: false, pedido: null });
                  navigation.navigate("Pagos", {
                    order: {
                      products: products.pedido.products.map((ele: any) => ({
                        sku: ele.product.sku,
                        quantity: ele.quantity,
                      })),
                      statePedido: "q6WcY0EdyMzeXsPddlmF",
                      direction: products.pedido.direction,
                      distrito: products.pedido.distrito,
                      total: products.pedido.quantity_total,
                      precioTotal: products.pedido.price_total,
                      client: state.userToken,
                      state: products.pedido.state,
                    },
                    precioTotal: products.pedido.price_total,
                    deleted: products.pedido._uid,
                  });
                }}
                small
                full
                style={{ marginTop: 10, backgroundColor: "green" }}
              >
                <Text>Pagar</Text>
              </Button>
            )}
          </View>
        </ModalComponent>
      )}
      <CustomList
        query={query}
        resolve="order"
        variables={{
          _uid: state.userToken,
        }}
        renderIten={(data, { onRefresh, refreshing }) => (
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={{ padding: 10 }}>
              {data.map((ele: any, index: number) => (
                <Card key={index} style={{ elevation: 3, padding: 10 }}>
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      setProducts({
                        isActive: true,
                        pedido: ele,
                      })
                    }
                  >
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <View style={{ width: "70%" }}>
                        <Text note style={{ fontSize: 10 }}>
                          codigo: {ele._uid}
                        </Text>
                        <Text note>
                          Precio Total: PEN {formatMoney(ele.price_total)}
                        </Text>
                        <Text note>Cantidad: {ele.quantity_total}</Text>
                      </View>
                      <View
                        style={{
                          width: "30%",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Text
                          style={{
                            color: ele.state ? "green" : "red",
                            fontSize: 7,
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "right",
                          }}
                        >
                          {ele.state ? "CANCELADO" : "NO CANCELADO"}
                        </Text>
                        <Text
                          style={{
                            position: "absolute",
                            bottom: 0,
                            fontWeight: "bold",
                            width: "100%",
                            textAlign: "right",
                            color: ele.statePedido.color,
                          }}
                        >
                          {ele.statePedido.type}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Card>
              ))}
            </View>
          </ScrollView>
        )}
      />
    </Container>
  );
};

export default Orders;
