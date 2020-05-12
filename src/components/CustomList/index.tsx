/** @format */

import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { View, Text, Spinner, Button } from 'native-base';
import { StyleSheet } from 'react-native';
// import CustomButtons from '../CustomButton';
// import styles from '../../styles';
// import { CircularProgress } from '@material-ui/core';

// const query = gql`
// 	query($category: String!, $limit: Int!, $after: String) {
// 		products(category: $category, limit: $limit, after: $after) {
// 			sku
// 			name
// 			description
// 			quantity
// 			price
// 			uri
// 			unidad_media
// 			observers
// 		}
// 	}
// `;
// const [createClient] = useMutation(CREATE_USER);

// const CREATE_USER = gql`
// 	mutation CreateClient(
// 		$_uid: String!
// 		$razon_social: String!
// 		$phone: String!
// 		$email: String!
// 		$password: String!
// 		$quantity_family: Int!
// 	) {
// 		createClient(
// 			input: {
// 				_uid: $_uid
// 				razon_social: $razon_social
// 				phone: $phone
// 				email: $email
// 				password: $password
// 				quantity_family: $quantity_family
// 			}
// 		) {
// 			_uid
// 		}
// 	}
// // `;

// const { loading, error, data, fetchMore, refetch } = useQuery(query, {
//     variables: {
//         category: category,
//         limit: 50,
//         after: null
//     }
//     //pollInterval: 1000
// });

// const dafault = gql`
// 	mutation () {

// 	}
// `;

export interface CustomListProps {
	query: any;
	renderIten: (
		data: any,
		deletedItems?: (value: any) => Promise<void>
	) => React.ReactChild;
	resolve: string;
	isError?: (state: boolean, reload?: (value?: any) => Promise<any>) => void;
	resolveDeleted?: string;
	deletedAction?: (value: any) => Promise<any>;
	variables?: any;
}

const CustomList: React.SFC<CustomListProps> = props => {
	//const classes = styles();
	const {
		query,
		renderIten,
		variables,
		resolve,
		deletedAction,
		resolveDeleted,
		isError
	} = props;
	const { loading, error, data, refetch } = useQuery(query, {
		variables: variables
	});

	// [*] deleted items  async by uid
	const deletedItems = async (value: any) => {
		try {
			//const [startMutation] = useMutation(deletedquery);
			let response = await deletedAction!(value);
			console.log(response);
			if (resolveDeleted) {
				if (response.data[resolveDeleted]) {
					isError!(true, refetch);
				} else {
					isError!(false);
				}
			}
		} catch (error) {
			console.log(error);
			isError!(true);
		}
	};

	if (error) {
		return (
			<View style={{ height: '380px' }}>
				<View>
					<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
						Ocorrio un error inesperado, por favor verifique su conexión a
						internet
					</Text>
					<View style={styles.center}>
						<Button style={{ width: '50%' }} onPress={() => refetch()}>
							Volver a intentar
						</Button>
					</View>
				</View>
			</View>
		);
	}

	if (loading && !error) {
		return (
			<View style={{ flex: 1, marginTop: 30 }}>
				<Spinner />
			</View>
		);
	}

	if (data && data[resolve].length === 0) {
		return (
			<View style={{ marginTop: 30 }}>
				<Text style={{ textAlign: 'center', width: '100%' }} note>
					No se econtro ningún resultado para esta consulta.
				</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, padding: 10 }}>
			{renderIten(data[resolve], deletedItems)}
		</View>
	);
};

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
});

export default CustomList;
