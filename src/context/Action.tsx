/** @format */

import { types } from './Reducer';

export const useActions = (state: any, dispatch: any) => {
	const setUser = (users: any) => {
		dispatch({ type: types.SET_USER, payload: users });
	};

	const resToreToken = (token: string | null) => {
		dispatch({ type: types.RESTORE_TOKEN, payload: token });
	};

	const signIn = (token: string | null) => {
		dispatch({ type: types.SIGN_IN, payload: token });
	};

	const setProducts = (products: any) => {
		dispatch({ type: types.SET_PRODUCTS, payload: products });
	};

	const signOut = () => {
		dispatch({ type: types.SIGN_OUT });
	};

	return {
		setUser,
		resToreToken,
		signOut,
		signIn,
		setProducts
	};
};
