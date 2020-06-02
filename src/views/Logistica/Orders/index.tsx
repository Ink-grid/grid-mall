import * as React from "react";
import { Content } from "native-base";
import HeaderComponent from "../../../components/Header";

export interface PedidosLogisticaProps {
  navigation: any;
}

const PedidosLogistica: React.SFC<PedidosLogisticaProps> = (props) => {
  const { navigation } = props;
  return (
    <Content>
      <HeaderComponent
        leftActions={{
          iconName: "md-arrow-round-back",
          iconType: "Ionicons",
          actions: () => navigation.goBack(),
        }}
        background="white"
        title="Pedidos"
        rightItems={[]}
      />
    </Content>
  );
};

export default PedidosLogistica;
