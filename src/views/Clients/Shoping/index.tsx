/** @format */

import * as React from "react";
import { Container, Button, Icon, Item, Input, Text } from "native-base";
import HeaderComponent from "../../../components/Header";
import Badge from "../../../components/Badge";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
} from "react-native";
import Portada from "../../../components/Portada";
import { useIsDrawerOpen } from "@react-navigation/drawer";
import { useFocusEffect } from "@react-navigation/core";
import gql from "graphql-tag";
import CustomList from "../../../components/CustomList";
import Carousel from "../../../components/Carousel";
import ShopingCard from "../../../components/ShopingCard";
import CardItems from "../../../components/ListItens/component/CardItems";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export interface ShopingProps {
  navigation: any;
  route: any;
}

const query = gql`
  query($category: String!, $limit: Int!, $after: String) {
    products(category: $category, limit: $limit, after: $after) {
      sku
      name
      description
      quantity
      price
      uri
      unidad_media
      observers
    }
  }
`;

type category = {
  _uid: string;
  uri: string;
  title: string;
  description: string;
};

const getCategoria = gql`
  {
    categories {
      _uid
      uri
      title
      description
    }
  }
`;

const Shoping: React.SFC<ShopingProps> = (props) => {
  const { navigation, route } = props;
  const [count, setCount] = React.useState(0);
  const [categoty, setCategory] = React.useState<
    undefined | { uid: string; title: string }
  >();

  const [pedido, setPedido] = React.useState<any>();
  const isDrawerOpen = useIsDrawerOpen();
  const [searText, setText] = React.useState("");

  //console.log("pedido en shoping", pedido);

  const savePedido = async () => {
    await AsyncStorage.setItem("pedido", JSON.stringify(pedido));
    //return false;
  };

  const onSvaePedoArrow = () => {
    savePedido();
    return false;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onSvaePedoArrow);
      return () => {
        // BackHandler.removeEventListener("hardwareBackPress", showessage);
        BackHandler.removeEventListener("hardwareBackPress", onSvaePedoArrow);
        savePedido();
        setCategory(undefined);
      };
    }, [])
  );

  return (
    <Container style={{ backgroundColor: "#E9EEE8" }}>
      <HeaderComponent
        leftActions={{
          iconName: "md-arrow-round-back",
          iconType: "Ionicons",
          actions: () => navigation.navigate("ProductsClie"),
        }}
        background="white"
        title={
          (categoty && categoty.title) ||
          (route.params && route.params.title.toLowerCase())
        }
        badge={
          <Button
            transparent
            onPress={() => {
              if (count === 0) {
                alert(
                  "Canasta vacia. !Por favor ingrese productos a su canasta!"
                );
                return;
              }
              // navigation.navigate('Screens', {
              // screen: 'confirOrders',
              // params: pedido
              // });
              navigation.jumpTo("confirOrders", pedido);
              // navigation.navigate('confirOrders', pedido);
              // console.log(pedido);
              // alert(JSON.stringify(pedido));
            }}
          >
            <Badge count={count}>
              <Icon
                style={{ color: "#000000" }}
                type="AntDesign"
                name="shoppingcart"
              />
            </Badge>
          </Button>
        }
      />

      <View
        style={
          isDrawerOpen
            ? styles.inputDrawer
            : { padding: 10, backgroundColor: "#77A765" }
        }
      >
        <Item style={{ backgroundColor: "#fff" }} rounded>
          <Icon name="ios-search" />
          <Input value={searText} onChangeText={setText} placeholder="Search" />
          <Icon name="carrot" type="FontAwesome5" />
        </Item>
      </View>
      <View style={{ flex: 1 }}>
        <CustomList
          query={query}
          resolve="products"
          variables={{
            category:
              (categoty && categoty.uid) || (route.params && route.params._uid),
            limit: 50,
            after: null,
          }}
          renderIten={(data) => (
            <ShopingCard
              search={searText}
              data={data}
              renderItems={(product, pedido, count, onSave, remove) => {
                setCount(count);
                setPedido(pedido);
                return (
                  <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
                    <FlatList
                      style={{ marginTop: -20 }}
                      key="product"
                      numColumns={2}
                      keyExtractor={(item, index) => index.toString()}
                      data={product}
                      renderItem={({ item, index }) =>
                        item === null ? (
                          <View>
                            <Text>LOADING...</Text>
                          </View>
                        ) : (
                          <CardItems item={item}>
                            {(item) => (
                              <>
                                <Button
                                  onPress={() => {
                                    remove!(item.sku);
                                    if (item.observers <= 0) {
                                      item.observers = 0;
                                      return;
                                    }
                                    item.observers -= 1;
                                  }}
                                  small
                                  style={{
                                    backgroundColor: "#77A765",
                                    borderColor: "#77A765",
                                  }}
                                >
                                  <Icon type="Ionicons" name="md-remove" />
                                </Button>
                                <Text>{item.observers} kg </Text>

                                <Button
                                  onPress={() => {
                                    item.observers += 1;
                                    onSave(item.sku);
                                  }}
                                  small
                                  style={{
                                    backgroundColor: "#77A765",
                                    borderColor: "#77A765",
                                  }}
                                >
                                  <Icon type="Ionicons" name="ios-add" />
                                </Button>
                              </>
                            )}
                          </CardItems>
                        )
                      }
                    />
                  </SafeAreaView>
                );
              }}
            />
          )}
        />
      </View>

      <View style={{ height: 160 }}>
        <CustomList
          query={getCategoria}
          resolve="categories"
          renderIten={(data: [category]) => (
            <View style={{ padding: 0 }}>
              <Carousel
                style="stats"
                title="Categorias similares:"
                bulledPosition={{ top: 0, justifyContent: "flex-end" }}
                PerInterval={3}
                items={data}
                renderItem={(data: category) => (
                  <TouchableOpacity
                    onPress={() => {
                      savePedido();
                      setCategory({ title: data.title, uid: data._uid });
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 8,
                        width: 120,
                        //width: '100%'
                      }}
                    >
                      <Portada title={data.title} uri={data.uri} />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  inputDrawer: {
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#1A2138",
    width: "50%",
  },

  portadaDrawer: {
    width: "50%",
    height: 200,
    flex: 0,
  },

  drawerHeader: {
    backgroundColor: "#1A2138",
    height: 70,
    width: "100%",
  },

  categoryDrawer: {
    flex: 1,
    width: "50%",
  },

  rightDrawer: {
    //marginLeft: -20,
    marginLeft: 40,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});

export default Shoping;
