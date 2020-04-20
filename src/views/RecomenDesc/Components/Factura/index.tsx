/** @format */

import * as React from 'react';
import { View } from 'react-native';
import {
	Card,
	CheckBox,
	CardItem,
	Body,
	Text,
	Button,
	ListItem
} from 'native-base';

export interface FacturaProps {}

const Factura: React.SFC<FacturaProps> = () => {
	const [condicoines, setCondiciones] = React.useState(false);

	return (
		<>
			<Card style={{ elevation: 3 }}>
				<CardItem>
					<Body>
						<View
							style={{
								alignItems: 'center'
							}}>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>
								Confirma tu pedido
							</Text>
							<Text style={{ textAlign: 'center', fontSize: 12 }} note>
								Por favor, confirma que deseas realizar la compra de:
							</Text>
						</View>
					</Body>
				</CardItem>
				<CardItem cardBody>
					<View style={{ paddingLeft: 10, paddingBottom: 10 }}>
						{[
							'Nombre de paquete',
							'Producto',
							'Fecha de compra',
							'Costo (inc. IGV)',
							'Metodo de pago'
						].map((ele, index) => (
							<View
								key={index}
								style={{
									flexDirection: 'row',
									width: 365,
									justifyContent: 'space-between'
								}}>
								<Text style={{ fontSize: 13 }}>{ele}:</Text>
								<Text note> Semana saludable</Text>
							</View>
						))}
					</View>
				</CardItem>
			</Card>
			<View
				style={{
					flexDirection: 'row',
					padding: 5,
					justifyContent: 'center'
				}}>
				<CheckBox
					onPress={() => setCondiciones(!condicoines)}
					color={'#1A2138'}
					checked={condicoines}
				/>
				<View style={{ marginLeft: 20 }}>
					<Text style={{ fontSize: 10 }}>
						Aceptop los terminos y condiciones
					</Text>
				</View>
			</View>
			<Button disabled={!condicoines}>
				<Text style={{ textAlign: 'center', width: '100%' }}>comprar</Text>
			</Button>
		</>
	);
};

export default Factura;
