import * as React from "react";
import { Content, View, Card, Text, Button, Icon } from "native-base";
import HeaderComponent from "../../../components/Header";
import CustomList from "../../../components/CustomList";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import { StoreContext } from "../../../context/StoreContext";
import ModalComponent from "../../../components/Modal";

export interface CotizacionesProps {
  navigation: any;
}

const query = gql`
  query($uid: String!) {
    getCotizacionByclient(uid: $uid) {
      _uid
      products {
        name
        quantity
        unidad_medida
      }
      createAt
      state
    }
  }
`;

const Cotizaciones: React.SFC<CotizacionesProps> = (props) => {
  const { navigation } = props;
  const { state } = React.useContext(StoreContext);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [products, setProducts] = React.useState<any>();

  return (
    <Content>
      <HeaderComponent
        leftActions={{
          iconName: "md-arrow-round-back",
          iconType: "Ionicons",
          actions: () => navigation.navigate("HomeClie"),
        }}
        background="green"
        title="Cesta de cotizaciones"
      />
      {products && (
        <ModalComponent
          isVisible={isModalVisible}
          animated="fade"
          title="Productos"
          close={() => setModalVisible(false)}
        >
          <View
            style={{
              maxHeight: 400,
            }}
          >
            <ScrollView>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "40%" }}>
                  <Text
                    numberOfLines={1}
                    style={{ textAlign: "center", height: 30 }}
                  >
                    Nombre
                  </Text>
                </View>
                <View style={{ width: "30%" }}>
                  <Text numberOfLines={1}>Cantidad</Text>
                </View>
                <View
                  style={{
                    width: "30%",
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{ textAlign: "center", height: 30 }}
                  >
                    Unidad med.
                  </Text>
                </View>
              </View>
              {products.map((ele: any, index: number) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "gray",
                    backgroundColor: "#fff",
                    borderBottomWidth: 0.5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "40%",
                      paddingLeft: 5,
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      style={{ fontSize: 15 }}
                      name="checksquare"
                      type="AntDesign"
                    />
                    <Text style={{ marginLeft: 10 }} note numberOfLines={1}>
                      {ele?.name}
                    </Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text note style={{ textAlign: "center" }}>
                      {ele?.quantity}
                    </Text>
                  </View>
                  <View style={{ width: "25%" }}>
                    <Text note style={{ textAlign: "center" }}>
                      {ele?.unidad_medida}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ModalComponent>
      )}
      <CustomList
        query={query}
        resolve="getCotizacionByclient"
        variables={{
          uid: state.userToken,
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
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "70%" }}>
                      <Text note style={{ fontSize: 10 }}>
                        codigo: {ele._uid}
                      </Text>
                      <Text note>Cantidad: {ele.products.length}</Text>
                      <Button
                        small
                        full
                        style={{
                          marginTop: 10,
                          height: 17,
                          backgroundColor: "green",
                          width: 110,
                        }}
                      >
                        <Text
                          onPress={() => {
                            setProducts(ele.products);
                            setModalVisible(true);
                          }}
                          style={{ fontSize: 10, textTransform: "lowercase" }}
                        >
                          ver productos
                        </Text>
                      </Button>
                    </View>
                    <View
                      style={{
                        width: "30%",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          color: ele.state ? "green" : "#FF9301",
                          fontWeight: "bold",
                          width: "100%",
                          textAlign: "right",
                        }}
                      >
                        {ele.state ? "CONCLUIDO" : "PENDIENTE"}
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </ScrollView>
        )}
      />
    </Content>
  );
};

export default Cotizaciones;
