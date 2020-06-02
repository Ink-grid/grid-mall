import * as React from "react";
import { Container, View, Spinner, Text } from "native-base";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { ToastAndroid } from "react-native";
import { useFocusEffect, CommonActions } from "@react-navigation/native";

export interface ComfirOrdersProps {
  navigation: any;
  route: any;
}

const createPago = gql`
  mutation CreateNewTransactionPayment(
    $email: String!
    $source: String!
    $price: Float!
    $order: OrderInputs!
    $deleted: String
  ) {
    createNewTransactionPayment(
      input: {
        email: $email
        source: $source
        price: $price
        order: $order
        deleted: $deleted
      }
    )
  }
`;

const createPedido = gql`
  mutation CreateOrder(
    $client: String!
    $direction: String!
    $distrito: String!
    $quantity_total: Int!
    $statePedido: String!
    $price_total: Float!
    $products: [OrderDetails]!
    $state: Boolean!
  ) {
    createOrder(
      input: {
        client: $client
        direction: $direction
        distrito: $distrito
        quantity_total: $quantity_total
        statePedido: $statePedido
        price_total: $price_total
        products: $products
        state: $state
      }
    )
  }
`;

const ComfirPagoStripe: React.SFC<ComfirOrdersProps> = (props) => {
  const { navigation, route } = props;

  console.log("console data", route.params.data);

  const [createAction] = useMutation(createPago);
  const [createOrders] = useMutation(createPedido);

  const responseTrue = () => {
    ToastAndroid.showWithGravity(
      "Se realizo con exito su pedido, pronto nos contactaremos con usted",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Screens" }],
      })
    );
  };

  const responseFalse = () => {
    navigation.goBack();
    ToastAndroid.showWithGravity(
      "Ocurrio un error inesperado, por favor intentelo más tarde.",
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  const setOrderAsync = async () => {
    try {
      // console.log("hola");
      const respose = await createAction({ variables: route.params.data });
      if (respose) {
        responseTrue();
      } else {
        responseFalse();
      }
    } catch (error) {
      console.log(error);
      navigation.goBack();
      ToastAndroid.showWithGravity(
        "Ocurrio un error inesperado",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  const addOrder = async () => {
    try {
      const response = await createOrders({
        variables: route.params.data,
      });
      if (response) {
        responseTrue();
      } else {
        responseFalse();
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      navigation.goBack();
      ToastAndroid.showWithGravity(
        "Ocurrio un error inesperado",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log("focus singIng");
      if (route.params.metodoPago === 0) {
        setOrderAsync();
      } else {
        addOrder();
      }
    }, [])
  );

  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
        {route.params.metodoPago === 0 ? (
          <Text>Confirmando pago, por favor espere ... </Text>
        ) : (
          <Text>Confirmando pedido, por favor espere ...</Text>
        )}
      </View>
    </Container>
  );
};

export default ComfirPagoStripe;
