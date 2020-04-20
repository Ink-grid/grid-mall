/** @format */

import { useEffect, useState } from 'react';

var urlconfig = 'http://192.168.1.9:4000/api/rest/';
/// funtion get data firestore
interface itemsFirestore {
	value: any;
	loading: boolean;
	error: any;
	isNull: boolean;
}

const usegetData = (url: string) => {
	const [config, setConfig] = useState<itemsFirestore>({
		value: null,
		loading: false,
		error: null,
		isNull: false
	});
	const [refresh, setRefresh] = useState(1);

	const setRefreshAction = (ramdon: number) => {
		setRefresh(ramdon);
	};

	const getDataAll = async (url: string) => {
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				if (data.status) {
					setConfig({
						value: data.data,
						loading: true,
						error: null,
						isNull: false
					});
				} else {
					setConfig({
						value: null,
						loading: true,
						error: data.message,
						isNull: false
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getDataAll(urlconfig + url);
	}, [refresh]);

	return [
		config.value,
		config.loading,
		config.error,
		config.isNull,
		setRefreshAction
	];
};

// const useGetDataDoc = (colec: any, doc: any): Array<itemsFirestore> => {
// 	const [config, setConfig] = useState<itemsFirestore>({
// 		value: null,
// 		loading: false,
// 		error: null,
// 		isNull: false
// 	});

// 	const [refresh, setRefresh] = useState(null);

// 	const getData = async () => {
// 		try {
// 			const response = await firestore
// 				.collection(colec)
// 				.doc(doc)
// 				.get();
// 			if (response.exists) {
// 				if (response.data()!.contacto) {
// 					setConfig({
// 						value: response.data(),
// 						loading: true,
// 						error: null,
// 						isNull: false
// 					});
// 				} else {
// 					setConfig({ value: null, loading: true, error: null, isNull: true });
// 				}
// 			}
// 		} catch (error) {
// 			console.log(error);
// 			setConfig({
// 				value: null,
// 				loading: true,
// 				error: 'ocurrio un error inesperado',
// 				isNull: false
// 			});
// 		}
// 	};

// 	useEffect(() => {
// 		getData();
// 	}, [refresh]);

// 	return [
// 		config.value,
// 		config.loading,
// 		config.error,
// 		config.isNull,
// 		setRefresh
// 	];
// };

// const useGetdataList = (colecction: string): Array<itemsFirestore> => {
// 	const [config, setConfig] = useState<itemsFirestore>({
// 		value: null,
// 		loading: false,
// 		error: null,
// 		isNull: false
// 	});

// 	const getData = async (coleccton: string) => {
// 		try {
// 			let queryResult = await firestore.collection(coleccton).get();

// 			if (queryResult) {
// 				const data: any = [];
// 				queryResult.forEach(ele => {
// 					data.push(ele.data());
// 				});
// 				setConfig(prevent => ({ ...prevent, value: data, loading: true }));
// 				console.log(data);

// 				return;
// 			}
// 			setConfig(prevent => ({ ...prevent, loading: true, isNull: true }));
// 		} catch (error) {
// 			console.log(error);
// 			setConfig(prevent => ({
// 				...prevent,
// 				loading: true,
// 				error: 'ocurrio un error inesperado en la consulta'
// 			}));
// 			//return false;
// 		}
// 	};

// 	useEffect(() => {
// 		getData(colecction);
// 	}, []);

// 	return [config.value, config.loading, config.error, config.isNull];
// };

export { usegetData };
