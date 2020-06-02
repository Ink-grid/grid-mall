import * as React from "react";
import { Button, Text, Container, View } from "native-base";
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import stripe from "../../utils/stripe-client";
import CreditCar from "../../components/CreditCard";
import formatMoney from "../../utils/utils";

export interface SetPagosProps {
  route: any;
  navigation: any;
}

type cardData = {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
};

const SetPagos: React.SFC<SetPagosProps> = (props) => {
  const { navigation, route } = props;
  // console.log(Number.isInteger(route.params.precioTotal));
  const [isLoading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");

  console.log(route.params);

  if (!route.params) return null;

  const verificarPrecioStripe = (precio: number) => {
    if (Number.isInteger(precio)) {
      return precio;
    } else {
      const numbersplit = precio.toString();
      const arraynumber = numbersplit.split(".");
      const addCeros = arraynumber[0] + "00";
      return parseFloat(parseFloat(addCeros + "." + arraynumber[1]).toFixed(2));
    }
  };

  const newProductFromat = (product: [any]) => {
    const products: any[] = [];
    product.forEach((produc) => {
      products.push({ product: produc.sku, quantity: produc.quantity });
    });
    return products;
  };

  const onPayment = async (cardData: cardData) => {
    setLoading(true);
    let card = await stripe(
      "pk_test_zl4p8eMOJLM10kaRbpIDT9MB00Pvo5K9LW"
    ).createToken({ card: { ...cardData } });
    let token = card.id;

    const data = {
      email: email,
      source: token,
      price: verificarPrecioStripe(route.params.precioTotal),
      deleted: route.params.deleted,
      order: {
        client: route.params.order.client,
        direction: route.params.order.direction,
        distrito: route.params.order.distrito,
        quantity_total: route.params.order.total,
        statePedido: route.params.order.statePedido || "9yH8O4MjtRa69ZEXPHuC",
        price_total: route.params.precioTotal,
        products: newProductFromat(route.params.order.products),
        state: false,
      },
    };
    setLoading(false);
    console.log(data);
    navigation.navigate("ScreensNoswipe", {
      screen: "ConfirmarPagoStripe",
      params: { data: data, metodoPago: 0 },
    });
    // send token to backend for processin
  };

  return (
    <Container>
      <CreditCar
        onSubmit={(data, email, isCompleted) => {
          setEmail(email);
          return (
            <Button
              disabled={!isCompleted || isLoading}
              onPress={() => onPayment(data)}
            >
              <Text style={{ textAlign: "center", width: "100%" }}>
                Pagar PEN {formatMoney(route.params.precioTotal)}
              </Text>
            </Button>
          );
        }}
      />
    </Container>
  );
};

export default SetPagos;
