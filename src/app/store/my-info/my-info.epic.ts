import { combineEpics, ofType } from "redux-observable";
import {
  catchError,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from "rxjs";
import { AppAction } from "@core/types/redux.type";
import { MyInfoActionType, MyInfoEpicType } from "./my-info.type";
import AccountService from "@app/services/http/account.service";
import { storeMyInfo } from "./my-info.action";

export const fetchMyInfo = (extras: { destroy$: Subject<void> }): AppAction => {
  return {
    type: MyInfoEpicType.FETCH_MY_INFO,
    payload: { extras },
  };
};

const fetchAndStoreMyInfoEpic = (
  action$: Observable<AppAction>
): Observable<AppAction> => {
  return action$.pipe(
    ofType(MyInfoEpicType.FETCH_MY_INFO),
    switchMap((action: AppAction) =>
      AccountService.getMyInfo().pipe(
        map((response) => storeMyInfo(response)),
        catchError(() =>
          of({
            type: MyInfoActionType.FETCH_MY_INFO_FAILED,
          })
        ),
        takeUntil(action.payload?.extras.destroy$)
      )
    )
  );
};

const myInfoEpic = combineEpics(fetchAndStoreMyInfoEpic);

export default myInfoEpic;
