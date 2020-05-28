import * as React from "react";
import { View } from "native-base";
import useDidUpdate from "../useDidUpdate";
import { AsyncStorage } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

type pedido = {
  //category: string;
  products: Array<any>;
  precioTotal: number;
  total: number;
};

export interface ShopingListProps {
  data: any[];
  update?: any;
  search?: string;
  renderItems: (
    data: any[],
    pedidos: pedido,
    count: number,
    onSave: (sku: string) => void,
    onDeleTed?: (sku: string) => void
  ) => React.ReactChild;
}

const ShopingList: React.SFC<ShopingListProps> = (props) => {
  const { data, renderItems, search } = props;

  //console.log("desde codigo nativo", data);
  //const { state } = React.useContext(StoreContext);

  const [products, setProducts] = React.useState<any[]>(data);
  const [counts, setCount] = React.useState(0);
  const [searchProduc, setSearch] = React.useState<any>();
  const [pedido, setPedido] = React.useState<pedido>({
    products: [],
    precioTotal: 0,
    total: 0,
  });

  console.log(pedido);

  const savePedido = async () => {
    try {
      await AsyncStorage.setItem("pedido", JSON.stringify(pedido));
    } catch (error) {
      console.log(error);
      alert("Ocurrio un error inesperado, por favor vuelva a intentarlo");
    }
  };

  const getPedidoLocalStorage = async () => {
    let response = await AsyncStorage.getItem("pedido");
    if (response) {
      let pedido: pedido = JSON.parse(response);
      setPedido(pedido);
      setCount(pedido.total);
    } else {
      setPedido({
        products: [],
        precioTotal: 0,
        total: 0,
      });
      setCount(0);
    }
  };

  // [*] funcion para guardar el producto entrante en el carrito
  const handleSaveProduct = (productId: string) => {
    //[*] recuperamos el producto
    // console.log("desde hanlde", productId);

    let product = products.find((product: any) => product.sku === productId);

    //let indexProduct = productos.findIndex(index => index.sku === product!.sku);
    //[*] verificamos si existe el producto
    let existeproductinPedido = pedido.products!.find(
      (product) => product.sku === productId
    );

    if (existeproductinPedido) {
      alert("El producto ya existe en la lista de pedidos");
    } else {
      let copyProduct = Object.assign({}, product);
      copyProduct.quantity = 1;
      setPedido((prevent) => ({
        products: prevent.products.concat(copyProduct),
        precioTotal: copyProduct.price + prevent.precioTotal,
        total: copyProduct.quantity + prevent.total,
      }));
      setCount((prev) => prev + 1);
      //sumTotal();
    }
  };

  const handleRemoveProduct = (productId: string) => {
    let indexProduct = pedido.products.findIndex(
      (index) => index.sku === productId
    );

    if (indexProduct !== -1) {
      let copyProduct = Object.assign([], pedido.products);
      //copyProduct[indexProduct].observers = 0
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
      //sumTotal();
      setCount((prev) => (prev !== 0 ? prev - 1 : 0));
      //actions.setProducts(pedido);
    }
  };

  useDidUpdate(() => {
    if (products) {
      //let sear = new RegExp(search, 'i')
      if (search!.length === 0) {
        //console.log('searc is null');
        setSearch(null);
        return;
      } else {
        let searc = new RegExp(search!, "i");
        let item = products.filter(
          (e: any) => searc.test(e.name) //.indexOf(search) > -1
        );
        setSearch(item);
      }
    }
  }, [search]);

  useDidUpdate(() => {
    savePedido();
  }, [pedido.products]);

  useDidUpdate(() => {
    setProducts(data);
  }, [data]);

  React.useEffect(() => {
    getPedidoLocalStorage();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getPedidoLocalStorage();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {renderItems(
        searchProduc || products,
        pedido,
        counts,
        handleSaveProduct,
        handleRemoveProduct
      )}
    </View>
  );
};

export default ShopingList;
