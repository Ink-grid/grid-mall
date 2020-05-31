/** @format */

import * as React from "react";
import { Card, CardItem, Text } from "native-base";
import { View, StyleSheet, Image } from "react-native";
import formatMoney from "../../../../utils/utils";

export interface CardItemsProps {
  item: any;
  children: (item: any) => React.ReactChild;
  styleContainer?: any;
}

const CardItems: React.SFC<CardItemsProps> = (props) => {
  const { item, children } = props;
  item.prueba = 0;
  return (
    <View style={styles.root}>
      <Card style={{ elevation: 3 }}>
        <View
          style={{
            padding: 1,
            borderBottomColor: "#E3E8E5",
            borderBottomWidth: 1,
          }}
        >
          {/* <ImageBackground
						source={{ uri: item.uri }}
						style={styles.image}></ImageBackground> */}
          <Image
            style={{ height: 70, resizeMode: "contain" }}
            source={{
              uri: item.uri,
            }}
          ></Image>
        </View>
        <CardItem>
          <View style={{ width: "100%" }}>
            <Text
              numberOfLines={1}
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 18 }}
            >
              {item.name}
            </Text>
            <Text note style={{ textAlign: "center", fontSize: 8 }}>
              Cantidad: {item.quantity}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                note
                numberOfLines={1}
                style={{ textAlign: "center", fontSize: 13, height: 25 }}
              >
                PEN {formatMoney(item.price)} x {item.unidad_media}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                justifyContent: "space-between",
              }}
            >
              {children(item)}
            </View>
          </View>
        </CardItem>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "50%",
    minHeight: 200,
  },
  headerImage: {
    width: "100%",
    minHeight: 130,
  },
  image: {
    minHeight: 130,
    flex: 1,
    resizeMode: "cover",
  },
});

export default CardItems;
