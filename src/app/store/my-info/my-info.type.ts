import { MyInfo } from "@app/types";

export interface MyInfoState {
  myInfo: MyInfo;
  isMyInfoLoading: boolean;
  isMyInfoError: boolean;
}

export enum MyInfoActionType {
  STORE_MY_INFO = "myInfo/storeMyInfo",
  CLEAR_MY_INFO = "myInfo/clearMyInfo",
  FETCH_MY_INFO_FAILED = "myInfo/fetchMyInfoFailed",
}

export enum MyInfoEpicType {
  FETCH_MY_INFO = "myInfo/fetchMyInfo",
}
