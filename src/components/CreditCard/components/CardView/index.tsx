import * as React from "react";
import FlipCard from "react-native-flip-card";
import defaultIcons from "../Icons";
import {
  View,
  ImageBackground,
  Image,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

const BASE_SIZE = { width: 300, height: 190 };

type brand =
  | "american-express"
  | "diners-club"
  | "master-card"
  | "visa"
  | "cvc"
  | "cvc_amex"
  | "discover"
  | "jcb"
  | "placeholder";

export interface CardViewProps {
  focused: string;
  brand: brand;
  name: string;
  number: string;
  expiry: string;
  customIcons?: any;
  cvc: string;
  placeholder?: any;
  scale?: number;
  fontFamily?: string;
  imageFront?: number;
  imageBack?: number;
}

const CardView: React.SFC<CardViewProps> = (props) => {
  const {
    name = "",
    brand,
    focused,
    number,
    expiry,
    cvc,
    placeholder = {
      number: "•••• •••• •••• ••••",
      name: "NOMBRE APELLIDO",
      expiry: "••/••",
      cvc: "•••",
    },
    scale = 1,
    fontFamily = Platform.select({ ios: "Courier", android: "monospace" }),
    imageFront = require("../../images/card-front.png"),
    imageBack = require("../../images/card-back.png"),
    customIcons,
  } = props;

  // const image = require("../../images/")

  // console.log(fontFamily);
  // console.log(imageFront);

  const Icons = { ...defaultIcons, ...customIcons };
  const isAmex = brand === "american-express";
  const shouldFlip = !isAmex && focused === "cvc";

  const containerSize = { width: "100%", height: "100%" };
  // const transform = {
  //   transform: [
  //     { scale },
  //     { translateY: (BASE_SIZE.height * (scale - 1)) / 2 },
  //   ],
  // };

  return (
    <View style={[s.cardContainer, containerSize, { borderRadius: 10 }]}>
      <FlipCard
        style={{ borderWidth: 0 }}
        flipHorizontal
        flipVertical={false}
        friction={10}
        perspective={2000}
        clickable={true}
        flip={shouldFlip}
      >
        <ImageBackground
          //style={[BASE_SIZE, s.cardFace, transform]}
          imageStyle={{ borderRadius: 10 }}
          style={[
            {
              flex: 1,
              borderRadius: 10,
              justifyContent: "center",
            },
            s.cardFace,
          ]}
          source={imageFront}
        >
          <Image style={[s.icon]} source={Icons[brand]} />
          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.number,
              !number && s.placeholder,
              focused === "number" && s.focused,
            ]}
          >
            {!number ? placeholder.number : number}
          </Text>
          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.name,
              !name && s.placeholder,
              focused === "name" && s.focused,
            ]}
            numberOfLines={1}
          >
            {!name ? placeholder.name : name.toUpperCase()}
          </Text>
          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.expiryLabel,
              s.placeholder,
              focused === "expiry" && s.focused,
              { marginLeft: "23%" },
            ]}
          >
            MONTH/YEAR
          </Text>
          <Text
            style={[
              s.baseText,
              { fontFamily },
              s.expiry,
              !expiry && s.placeholder,
              focused === "expiry" && s.focused,
              { marginLeft: "23%" },
            ]}
          >
            {!expiry ? placeholder.expiry : expiry}
          </Text>
          {isAmex && (
            <Text
              style={[
                s.baseText,
                { fontFamily },
                s.amexCVC,
                !cvc && s.placeholder,
                focused === "cvc" && s.focused,
              ]}
            >
              {!cvc ? placeholder.cvc : cvc}
            </Text>
          )}
        </ImageBackground>
        <ImageBackground
          style={[
            {
              flex: 1,
              justifyContent: "center",
            },
            s.cardFace,
          ]}
          source={imageBack}
        >
          <Text
            style={[
              s.baseText,
              s.cvc,
              !cvc && s.placeholder,
              focused === "cvc" && s.focused,
            ]}
          >
            {!cvc ? placeholder.cvc : cvc}
          </Text>
        </ImageBackground>
      </FlipCard>
    </View>
  );
};

const s = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  baseText: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
  },
  placeholder: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  focused: {
    fontWeight: "bold",
    color: "rgba(255, 255, 255, 1)",
  },
  number: {
    fontSize: 21,
    position: "absolute",
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: "absolute",
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: "absolute",
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: "absolute",
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: "absolute",
    top: 80,
    right: 30,
  },
});

export default CardView;
