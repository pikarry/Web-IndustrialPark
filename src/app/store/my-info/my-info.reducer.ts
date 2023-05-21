import { Gender, Role } from "@app/constants";
import { AppAction } from "@core/types/redux.type";
import { MyInfoActionType, MyInfoEpicType, MyInfoState } from "./my-info.type";

export default function myInfoReducer(
  state = initialState,
  action: AppAction
): MyInfoState {
  switch (action.type) {
    case MyInfoEpicType.FETCH_MY_INFO:
      return {
        ...state,
        isMyInfoLoading: true,
        isMyInfoError: false,
      };
    case MyInfoActionType.STORE_MY_INFO:
      return {
        ...state,
        myInfo: {
          _id: action.payload?.myInfo?._id,
          email: action.payload?.myInfo?.email,
          phone: action.payload?.myInfo?.phone,
          address: action.payload?.myInfo?.address,
          fullname: action.payload?.myInfo?.fullname,
          gender: action.payload?.myInfo?.gender,
          avt: action.payload?.myInfo?.avt,
          role: action.payload?.myInfo?.role,
          createdAt: action.payload?.myInfo?.createdAt,
          updatedAt: action.payload?.myInfo?.updatedAt,
        },
        isMyInfoLoading: false,
        isMyInfoError: false,
      };
    case MyInfoActionType.CLEAR_MY_INFO:
      return {
        ...initialState,
        isMyInfoLoading: false,
      };
    case MyInfoActionType.FETCH_MY_INFO_FAILED:
      return {
        ...state,
        isMyInfoLoading: false,
        isMyInfoError: true,
      };
    default:
      return state;
  }
}

const initialState: MyInfoState = {
  myInfo: {
    _id: "",
    email: "",
    phone: "",
    address: "",
    fullname: "",
    gender: Gender.MALE,
    avt: "",
    role: Role.USER,
    createdAt: "",
    updatedAt: "",
  },
  isMyInfoLoading: true,
  isMyInfoError: false,
};
