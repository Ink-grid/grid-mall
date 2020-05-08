/** @format */

import * as React from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { View, Text, Thumbnail } from 'native-base';
import CardComponent from '../Card';
import Carousel from '../Carousel';

export interface RecomendacionesProps {
	navigation: any;
}

const Recomendaciones: React.SFC<RecomendacionesProps> = props => {
	const { navigation } = props;
	return (
		<View style={styles.container}>
			<Carousel
				style='stats'
				auto
				delay={4000}
				bulledPosition={{ top: 0, justifyContent: 'flex-end' }}
				PerInterval={3}
				items={[
					{
						uri:
							'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/28/0e/para-compartir.jpg',
						title: 'semana criollo',
						description: 'dasd'
					},
					{
						uri: 'https://www.protocolo.org/extfiles/i-103-cG.15043.1.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri:
							'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/28/0e/para-compartir.jpg',
						title: 'semana criollo',
						description: 'dasd'
					},
					{
						uri:
							'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/28/0e/para-compartir.jpg',
						title: 'semana criollo',
						description: 'dasd'
					},
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					}
				]}
				renderItem={data => (
					<TouchableOpacity>
						<View
							style={{
								height: '100%',
								paddingTop: 10,
								width: 120
								//width: '100%'
							}}>
							<Thumbnail
								style={{ width: '100%', height: 80, borderRadius: 10 }}
								square
								large
								source={{
									uri: data.uri
								}}
							/>
							<Text
								numberOfLines={1}
								style={{
									fontSize: 12,
									textAlign: 'center',
									width: '100%',
									height: 20
								}}
								note>
								{data.title}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
			{/* <FlatList
				style={{ padding: 5 }}
				ItemSeparatorComponent={() => <View style={{ width: 10 }}></View>}
				horizontal
				key='ofertsList'
				data={[
					{
						uri:
							'https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2018/01/30/0130_alimentos_saludable_1280.jpg',
						title: 'Semana saludable',
						description: 'dasd'
					},
					{
						uri: 'https://www.protocolo.org/extfiles/i-103-cG.15043.1.jpg',
						title: 'semana mixto',
						description: 'dasd'
					},
					{
						uri:
							'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/28/0e/para-compartir.jpg',
						title: 'semana criollo',
						description: 'dasd'
					},
					{ uri: 'dasdasd', title: 'dasdasd', description: 'dasd' },
					{ uri: 'dasdasd', title: 'dasdasd', description: 'dasd' }
				]}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item, index }) => (
					<CardComponent
						navigation={navigation}
						cardItems={{
							image: item.uri,
							text: item.title,
							name: item.description
						}}
					/>
				)}
			/> */}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	text: {
		color: '#fff',
		fontSize: 15,
		padding: 10,
		fontWeight: 'bold'
	}
});

export default Recomendaciones;
