import { useState } from "react";
import useDidUpdate from "../../../../../components/useDidUpdate";
import { ToastAndroid } from "react-native";

type product =
  | {
      name: string;
      quantity: number;
      unidad_medida: string;
    }
  | undefined;

type pedido = {
  //category: string;
  products: Array<product>;
  total: number;
};

const usePedidoPer = (product: product) => {
  // const [producto, setProducto] = useState(product)
  const [peido, setPedido] = useState<pedido>({
    products: [],
    total: 0,
  });

  const handleClearProduct = () => {
    setPedido({ products: [], total: 0 });
  };

  const handleAddProduct = (product: product) => {
    if (!product) return null;
    if (
      product.name.length < 1 ||
      !product.quantity ||
      product.unidad_medida.length < 1
    )
      return null;
    let isProduct = peido?.products.find((pro) => pro!.name === product.name);
    if (isProduct) {
      ToastAndroid.showWithGravity(
        "ya existe el producto",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    } else {
      setPedido((presv) => {
        if (presv.products.length === 0) {
          return {
            total: 1,
            products: presv.products.concat(product),
          };
        }
        return {
          products: presv.products.concat(product),
          total: presv.products.length + 1,
        };
      });
    }
  };

  const handleDeletesProduct = (index: number) => {
    const products = peido.products;
    products.splice(index, 1);
    setPedido({ products: products, total: products.length });
  };

  useDidUpdate(() => {
    handleAddProduct(product);
  }, [product]);

  return { peido, handleDeletesProduct, handleClearProduct };
};

export { usePedidoPer };
