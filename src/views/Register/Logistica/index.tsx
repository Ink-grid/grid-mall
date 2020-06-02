import * as React from "react";
import { Container, View } from "native-base";
import HeaderComponent from "../../../components/Header";
import CustomList from "../../../components/CustomList";
import { ScrollView } from "react-native-gesture-handler";
import { RefreshControl } from "react-native";
import PaperImage from "../../../components/PaperImage";
import gql from "graphql-tag";

export interface LogisticaProps {
  navigation: any;
  route: any;
}

type userLogistica = {
  uid: string;
  name: string;
  description: string;
  uri: string;
};

const getLogistica = gql`
  {
    getTypeLogisticas {
      uid
      name
      description
      uri
    }
  }
`;

const Logistica: React.SFC<LogisticaProps> = (props) => {
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
          query={getLogistica}
          resolve="getTypeLogisticas"
          renderIten={(data: [userLogistica], { onRefresh, refreshing }) => (
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
                      navigation.navigate("RegisterLogistica", {
                        uid: client.uid,
                      })
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

export default Logistica;
