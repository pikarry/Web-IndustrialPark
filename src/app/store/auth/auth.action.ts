import { SignInResponse } from "@app/types";
import { AppAction } from "@core/types/redux.type";
import { AuthActionType } from "./auth.type";

export const storeUser = (user: SignInResponse): AppAction => {
  return {
    type: AuthActionType.STORE_AUTH,
    payload: { user },
  };
};

export const clearUser = (): AppAction => {
  return {
    type: AuthActionType.CLEAR_AUTH,
  };
};
