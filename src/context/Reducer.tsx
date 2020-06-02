import { AsyncStorage } from "react-native";

/** @format */
enum types {
  SET_USER = "SET_USER",
  SIGN_IN = "SIGN_IN",
  RESTORE_TOKEN = "RESTORE_TOKEN",
  SIGN_OUT = "SIGN_OUT",
  SET_PRODUCTS = "SET_PRODUCTS",
  SET_RELOAD = "SET_RELOAD",
  SET_TOKEN_ACCESS = "SET_TOKEN_ACCESS",
}

type State = {
  user: any | null;
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  accessToken: string | null;
  produts: any;
  reload: any;
};

let initialState: any = {
  user: null,
  isLoading: true,
  isSignout: false,
  userToken: false,
  accessToken: null,
  produts: null,
  reload: false,
};

const reducer = (state: State, action: any) => {
  //console.log({ oldState: state, type: action.type, payload: action.payload });
  switch (action.type) {
    case types.SET_USER:
      //localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    case types.SIGN_IN:
      //localStorage.setItem('login', JSON.stringify(action.payload));
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };

    case types.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };

    case types.SET_TOKEN_ACCESS:
      return {
        ...state,
        accessToken: action.payload,
      };

    case types.SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
        accessToken: null,
      };

    case types.SET_RELOAD:
      return {
        ...state,
        reload: action.payload,
      };

    case types.SET_PRODUCTS:
      return {
        ...state,
        produts: action.payload,
      };
    default:
      throw new Error("Unexpected action");
  }
};
export { State, initialState, types, reducer };
