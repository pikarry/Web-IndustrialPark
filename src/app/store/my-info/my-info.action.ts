import { MyInfo } from "@app/types";
import { AppAction } from "@core/types/redux.type";
import { MyInfoActionType } from "./my-info.type";

export const storeMyInfo = (myInfo: MyInfo): AppAction => {
  return {
    type: MyInfoActionType.STORE_MY_INFO,
    payload: { myInfo },
  };
};

export const clearMyInfo = (): AppAction => {
  return {
    type: MyInfoActionType.CLEAR_MY_INFO,
  };
};
