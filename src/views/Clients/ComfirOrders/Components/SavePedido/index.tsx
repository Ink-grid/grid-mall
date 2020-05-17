/** @format */

import * as React from 'react';
import ModalComponent from '../../../../../components/Modal';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import useDidUpdate from '../../../../../components/useDidUpdate';

type products = {
	sku: string;
	quantity: number;
	price: number;
};

type order = {
	products: [products];
	direction: string;
	client: string;
	price_total: number;
	quantity_total: number;
};

export interface SavePedidoProps {
	order: order;
	active: boolean;
	errors: (error: boolean, reload: React.Dispatch<any>) => void;
	children: (state: boolean) => React.ReactChild;
	close: () => void;
}

const CREATE_PEDIDO = gql`
	mutation CreateOrder(
		$products: [ProducOrder]!
		$direction: String!
		$price_total: Float!
		$quantity_total: Int!
		$client: String!
	) {
		createOrder(
			input: {
				products: $products
				direction: $direction
				client: $client
				price_total: $price_total
				quantity_total: $quantity_total
			}
		) {
			_uid
		}
	}
`;

const SavePedido: React.SFC<SavePedidoProps> = props => {
	const { order, active, close, children, errors } = props;
	const [isSavePedido, setPedido] = React.useState(false);
	//const [isError, setError] = React.useState(false);
	const [reload, setReload] = React.useState(false);

	// [*] create mutation for client add direction
	const [createClient] = useMutation(CREATE_PEDIDO);

	// [] save order for database function
	const savePedidoAsyn = async () => {
		console.log(order);
		try {
			await createClient({
				variables: {
					products: order.products,
					direction: order.direction,
					client: order.client,
					price_total: order.price_total,
					quantity_total: order.quantity_total
				}
			});
			errors(false, setReload);
			setPedido(true);
		} catch (error) {
			console.log(error);
			errors(true, setReload);
		}
	};

	useDidUpdate(() => {
		if (order && active) {
			savePedidoAsyn();
		}
	}, [reload, active]);

	return (
		<ModalComponent
			header={false}
			isVisible={active}
			style={{
				flex: 1
			}}
			styleConten={{
				position: 'relative',
				backgroundColor: '#fff',
				flex: 1
			}}
			close={close}>
			{children(isSavePedido)}
		</ModalComponent>
	);
};

export default SavePedido;
