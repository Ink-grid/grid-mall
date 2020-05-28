/** @format */

import * as React from "react";
import { View, RefreshControl } from "react-native";
import PaperImage from "../../../components/PaperImage";
import { Container } from "native-base";
import HeaderComponent from "../../../components/Header";
import CustomList from "../../../components/CustomList";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";

export interface VisitanteProps {
  navigation: any;
  route: any;
}

type client = {
  _uid: string;
  name: string;
  description: string;
  uri: string;
};

const getClients = gql`
  {
    getTypeClients {
      _uid
      name
      description
      uri
    }
  }
`;

const Visitante: React.SFC<VisitanteProps> = (props) => {
  const { navigation, route } = props;
  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <HeaderComponent
        leftActions={{
          iconName: "arrowleft",
          iconType: "AntDesign",
          actions: () => navigation.goBack(),
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CustomList
          query={getClients}
          resolve="getTypeClients"
          renderIten={(data: [client], { onRefresh, refreshing }) => (
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {data.map((client, index) => (
                <View key={index} style={{ padding: 10, width: "100%" }}>
                  <PaperImage
                    onPress={() =>
                      navigation.navigate("Register", { uid: client._uid })
                    }
                    vertical
                    description={client.description}
                    title={client.name}
                    uri={client.uri}
                  ></PaperImage>
                </View>
              ))}
            </ScrollView>
          )}
        />
      </View>
    </Container>
  );
};

export default Visitante;
