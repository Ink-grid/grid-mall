import * as React from "react";
import { View } from "native-base";
import useDidUpdate from "../../../../components/useDidUpdate";
//import { useFocusEffect } from "@react-navigation/native";

type pedido = {
  //category: string;
  products: Array<any>;
  precioTotal: number;
  total: number;
};

export interface GenerateListProps {
  data: pedido;
  renderItem: (
    data: any[],
    pedido: pedido,
    onEdit?: (sku: string, quantiy: number) => void,
    // onSave?: () => void,
    onRemove?: (sku: string) => void
  ) => React.ReactChild;
  children: (total: number, precioTotal: number) => React.ReactChild;
}

const GenerateList: React.SFC<GenerateListProps> = (props) => {
  const { data, renderItem, children } = props;
  //console.log("desde Generate", data);
  //console.log("des nuevo", data);
  const [pedido, setPedido] = React.useState<pedido>(data);

  //console.log("pedio desde generate", pedido);
  const getTotal = () => {
    let priceTotal = 0;
    pedido.products.map((ele) => {
      priceTotal += ele.price * ele.quantity;
    });
    setPedido((prevs) => ({ ...prevs, precioTotal: priceTotal }));
  };

  const handleEdit = (sku: string, quantiy: number) => {
    //let product = pedido.products.find((product: any) => product.sku === sku);
    //[*] verificamos si existe el producto
    let existeproductinPedido = pedido.products!.find(
      (product) => product.sku === sku
    );

    if (existeproductinPedido) {
      let indexPedido = pedido.products!.findIndex(
        (index) => index.sku === existeproductinPedido!.sku
      );
      var statusCopy = Object.assign({}, pedido.products);
      statusCopy[indexPedido].quantity = quantiy !== 0 ? quantiy : 1;
      getTotal();
    }
  };

  const handleRemoveProduct = (productId: string) => {
    let indexProduct = pedido.products.findIndex(
      (index) => index.sku === productId
    );

    if (indexProduct !== -1) {
      let copyProduct = Object.assign([], pedido.products);
      copyProduct.splice(indexProduct, 1);
      setPedido(() => {
        let total = 0;
        let precioTotal = 0;
        copyProduct.forEach((element: any) => {
          total += element.quantity;
          precioTotal += element.price * element.quantity;
        });
        return {
          products: copyProduct,
          precioTotal: precioTotal,
          total: total,
        };
      });
    }
  };

  useDidUpdate(() => {
    setPedido(data);
    getTotal();
  }, [data]);

  React.useEffect(() => {
    setPedido(data);
  }, [data]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("desde screen", data);
  //     setPedido(data);
  //   }, [])
  // );

  return (
    <>
      <View style={{ flex: 1 }}>
        {renderItem(
          pedido.products.filter((e: any) => e.quantity !== 0),
          pedido,
          handleEdit,
          handleRemoveProduct
        )}
      </View>
      <View>{children(pedido.total, pedido.precioTotal)}</View>
    </>
  );
};

export default GenerateList;
