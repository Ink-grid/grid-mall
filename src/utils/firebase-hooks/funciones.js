/** @format */

import { useState, useEffect } from 'react';
import { storage, database, firestore, FieldValue } from '../firebase';

async function forEach(array, callback, thisArg) {
	const promiseArray = [];
	for (let i = 0; i < array.length; i++) {
		if (i in array) {
			const p = Promise.resolve(array[i]).then(currentValue => {
				return callback.call(thisArg || this, currentValue, i, array);
			});
			promiseArray.push(p);
		}
	}
	await Promise.all(promiseArray);
}

// const map = async (array, callback, thisArg) => {
// 	const promiseArray = [];
// 	for (let i = 0; i < array.length; i++) {
// 		if (i in array) {
// 			promiseArray[i] = Promise.resolve(array[i]).then(currentValue => {
// 				return callback.call(thisArg || this, currentValue, i, array);
// 			});
// 		}
// 	}
// 	return Promise.all(promiseArray);
// };

const downloadURLFile = async path => {
	try {
		const urls = await storage
			.ref()
			.child(path)
			.getDownloadURL();
		return urls;
	} catch (error) {
		console.log(error);
	}
};

const deletArchivo = async path => {
	let isConfirm = window.confirm('¿!Estas seguro de realizar esta acción!?');
	if (isConfirm) {
		try {
			await storage
				.ref()
				.child(path)
				.delete();
			alert('se elimino con exito el archivo');
		} catch (error) {
			alert(error);
		}
	}
};

const setImg = async (element, path) => {
	try {
		await storage
			.ref()
			.child(path)
			.put(element);
		const url = await downloadURLFile(path);
		return url;
	} catch (error) {
		return error;
	}
};

const setFirebaseRealTime = async (data, path) => {
	try {
		await database.ref(path).push(data);
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const useGetListStorage = path => {
	const [data, setData] = useState({
		value: null,
		loading: false,
		error: null,
		reload: null
	});

	const reload = random => {
		setData(presv => ({ ...presv, reload: random }));
	};

	const getListStorage = async path => {
		try {
			let data = [];
			const listItens = await storage
				.ref()
				.child(path)
				.list({ maxResults: 30 });

			console.log(listItens);

			await forEach(listItens.items, async element => {
				data.push({
					name: element.name,
					path: element.location.path,
					url: await downloadURLFile(element.location.path)
				});
			});

			setData({
				value: data.length === 0 ? 'Aún no hay archivos aquí' : data,
				loading: true,
				error: null
			});
		} catch (error) {
			setData(prevs => ({ ...prevs, loading: true, error: error }));
		}
	};
	useEffect(() => {
		getListStorage(path);
	}, [data.reload]);

	return [data.value, data.loading, data.error, reload];
};

const useGetLisDatabase = path => {
	const [dataList, setDataList] = useState({
		value: null,
		loading: false,
		error: null,
		reload: null
	});

	const reload = random => {
		setDataList(presv => ({ ...presv, reload: random }));
	};

	const getData = async path => {
		try {
			const response = await database.ref(path).once('value');

			const responseData = await response.val();
			setDataList({
				value: Object.values(responseData),
				loading: true,
				error: null
			});
		} catch (error) {
			console.log(error);
			setDataList({ value: null, loading: true, error: error });
		}
	};

	useEffect(() => {
		getData(path);
	}, [dataList.reload, path]);

	return [dataList.value, dataList.loading, dataList.error, reload];
};

const useGetElementBySku = (path, orderby, iqualto) => {
	const [elementbyid, setElementbyid] = useState({
		value: null,
		loading: false,
		error: null
	});

	const getElementabyId = async (path, orderby, iqualto) => {
		try {
			const response = await database
				.ref(path)
				.orderByChild(orderby)
				.equalTo(iqualto.toUpperCase())
				.once('value');
			const datareponse = await response.val();
			setElementbyid({
				value: Object.values(datareponse),
				loading: true,
				error: null
			});
		} catch (error) {
			setElementbyid({ value: null, loading: true, error: error });
		}
	};

	useEffect(() => {
		getElementabyId(path, orderby, iqualto);
	}, []);

	return [elementbyid.value, elementbyid.loading, elementbyid.error];
};

const addDatafirestore = async (path, data) => {
	try {
		const refId = await firestore.collection(path).add(data);
		await firestore
			.collection(path)
			.doc(refId.id)
			.update({ uid: refId.id });
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const verificarConsulta = async (colec, doc) => {
	try {
		const isExiscdata = await firestore
			.collection(colec)
			.doc(doc)
			.get();
		if (isExiscdata.exists) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

const getDataDoc = async (colec, doc) => {
	try {
		const response = await firestore
			.collection(colec)
			.doc(doc)
			.get();
		if (response.exists) {
			return response.data();
		} else {
			return false;
		}
	} catch (error) {
		console.log(error);
	}
};

const useGetDataDoc = (colec, doc) => {
	const [config, setConfig] = useState({
		value: null,
		loading: false,
		error: null,
		isNull: false
	});

	const [refresh, setRefresh] = useState(null);

	const getData = async () => {
		try {
			const response = await firestore
				.collection(colec)
				.doc(doc)
				.get();
			if (response.exists) {
				if (response.data().contacto) {
					setConfig({
						value: response.data(),
						loading: true,
						error: null,
						isNull: false
					});
				} else {
					setConfig({ value: null, loading: true, error: null, isNull: true });
				}
			}
		} catch (error) {
			console.log(error);
			setConfig({
				value: null,
				loading: true,
				error: 'ocurrio un error inesperado',
				isNull: false
			});
		}
	};

	useEffect(() => {
		getData();
	}, [refresh]);

	return [
		config.value,
		config.loading,
		config.error,
		config.isNull,
		setRefresh
	];
};

const setDataFirestore = async (colection, doc, data) => {
	try {
		await firestore
			.collection(colection)
			.doc(doc)
			.set(data, { merge: true });
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const setIncrenetNumber = async (colection, doc, data) => {
	try {
		await firestore
			.collection(colection)
			.doc(doc)
			.update(data, FieldValue.increment(1));
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const deleteletDataFirestore = async (colection, doc, uid) => {
	try {
		await firestore
			.collection(colection)
			.doc(doc)
			.update({
				[uid]: FieldValue.delete()
			});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};

const useGetDatafireStoreuid = (colection, doc) => {
	const [configUid, setConfigUid] = useState({
		value: null,
		loading: false,
		error: null,
		isNull: false
	});

	const getData = async (colection, doc) => {
		try {
			const response = await firestore
				.collection(colection)
				.doc(doc)
				.get();
			if (response) {
				setConfigUid({
					value: response.data(),
					loading: true,
					error: null,
					isNull: false
				});
			} else {
				setConfigUid({ value: null, loading: true, error: null, isNull: true });
			}
		} catch (error) {
			console.log(error);
			setConfigUid({
				value: null,
				loading: true,
				error: 'ocurrio un erro inesperado',
				isNull: false
			});
		}
	};

	useEffect(() => {
		getData(colection, doc);
	}, []);

	return [
		configUid.value,
		configUid.loading,
		configUid.error,
		configUid.isNull
	];
};

const useGetDataFirestore = query => {
	if (typeof query !== 'object') {
		throw new Error('is necesarie type of value a funtion');
	}

	const [config, setConfig] = useState({
		value: null,
		loading: false,
		error: null,
		isNull: false,
		refresh: null
	});

	// const setRefresh = () => {
	// 	setConfig({
	// 		value: null,
	// 		loading: false,
	// 		error: null,
	// 		isNull: false,
	// 		refresh: null
	// 	});
	// };

	const getData = async query => {
		try {
			let queryResult = await query;

			if (queryResult) {
				const data = [];
				queryResult.forEach(ele => {
					data.push(ele.data());
				});
				setConfig(prevent => ({ ...prevent, value: data, loading: true }));
				console.log(data);

				return;
			}
			setConfig(prevent => ({ ...prevent, loading: true, isNull: true }));
		} catch (error) {
			console.log(error);
			setConfig(prevent => ({
				...prevent,
				loading: true,
				error: 'ocurrio un error inesperado en la consulta'
			}));
			//return false;
		}
	};

	useEffect(() => {
		getData(query);
	}, [config.refresh]);

	return [config.value, config.loading, config.error, config.isNull];
};

function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
	try {
		decimalCount = Math.abs(decimalCount);
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

		const negativeSign = amount < 0 ? '-' : '';

		let i = parseInt(
			(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
		).toString();
		let j = i.length > 3 ? i.length % 3 : 0;

		return (
			negativeSign +
			(j ? i.substr(0, j) + thousands : '') +
			i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
			(decimalCount
				? decimal +
				  Math.abs(amount - i)
						.toFixed(decimalCount)
						.slice(2)
				: '')
		);
	} catch (e) {
		console.log(e);
	}
}

export {
	formatMoney,
	useGetListStorage,
	forEach,
	addDatafirestore,
	deletArchivo,
	setIncrenetNumber,
	deleteletDataFirestore,
	useGetDataDoc,
	setImg,
	getDataDoc,
	verificarConsulta,
	setDataFirestore,
	useGetLisDatabase,
	setFirebaseRealTime,
	useGetElementBySku,
	useGetDatafireStoreuid,
	useGetDataFirestore
};
