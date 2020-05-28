import * as React from "react";
import { Button, Text, Container, View } from "native-base";
// import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import stripe from "../../utils/stripe-client";
import CreditCar from "../../components/CreditCard";

export interface SetPagosProps {
  pedido: any;
  route: any;
}

type cardData = {
  number: string;
  exp_month: string;
  exp_year: string;
  cvc: string;
  name: string;
};

const SetPagos: React.SFC<SetPagosProps> = (props) => {
  const { pedido, route } = props;
  const onPayment = async (cardData: cardData) => {
    console.log(cardData);
    let card = await stripe(
      "pk_test_zl4p8eMOJLM10kaRbpIDT9MB00Pvo5K9LW"
    ).createToken({ card: { ...cardData } });
    console.log(card);
    let token = card.id;
    console.log(token);
    // send token to backend for processin
  };

  return (
    <Container>
      <CreditCar
        onSubmit={(data, email, isCompleted) => {
          return (
            <Button disabled={!isCompleted} onPress={() => onPayment(data)}>
              <Text style={{ textAlign: "center", width: "100%" }}>
                Pagar PEN 400
              </Text>
            </Button>
          );
        }}
      />
      {/* <Button onPress={() => onPayment()}>
        <Text>pagar</Text>
      </Button> */}
    </Container>
  );
};

export default SetPagos;
