/** @format */

import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import PaperImage from '../PaperImage';
import { Spinner } from 'native-base';
import Error from '../Error';

export interface CategoryProps {
	navigation?: any;
	title?: boolean;
	flexContainer?: any;
}

interface categoryItems {
	title: string;
	uri: string;
	description: string;
}

const query = gql`
	{
		categories {
			_uid
			title
			description
			uri
		}
	}
`;

const Category: React.SFC<CategoryProps> = props => {
	const { navigation, flexContainer, title = true } = props;
	const { loading, error, data, refetch } = useQuery(query);
	const [newData, setNewData] = React.useState<Array<categoryItems>>([]);
	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch();
		//setRefreshAction(Math.random());
		setRefreshing(false);
	}, [refreshing]);

	React.useEffect(() => {
		if (!loading && !error) {
			setNewData(data.categories);
		}
	}, [data]);

	return (
		<View style={flexContainer ? flexContainer : styles.container}>
			{title && <Text style={styles.text}>Compra libre: </Text>}
			{error && <Error onPress={() => refetch()} title='categoria' />}
			{!loading && !error ? (
				<FlatList
					style={{ padding: 5 }}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					key='recomendation'
					ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
					data={newData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index }) => (
						<PaperImage
							onPress={() => navigation.jumpTo('Shoping', item)}
							uri={item && item.uri}
							vertical={true}
							title={item.title}
							description={item.description}
						/>
					)}
				/>
			) : (
				!error && <Spinner />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0,
		height: 380,
		paddingBottom: 10
	},
	text: {
		color: '#fff',
		fontSize: 15,
		padding: 10,
		fontWeight: 'bold'
	},
	error: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: '#fff'
	}
});

export default Category;
