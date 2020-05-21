import React from "react";
import { View } from "native-base";
import { AsyncStorage } from "react-native";
import useDidUpdate from "../useDidUpdate";
//import useDidUpdate from "../useDidUpdate";

type pedido = {
  //category: string;
  products: Array<any>;
  precioTotal: number;
  total: number;
};

export interface ShopingCardProps {
  data: any[];
  search?: string;
  renderItems: (
    data: any[],
    pedidos: pedido,
    count: number,
    onSave: (sku: string) => void,
    onRemove?: (sku: string) => void,
    onDeleTed?: (sku: string) => void
  ) => React.ReactChild;
}

const ShopingCard: React.SFC<ShopingCardProps> = (props) => {
  const { data, renderItems, search } = props;

  const [products] = React.useState<any[]>(data);
  const [counts, setCount] = React.useState(0);
  const [searchProduc, setSearch] = React.useState<any>();
  const [pedido, setPedido] = React.useState<pedido>({
    products: [],
    precioTotal: 0,
    total: 0,
  });

  const getPedidoLocalStorage = async () => {
    let response = await AsyncStorage.getItem("pedido");
    if (response) {
      let pedido: pedido = JSON.parse(response);
      setPedido(pedido);
      setCount(pedido.total);
    }
  };

  //[*] funcion para calcular el precio total y la cantidad de los productos
  const sumTotal = () => {
    var total = 0;
    var precioTotal = 0;

    pedido.products.forEach((product) => {
      total += product.quantity;
      precioTotal += product.price * product.quantity;
    });
    setPedido((prevent) => ({
      ...prevent,
      total: total,
      precioTotal: precioTotal,
    }));
    //setCount((prev) => prev + 1);
    //count(total);
  };

  const handlerAddProduct = (indexCart: number) => {
    var statusCopy = Object.assign({}, pedido.products);
    statusCopy[indexCart].quantity += 1;
    setCount((prev) => prev + 1);
    sumTotal();
  };

  // [*] funcion para guardar el producto entrante en el carrito
  const handleSaveProduct = (productId: string) => {
    //[*] recuperamos el producto
    let product = products.find((product: any) => product.sku === productId);

    //let indexProduct = productos.findIndex(index => index.sku === product!.sku);
    //[*] verificamos si existe el producto
    let existeproductinPedido = pedido.products!.find(
      (product) => product.sku === productId
    );

    if (existeproductinPedido) {
      let indexPedido = pedido.products!.findIndex(
        (index) => index.sku === existeproductinPedido!.sku
      );
      handlerAddProduct(indexPedido);
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

  const handleRemovebyCantidad = (productID: String) => {
    let statusCopy = Object.assign({}, pedido.products);

    let indexPedido = pedido.products!.findIndex(
      (index) => index.sku === productID
    );
    if (!pedido.products[indexPedido]) return;

    if (statusCopy[indexPedido].quantity === 0 || pedido.total <= 1) {
      let statusCopyArray = Object.assign([], pedido.products);
      statusCopyArray.splice(indexPedido, 1);
      setPedido((prev) => ({ ...prev, products: statusCopyArray }));
      if (pedido.total === 1) {
        setCount(0);
        setPedido((prev) => ({ ...prev, precioTotal: 0, total: 0 }));
        // AsyncStorage.removeItem('products');
        // actions.setProducts(null);
      }
      return null;
      // copyProduct.splice(indexProduct, 1);
    }
    statusCopy[indexPedido].quantity -= 1;
    setCount((count: number) => {
      return count - 1;
    });
    sumTotal();
    //actions.setOrders(pedido);
  };

  const handleRemoveProduct = (productId: string) => {
    let indexProduct = pedido.products.findIndex(
      (index) => index.sku === productId
    );
    if (indexProduct !== -1) {
      let copyProduct = Object.assign([], pedido.products);
      copyProduct.splice(indexProduct, 1);
      setPedido((prevState) => ({ ...prevState, products: copyProduct }));
      sumTotal();
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

  React.useEffect(() => {
    getPedidoLocalStorage();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {renderItems(
        searchProduc || products,
        pedido,
        counts,
        handleSaveProduct,
        handleRemovebyCantidad,
        handleRemoveProduct
      )}
    </View>
  );
};

export default ShopingCard;
