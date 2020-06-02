import * as React from "react";
import { Content } from "native-base";
import HeaderComponent from "../../../components/Header";

export interface ProveedoresLogistcaProps {
  navigation: any;
}

const ProveedoresLogistca: React.SFC<ProveedoresLogistcaProps> = (props) => {
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
        title="Proveedores"
        rightItems={[]}
      />
    </Content>
  );
};

export default ProveedoresLogistca;
