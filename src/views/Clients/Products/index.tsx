/** @format */

import * as React from "react";
import { View, Text, AsyncStorage, BackHandler, Alert } from "react-native";
import { Container } from "native-base";
import HeaderComponent from "../../../components/Header";
import Category from "../../../components/Category";
import { useFocusEffect } from "@react-navigation/native";

export interface ProductsProps {
  navigation: any;
}

const Products: React.SFC<ProductsProps> = (props) => {
  const { navigation } = props;

  const removeProductoStorage = async () => {
    try {
      await AsyncStorage.removeItem("pedido");
    } catch (error) {
      console.log(error);
    }
  };

  const message = () => {
    Alert.alert(
      "¿Quieres salir sin terminar de procesar el pedido?",
      "Si sales ahora, perderás el progreso que hayas hecho.",
      [
        {
          text: "Seguir comprando producos",
          //onPress: () => console.log('cancel'),
          style: "cancel",
        },
        {
          text: "Salir sin procesar la compra",
          onPress: () => {
            //setstate(0);
            removeProductoStorage();
            navigation.navigate("HomeClie");
            //navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );

    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", message);
      return () => {
        // BackHandler.removeEventListener("hardwareBackPress", showessage);
        BackHandler.removeEventListener("hardwareBackPress", message);
      };
    }, [])
  );

  return (
    <Container>
      <HeaderComponent
        leftActions={{
          iconName: "md-arrow-round-back",
          iconType: "Ionicons",
          actions: () => {
            message();
          },
        }}
        background="white"
        title="Productos"
        rightItems={[]}
      />

      <Category
        navigation={navigation}
        flexContainer={{ flex: 1 }}
        title={false}
      />
    </Container>
  );
};

export default Products;
