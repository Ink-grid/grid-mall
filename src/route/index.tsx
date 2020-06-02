/** @format */

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { StoreContext } from "../context/StoreContext";
import { Root, Spinner, View, Text, Button } from "native-base";
import Animated from "react-native-reanimated";
import CustomDrawerContent from "./CustomDrawerContent";

// import views
import SignIn from "../views/SignIn";
import Register from "../views/Register";
import Loguot from "../views/Logout";
import {
  Home,
  Products,
  Profile,
  Orders,
  Clients,
  Contracts,
  Transport,
} from "../views/proveedores";

import {
  HomeClient,
  ProductsClient,
  DashboardClient,
  OrdersClient,
  ProfileCliente,
} from "../views/Clients";

import Prueba from "../views/proveedores/Prueba";
import Usuarios from "../views/Register/Usuarios";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
//import Shoping from "../views/Clients/Shoping";
import ConfirOrders from "../views/Clients/ComfirOrders";
import SetPagos from "../views/Pagos";
import Visitante from "../views/Register/Visitante";
import RegsiterClient from "../views/Register/Visitante/Register";
//import ProveedorViews from "../views/Register/Proveedor/ResisterViews";
import Proveedor from "../views/Register/Proveedor";
import Logistica from "../views/Register/Logistica";
import LogisticaRegister from "../views/Register/Logistica/RegisterLogistica";
import Pedido from "../views/Clients/Pedido";
import ComfirPagoStripe from "../views/ComfirOrders";
import Cotizaciones from "../views/Clients/Cotizaciones";
import HomeProvider from "../views/Logistica/Home";
import PedidosLogistica from "../views/Logistica/Orders";
import ProveedoresLogistca from "../views/Logistica/Providers";

//import  home de proveedores, ayuda, perfil, terminos y condiciones
// import AyudaSoporte from '../views/proveedores/Home/ayudaSoporte';
// import TerminosCondiciones from '../views/proveedores/Home/terminosCondiciones/index';
// import Perfil from '../views/proveedores/Home/perfil';

// import views
export interface RouteProps {}
interface ScreensProps {
  style: any;
}

const Drawer = createDrawerNavigator();
const Stacks = createStackNavigator();

// obtenemos las rutas y los datos del cliente
const query = gql`
  query($tokenAccess: String!, $userToken: String!) {
    getAccess(tokenAccess: $tokenAccess, userToken: $userToken) {
      client {
        razon_social
        email
      }
      access {
        icon
        name
        route
        typeIcon
      }
    }
  }
`;

const Route: React.SFC<RouteProps> = () => {
  const { state } = React.useContext(StoreContext);
  console.log(state);
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const [isError, setError] = React.useState(true);

  // [*] CREATE ANIMATION FOR SCAELE
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  //animate the broderRdius of the scene screens
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const screenStyles = { borderRadius, transform: [{ scale }] };

  const Screens: React.SFC<ScreensProps> = (props) => {
    const { loading, error, data, refetch } = useQuery(query, {
      variables: {
        tokenAccess: state.accessToken,
        userToken: state.userToken,
      },
    });

    if (error && !loading) {
      setError(false);
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <Text note>
            Ocurrio un error inesperado, revise su conexeón a internet.
          </Text>
          <Button onPress={() => refetch()}>
            <Text>Volver a intentar</Text>
          </Button>
        </View>
      );
    }

    if (loading && !data) {
      setError(false);
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner></Spinner>
        </View>
      );
    }

    if (data) {
      setError(true);
    }
    return (
      <Animated.View style={[{ flex: 1, overflow: "hidden" }, props.style]}>
        <Stacks.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="HomeClie"
        >
          {/* navigation prooveedore */}

          {getRoute(state.accessToken)}
        </Stacks.Navigator>
      </Animated.View>
    );
  };

  // console.log(state);

  const getRoute = (type: string | null) => {
    console.log("route", type);
    switch (type) {
      case "MW2jB9fvlqaqg49j3ZQf":
        return (
          <>
            <Stacks.Screen name="HomeClie" component={HomeClient} />
            <Stacks.Screen name="OrdersClie" component={OrdersClient} />
            {/* <Stacks.Screen name="ProductsClie" component={ProductsClient} /> */}
            <Stacks.Screen name="ProfileClie" component={ProfileCliente} />
            <Stacks.Screen name="DashboardClie" component={DashboardClient} />
            <Stacks.Screen name="ConfirmarPedido" component={Pedido} />
            <Stacks.Screen name="CotizacionClient" component={Cotizaciones} />
          </>
        );
      case "TMEOHyqNQnuZKuVdoLa2":
        return (
          <>
            <Stacks.Screen name="HomeLogistica" component={HomeProvider} />
            <Stacks.Screen name="OrderLogistica" component={PedidosLogistica} />
            <Stacks.Screen
              name="ProviderLogistica"
              component={ProveedoresLogistca}
            />
          </>
        );
      default:
        return (
          <>
            <Stacks.Screen name="HomeProvider" component={Home} />
            <Stacks.Screen name="ProductProvider" component={Products} />
            <Stacks.Screen name="Profile" component={Profile} />
            <Stacks.Screen name="PedidosProviders" component={Orders} />
            <Stacks.Screen name="InventarioProvider" component={Clients} />
            <Stacks.Screen name="COntratos" component={Contracts} />
          </>
        );
    }
  };

  if (state.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Spinner />
      </View>
    );
  }

  // console.log("state", state);
  return (
    <Root>
      <LinearGradient style={{ flex: 1 }} colors={["#75F075", "#1C3A1C"]}>
        <NavigationContainer>
          <Drawer.Navigator
            drawerType={"slide"}
            overlayColor="transparent"
            drawerStyle={{ width: "50%", backgroundColor: "transparent" }}
            //contentContainerStyle={{ flex: 1 }}
            drawerContentOptions={{
              activeBackgroundColor: "transparent",
              activeTintColor: "green",
              inactiveTintColor: "green",
            }}
            // navigationOptions={{
            // header: null
            // }}
            sceneContainerStyle={{ backgroundColor: "transparent" }}
            drawerContent={(props: any) => {
              setProgress(props.progress);
              return (
                <CustomDrawerContent
                  query={query}
                  accessToken={state.accessToken}
                  useruid={state.userToken}
                  {...props}
                />
              );
            }}
          >
            {state.userToken !== null ? (
              <>
                <Drawer.Screen
                  name="Screens"
                  options={{ swipeEnabled: isError }}
                >
                  {() => <Screens style={screenStyles} />}
                </Drawer.Screen>

                <Drawer.Screen
                  name="ScreensNoswipe"
                  options={{ swipeEnabled: false, unmountOnBlur: true }}
                >
                  {() => (
                    <Stacks.Navigator
                      screenOptions={{
                        headerShown: false,
                      }}
                    >
                      <Stacks.Screen
                        name="ConfirmarPagoStripe"
                        component={ComfirPagoStripe}
                      />
                    </Stacks.Navigator>
                  )}
                </Drawer.Screen>

                <Drawer.Screen
                  name="Logout"
                  options={{ swipeEnabled: false }}
                  component={Loguot}
                />

                {/* <Drawer.Screen
                  name="Shoping"
                  options={{ swipeEnabled: false }}
                  component={Shoping}
                /> */}

                <Drawer.Screen
                  name="ProductsClie"
                  options={{ swipeEnabled: false }}
                  component={ProductsClient}
                />

                <Drawer.Screen
                  name="confirOrders"
                  options={{ swipeEnabled: false }}
                  component={ConfirOrders}
                />

                <Drawer.Screen
                  name="Pagos"
                  component={SetPagos}
                  options={{ swipeEnabled: false }}
                />

                {/* <Drawer.Screen
                  name="ConfirmarPagoStripe"
                  component={ComfirPagoStripe}
                  options={{ swipeEnabled: false }}
                /> */}

                {/* <Drawer.Screen
									name='Shoping'
									component={Shoping}
									options={{ swipeEnabled: false }}
								/> */}
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="SignIn"
                  component={SignIn}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="UserOption"
                  component={Usuarios}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="Register"
                  component={Register}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="Clients"
                  component={Visitante}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="RegisterCLient"
                  component={RegsiterClient}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="RegisterLogistica"
                  component={LogisticaRegister}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="Proveedor"
                  component={Proveedor}
                  options={{ swipeEnabled: false }}
                />

                <Drawer.Screen
                  name="Logistica"
                  component={Logistica}
                  options={{ swipeEnabled: false }}
                />
                {/* <Drawer.Screen
                  name="Proveedores"
                  component={Register}
                  options={{ swipeEnabled: false }}
                />
                <Drawer.Screen
                  name="Logistica"
                  component={Register}
                  options={{ swipeEnabled: false }}
                /> */}
              </>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      </LinearGradient>
    </Root>
  );
};

export default Route;
