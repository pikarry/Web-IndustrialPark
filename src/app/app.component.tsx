import { RouterProvider } from "react-router-dom";
import ModalContainer from "./components/modal/modal-container";
import ToastContainer from "./components/toast/toast.container";
import router from "./router";
import "./styles/app.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import useObservable from "@core/hooks/use-observable.hook";
import AccountService from "./services/http/account.service";
import { catchError, throwError } from "rxjs";
import { useDispatch } from "react-redux";
import { clearUser } from "./store/auth/auth.action";
import { clearMyInfo, storeMyInfo } from "./store/my-info/my-info.action";
import Loading from "@core/components/loading";

function App() {
  const dispatch = useDispatch();

  const { subscribeUntilDestroy } = useObservable();

  useEffect(() => {
    subscribeUntilDestroy(
      AccountService.getMyInfo().pipe(
        catchError((err) => {
          dispatch(clearUser());
          dispatch(clearMyInfo());

          return throwError(() => err);
        })
      ),
      (data) => {
        dispatch(storeMyInfo(data));
      }
    );
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RouterProvider router={router} />
        <div id="toast-root">
          <ToastContainer />
        </div>
        <div id="modal-root">
          <ModalContainer />
        </div>
        <div id="loading-root">
          <Loading />
        </div>
      </LocalizationProvider>
    </>
  );
}

export default App;
