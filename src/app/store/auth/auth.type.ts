export interface AuthState {
  _id: string;
  email: string;
  role: string;
  jwt: string;
}

export enum AuthActionType {
  STORE_AUTH = "auth/storeAuth",
  CLEAR_AUTH = "auth/clearAuth",
}
