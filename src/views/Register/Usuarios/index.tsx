/** @format */

import * as React from "react";
import { View, RefreshControl } from "react-native";
import PaperImage from "../../../components/PaperImage";
import { Container } from "native-base";
import HeaderComponent from "../../../components/Header";
import CustomList from "../../../components/CustomList";
import gql from "graphql-tag";
import { ScrollView } from "react-native-gesture-handler";

export interface UsuariosProps {
  navigation: any;
}

type user = {
  _uid: string;
  type: string;
  navigate: string;
  uri: string;
};

const getUsers = gql`
  {
    getUsers {
      _uid
      type
      navigate
      uri
    }
  }
`;

const Usuarios: React.SFC<UsuariosProps> = (props) => {
  const { navigation } = props;
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
          query={getUsers}
          resolve="getUsers"
          renderIten={(data: [user], { onRefresh, refreshing }) => (
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {data.map((user, index) => (
                <View key={index} style={{ padding: 10, width: "100%" }}>
                  <PaperImage
                    onPress={() =>
                      navigation.navigate(user.navigate, { uid: user._uid })
                    }
                    vertical
                    //description={client.description}
                    title={user.type}
                    uri={user.uri}
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

export default Usuarios;
