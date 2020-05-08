/** @format */
import { useState } from 'react';
//import { StoreContext } from '../../../../context/StoreContext';
import useDidUpdate from '../../../useDidUpdate';
// import { AsyncStorage } from 'react-native';
// import { useFocusEffect } from '@react-navigation/core';
//import { useFocusEffect } from '@react-navigation/core';

interface product {
	sku: string;
	name?: string;
	price: number;
	quantity: number;
	description?: string;
}

interface pedido {
	//category: string;
	products: Array<product>;
	precioTotal: number;
	total: number;
}

const usePedido = (
	setCountPedido: React.Dispatch<any>,
	setPedido: React.Dispatch<any>
) => {
	// const { state, actions } = useContext(StoreContext);
	// console.log('stateProducts', state.produts);

	const [productos, setProducts] = useState<Array<product>>([]);

	const [pedido, setPedidos] = useState<pedido>({
		//category: category,
		products: [],
		precioTotal: 0,
		total: 0
	});

	//console.log(pedido);
	// const savePedio = () => {
	// 	console.log(pedido);
	// 	if (pedido.total > 0) {
	// 		console.log('guradando...');
	// 		actions.setProducts(pedido);
	// 		console.log('guaradado...');
	// 	}
	// };

	const sumTotal = () => {
		let total = 0;
		let precioTotal = 0;
		pedido.products.forEach(product => {
			total += product.quantity;
			precioTotal += product.price * product.quantity;
		});

		// setPedido((preveState:any) => ({
		// ...preveState,
		// total: total,
		// precioTotal: precioTotal
		// }));

		setPedidos(preveState => ({
			...preveState,
			total: total,
			precioTotal: precioTotal
		}));
	};

	const handlerAddProduct = (indexCart: number) => {
		var statusCopy = Object.assign({}, pedido.products);
		statusCopy[indexCart].quantity += 1;
		sumTotal();
	};

	const handleSaveProduct = (productId: string) => {
		let product = productos.find(product => product.sku === productId);
		//let indexProduct = productos.findIndex(index => index.sku === product!.sku);
		let existeproductinPedido = pedido.products!.find(
			product => product.sku === productId
		);
		if (existeproductinPedido !== undefined && existeproductinPedido !== null) {
			let indexPedido = pedido.products!.findIndex(
				index => index.sku === existeproductinPedido!.sku
			);
			handlerAddProduct(indexPedido);
		} else {
			let copyProduct = Object.assign({}, product);
			copyProduct.quantity = 1;
			setPedidos(prevState => ({
				...prevState,
				products: prevState.products.concat(copyProduct)
			}));
			//console.log(copyProduct);
			sumTotal();
		}
	};
	const handleRemovebyCantidad = (productID: String) => {
		let statusCopy = Object.assign({}, pedido.products);

		let indexPedido = pedido.products!.findIndex(
			index => index.sku === productID
		);
		if (!pedido.products[indexPedido]) return;

		if (statusCopy[indexPedido].quantity === 0 || pedido.total <= 1) {
			console.log('pedido tota: ', pedido.total);
			let statusCopyArray = Object.assign([], pedido.products);
			statusCopyArray.splice(indexPedido, 1);
			setPedidos(prev => ({ ...prev, products: statusCopyArray }));
			if (pedido.total === 1) {
				setCountPedido(0);
				// AsyncStorage.removeItem('products');
				// actions.setProducts(null);
			}
			return null;
			// copyProduct.splice(indexProduct, 1);
		}
		statusCopy[indexPedido].quantity -= 1;
		setCountPedido((count: number) => {
			return count - 1;
		});
		sumTotal();
		//actions.setOrders(pedido);
	};

	const handleRemoveProduct = (productId: string) => {
		let indexProduct = pedido.products.findIndex(
			index => index.sku === productId
		);
		if (indexProduct !== -1) {
			let copyProduct = Object.assign([], pedido.products);
			copyProduct.splice(indexProduct, 1);
			setPedidos(prevState => ({ ...prevState, products: copyProduct }));
			sumTotal();
			//actions.setProducts(pedido);
		}
	};

	useDidUpdate(() => {
		sumTotal();
		//actions.setProducts(pedido);
	}, [pedido.products]);

	useDidUpdate(() => {
		setPedido(pedido);
		//actions.setProducts(pedido);
	}, [pedido.total]);

	return {
		handleSaveProduct,
		setProducts,
		handleRemovebyCantidad,
		handleRemoveProduct
	};
};

export default usePedido;
