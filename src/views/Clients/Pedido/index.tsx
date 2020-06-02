import * as React from "react";
import {
  Container,
  View,
  Text,
  Spinner,
  Button,
  Icon,
  Card,
} from "native-base";
import HeaderComponent from "../../../components/Header";
import Stepper, { ProgressStep } from "../../../components/Stepper";
import InputGroud from "../../../components/Form/input";
import useDidUpdate from "../../../components/useDidUpdate";
import { StoreContext } from "../../../context/StoreContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  StyleSheet,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
} from "react-native";
import { SelectComponent } from "../../../components/Form/select/indext";
import PaperImage from "../../../components/PaperImage";
import ModalComponent from "../../../components/Modal";
import { ScrollView } from "react-native-gesture-handler";
import formatMoney from "../../../utils/utils";
import { useFocusEffect } from "@react-navigation/native";
import CustomList from "../../../components/CustomList";
import { useDidError } from "../../Register/components/Hooks";

export interface PedidoProps {
  navigation: any;
  route: any;
}

// type pedido = {
//   precioTotal: number;
//   products: [];
//   total: number;
// };

const useInputState = (initialValue: string = "") => {
  const [value, setValue] = React.useState(initialValue);
  useDidUpdate(() => {
    setValue(initialValue);
  }, [initialValue]);
  return { value, onChangeText: setValue };
};

const query = gql`
  query($uid: String!) {
    getClient(uid: $uid) {
      razon_social
      ruc
      phone
      email
      direction
    }
  }
`;

const getDirection = gql`
  {
    getPricebyAddress {
      _uid
      price
      location
    }
  }
`;

const UpdateClient = gql`
  mutation UpdateClient($uid: String, $input: UpdateCLient) {
    updateClient(uid: $uid, input: $input)
  }
`;

const Pedido: React.SFC<PedidoProps> = (props) => {
  const { navigation, route } = props;
  const { state } = React.useContext(StoreContext);
  const [updateClien] = useMutation(UpdateClient);
  const [isDisabled, setDisabled] = React.useState(true);

  // console.log(route);
  const [priceEnvio, setPriceEnvio] = React.useState<{
    price: number;
    distrito: string;
  }>({ price: 0, distrito: "" });

  const [isDeatilProduct, setProduct] = React.useState(false);
  const [pago, setpago] = React.useState(0);

  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      uid: state.userToken,
    },
  });

  const razon_social = useInputState(data && data.getClient.razon_social);
  const ruc = useInputState(data && data.getClient.ruc);
  const phone = useInputState(data && data.getClient.phone);
  const email = useInputState(data && data.getClient.email);
  const direction = useInputState(data && data.getClient.direction);
  // console.log(pruebaSS);

  const directionError = useDidError(direction.value);
  console.log(route.params);

  const prueba: any = [
    {
      direction: "column",
      items: [
        {
          status: "basic",
          label: "Razon social",
          placeholder: "prueba",
          disabled: isDisabled,
          defaultState: razon_social,
        },
        {
          input: "numeric",
          status: "basic",
          label: "ruc",
          placeholder: "prueba",
          disabled: isDisabled,
          defaultState: ruc,
        },
      ],
    },
    {
      direction: "row",
      items: [
        {
          input: "numeric",
          status: "basic",
          label: "Numero de celular",
          placeholder: "prueba",
          disabled: isDisabled,
          defaultState: phone,
        },
        {
          status: "basic",
          label: "Correo",
          placeholder: "prueba",
          disabled: isDisabled,
          defaultState: email,
        },
      ],
    },
  ];

  const showessage = () => {
    Alert.alert(
      "¿Quieres salir sin terminar de realizar el pedido?",
      "Si sales ahora, perderás el progreso que hayas hecho.",
      [
        {
          text: "Seguir realizando el pedido",
          onPress: () => console.log("cancel"),
          style: "cancel",
        },
        {
          text: "Salir sin realizar el pedido",
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
    return true;
  };

  const newProductFromat = (product: [any]) => {
    const products: any[] = [];
    product.forEach((produc) => {
      products.push({ product: produc.sku, quantity: produc.quantity });
    });
    return products;
  };

  const updateClient = async () => {
    setDisabled(true);
    try {
      const response = await updateClien({
        variables: {
          uid: state.userToken,
          input: {
            razon_social: razon_social.value,
            ruc: ruc.value,
            phone: phone.value,
            email: email.value,
            direction: direction.value,
          },
        },
      });

      if (response) {
        ToastAndroid.showWithGravity(
          "Se actualizo con exito sus datos",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
        await refetch();
      } else {
        ToastAndroid.showWithGravity(
          "Ocurrio un error al actualizar sus datos",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravity(
        "Ocurrio un error inesperado al actualizar sus datos.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  };

  const message = (message: string) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", showessage);

      // Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      // Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", showessage);
        // Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
        // Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
      };
    }, [])
  );

  if (error)
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent
          leftActions={{
            iconName: "arrowleft",
            iconType: "AntDesign",
            actions: () => navigation.goBack(),
          }}
        />
        <Text note style={{ textAlign: "center" }}>
          Ocurrio un error inesperado al obtener los datos!.
        </Text>
      </View>
    );
  if (loading && !error)
    return (
      <View style={{ flex: 1 }}>
        <HeaderComponent
          leftActions={{
            iconName: "arrowleft",
            iconType: "AntDesign",
            actions: () => navigation.goBack(),
          }}
        />
        <Spinner></Spinner>
      </View>
    );

  return (
    <Container>
      <HeaderComponent
        background="green"
        leftActions={{
          iconName: "arrowleft",
          iconType: "AntDesign",
          actions: () => navigation.goBack(),
        }}
      />

      {/* [*] Productos list */}
      <ModalComponent
        animated="fade"
        isVisible={isDeatilProduct}
        title="Productos:"
        close={() => setProduct(false)}
      >
        <View style={{ padding: 5, height: 400 }}>
          <ScrollView>
            {route.params.pediodo.products.map(
              (product: any, index: number) => (
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
                      <Text style={{ fontSize: 8 }} note>
                        {formatMoney(product.price)} x {product.unidad_media}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <View>
                        <Text>
                          Cantidad:{" "}
                          <Text note>
                            {product.quantity} {product.unidad_media}{" "}
                          </Text>
                        </Text>
                        <Text>
                          Precio:{" "}
                          <Text note>
                            {formatMoney(product.price * product.quantity)}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              )
            )}
          </ScrollView>
        </View>
      </ModalComponent>
      <Stepper>
        <ProgressStep
          onNext={() => {
            if (isDisabled) {
              return true;
            }
            message("Actualice sus datos");
            return false;
          }}
          label="Confirmar datos"
        >
          <View style={{ padding: 10 }}>
            <Text style={s.title}>¡Por favor confirme sus datos!.</Text>
            <InputGroud data={prueba} />

            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "30%", paddingRight: 10 }}>
                <Button
                  onPress={() => setDisabled(!isDisabled)}
                  style={{ backgroundColor: "#278C0A", marginTop: 10 }}
                  small
                  full
                >
                  <Text style={{ textTransform: "lowercase" }}>
                    {isDisabled ? "Habilitar" : "Bloquear"}
                  </Text>
                </Button>
              </View>
              <View style={{ width: "70%" }}>
                <Button
                  full
                  small
                  disabled={isDisabled}
                  onPress={() => updateClient()}
                  style={isDisabled ? s.gray : s.green}
                >
                  <Text>Acutalizar datos</Text>
                </Button>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          onNext={() =>
            directionError.status !== null ? directionError.status : true
          }
          label="Confirmar dirección"
        >
          <View style={{ padding: 10 }}>
            <Text style={s.title}>
              ¡Por favor confirme su direccion de envio!.
            </Text>

            <InputGroud
              data={[
                {
                  direction: "row",
                  items: [
                    {
                      status:
                        directionError.status !== null
                          ? directionError.status
                            ? "basic"
                            : "danger"
                          : "basic",
                      label: "Direccion",
                      placeholder: "Ingrese su direccion",
                      disabled: false,
                      defaultState: direction,
                    },
                  ],
                },
              ]}
            />

            <CustomList
              query={getDirection}
              resolve="getPricebyAddress"
              renderIten={(data) => {
                const formatData: any = [];
                data.forEach((element: any) => {
                  formatData.push({
                    label: element.location,
                    value: element.price,
                  });
                });
                return (
                  <SelectComponent
                    label="Seleccione el distrito de envio"
                    onChangeValue={(value, label) =>
                      setPriceEnvio({ price: value, distrito: label! })
                    }
                    items={formatData}
                  />
                );
              }}
            />
          </View>
        </ProgressStep>
        <ProgressStep onNext={() => true} label="Confirmar Pedido">
          <View style={{ padding: 10 }}>
            <Text style={s.title}>Detalle pedido.</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: "50%" }}>
                <Text style={s.padding}>
                  <Icon
                    name="product-hunt"
                    style={{ fontSize: 20 }}
                    type="FontAwesome"
                  />{" "}
                  Productos
                </Text>
                <Text style={s.padding}>
                  <Icon
                    name="direction"
                    style={{ fontSize: 20 }}
                    type="Entypo"
                  />
                  Direccion de envio
                </Text>
                <Text style={s.padding}>
                  <Icon
                    name="dollar"
                    style={{ fontSize: 20 }}
                    type="FontAwesome"
                  />{" "}
                  Precio de envio
                </Text>
                <Text style={s.padding}>
                  <Icon
                    name="bookmark"
                    style={{ fontSize: 20 }}
                    type="Entypo"
                  />
                  Precio total (IGV)
                </Text>
              </View>
              <View
                style={{
                  width: "20%",
                  alignItems: "flex-end",
                }}
              >
                <View style={s.padding}>
                  <Button
                    small
                    onPress={() => setProduct(true)}
                    style={{ backgroundColor: "green", height: 20, width: 75 }}
                  >
                    <Text style={{ fontSize: 8, textTransform: "lowercase" }}>
                      ver detalle
                    </Text>
                  </Button>
                </View>
              </View>
              <View
                style={{
                  width: "30%",
                  //alignItems: "center",
                }}
              >
                <Text style={s.padding} note>
                  PEN {formatMoney(route.params.pediodo.precioTotal)}
                </Text>
                <Text numberOfLines={1} style={s.padding2} note>
                  {direction.value}
                </Text>
                <Text style={s.padding2} note>
                  PEN {formatMoney(priceEnvio.price)}
                </Text>
                <Text style={[s.padding2, { paddingRight: 0 }]} note>
                  PEN{" "}
                  {formatMoney(
                    route.params.pediodo.precioTotal + priceEnvio.price
                  )}
                </Text>
              </View>
            </View>
          </View>
        </ProgressStep>
        <ProgressStep
          onSubmit={() =>
            pago === 0
              ? navigation.navigate("Pagos", {
                  order: {
                    ...route.params.pediodo,
                    direction: direction.value,
                    precioTotal:
                      route.params.pediodo.precioTotal + priceEnvio.price,
                    distrito: priceEnvio.distrito,
                    client: state.userToken,
                    state: false,
                  },
                  precioTotal:
                    route.params.pediodo.precioTotal + priceEnvio.price,
                })
              : navigation.navigate("ScreensNoswipe", {
                  screen: "ConfirmarPagoStripe",
                  params: {
                    data: {
                      client: state.userToken,
                      direction: direction.value,
                      distrito: priceEnvio.distrito,
                      quantity_total: route.params.pediodo.total,
                      statePedido: "9yH8O4MjtRa69ZEXPHuC",
                      price_total:
                        route.params.pediodo.precioTotal + priceEnvio.price,
                      products: newProductFromat(route.params.pediodo.products),
                      state: false,
                    },
                    metodoPago: 1,
                  },
                })
          }
          label="Confirmar Pago"
        >
          <View style={{ padding: 10 }}>
            <Text style={s.title}>
              ¡Por favor seleccione el metodo de pago!.
            </Text>
            {[
              {
                type: "Tarjeta de debito/visa",
                uri: "https://www.nada.com",
                description:
                  "Las tarjetas Visa de débito son más convenientes que el efectivo y los cheques. Para las compras de todos los días y para lo que necesites.",
              },
              {
                type: "Pago por entrega",
                uri: "https://www.nada.com",
                description:
                  "Si aún no confias en nosotros o tienes problemas o no cuentas con una trajeta puedes elejir pago por entrega ",
              },
            ].map((user, index) => (
              <View key={index} style={index === pago ? s.pago : null}>
                <PaperImage
                  onPress={() => setpago(index)}
                  vertical
                  description={user.description}
                  title={user.type}
                  uri={user.uri}
                ></PaperImage>
              </View>
            ))}
            <Text
              note
              style={{ textAlign: "center", marginTop: 20, fontSize: 10 }}
            >
              Al tocar "Terminar", aceptas nuestras Condiciones, la Política de
              datos y la Política de cookies. para mas infomarcion puedes
              consultar nuestra seccion aqui!.
            </Text>
          </View>
        </ProgressStep>
      </Stepper>
    </Container>
  );
};

const s = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 23,
    padding: 10,
  },
  gray: { backgroundColor: "gray", marginTop: 10 },
  green: { backgroundColor: "green", marginTop: 10 },
  pago: {
    width: "100%",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "green",
    zIndex: 100,
  },
  padding: {
    padding: 10,
  },
  padding2: {
    padding: 10,
    marginTop: 5,
  },
});

export default Pedido;
