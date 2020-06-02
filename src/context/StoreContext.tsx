/** @format */

import React, { createContext, useReducer, useEffect } from "react";
import { reducer, State, initialState, types } from "./Reducer";
import { useActions } from "./Action";
import { AsyncStorage } from "react-native";
// import useDidUpdate from '../components/useDidUpdate';

interface IContextProps {
  state: State;
  actions: any;
}

const StoreContext = createContext({} as IContextProps);

interface StoreProviderProps {
  children: any;
}

const StoreProvider: React.SFC<StoreProviderProps> = (props) => {
  const { children } = props;
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = useReducer(reducer, initialState);
  // Create an object of all our actions, handling special cases where a simple dispatch is too primitive
  const actions = useActions(state, dispatch);

  const value = { state, dispatch, actions };
  // Fetch the token from storage then navigate to our appropriate place
  const getTokenAsync = async () => {
    let userToken: string | null;
    let userProfile: any | null;
    let accessToken: string | null = null;
    try {
      userToken = await AsyncStorage.getItem("userToken");
      accessToken = await AsyncStorage.getItem("accessToken");
      //console.log("token", accessToken);
      userProfile = await AsyncStorage.getItem("user");
    } catch (error) {
      console.log(error);
    }
    actions.setUser(JSON.parse(userProfile));
    actions.resToreToken(userToken!);
    if (accessToken) actions.setAccessToken(JSON.parse(accessToken));
  };
  // Log new state
  useEffect(() => {
    getTokenAsync();
    // getPedidoInitial();
    console.log({ newState: state });
  }, []);

  // Render state, dispatch and special case actions
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
