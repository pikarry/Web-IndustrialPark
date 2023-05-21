import { ACCESS_TOKEN_KEY } from "@app/constants";
import { openPortalDialog } from "@app/services/modal.service";
import { GlobalState } from "@app/store";
import { clearUser } from "@app/store/auth/auth.action";
import { clearMyInfo } from "@app/store/my-info/my-info.action";
import { Images } from "@assets/images";
import StorageService from "@core/services/storage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AccountModal from "../account-modal";
import Button from "../button";

function Header() {
  const [isShowActions, setIsShowActions] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myInfo } = useSelector(selectMyInfo);

  const closeAction = () => {
    setIsShowActions(false);
  };

  const logout = () => {
    closeAction();
    dispatch(clearMyInfo());
    dispatch(clearUser());
    StorageService.remove(ACCESS_TOKEN_KEY);
    navigate("/");
  };

  const handleAccountActionClick = () => {
    closeAction();
    const accountModalObs = openPortalDialog(AccountModal);

    accountModalObs.afterClosed().subscribe(() => {});
  };

  return (
    <div className="flex justify-between h-20 bg-white items-center sticky top-0 z-10">
      <div className="h-full">
        <img
          className="w-[129px] h-full ml-20 cursor-pointer"
          src={Images.Logo.default}
          alt=""
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex mr-6 h-full">
        <div className="flex mr-10">
          <NavLink
            to="/"
            className={({ isActive }) => {
              let className =
                "h-full flex items-center px-6 font-bold text-2xl text-[#3A4664] ";

              if (isActive) {
                className +=
                  "bg-[#F2F8FF] border-b-[5px] border-solid border-[#1E86E5] pt-[5px]";
              }

              return className;
            }}
            onClick={() => {
              closeAction();
            }}
          >
            TRANG CHỦ
          </NavLink>
          <NavLink
            to="/industrials"
            className={({ isActive }) => {
              let className =
                "h-full flex items-center px-6 font-bold text-2xl text-[#3A4664] ";

              if (isActive) {
                className +=
                  "bg-[#F2F8FF] border-b-[5px] border-solid border-[#1E86E5] pt-[5px]";
              }

              return className;
            }}
            onClick={() => {
              closeAction();
            }}
          >
            KHU CÔNG NGHIỆP
          </NavLink>
          {myInfo._id && (
            <NavLink
              to="/my-factories"
              className={({ isActive }) => {
                let className =
                  "h-full flex items-center px-6 font-bold text-2xl text-[#3A4664] ";

                if (isActive) {
                  className +=
                    "bg-[#F2F8FF] border-b-[5px] border-solid border-[#1E86E5] pt-[5px]";
                }

                return className;
              }}
              onClick={() => {
                closeAction();
              }}
            >
              XƯỞNG CỦA BẠN
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className={({ isActive }) => {
              let className =
                "h-full flex items-center px-6 font-bold text-2xl text-[#3A4664] ";

              if (isActive) {
                className +=
                  "bg-[#F2F8FF] border-b-[5px] border-solid border-[#1E86E5] pt-[5px]";
              }

              return className;
            }}
            onClick={() => {
              closeAction();
            }}
          >
            LIÊN HỆ
          </NavLink>
        </div>
        <div className="flex items-center">
          {myInfo._id ? (
            <div className="relative">
              {myInfo.avt ? (
                <img
                  className="w-[45px] h-[45px] rounded-full cursor-pointer"
                  src={myInfo.avt}
                  alt=""
                  onClick={() => setIsShowActions(!isShowActions)}
                />
              ) : (
                <img
                  className="w-[45px] h-[45px] rounded-full cursor-pointer"
                  src={Images.User.default}
                  alt=""
                  onClick={() => setIsShowActions(!isShowActions)}
                />
              )}
              {isShowActions && (
                <div className="absolute top-14 right-0 w-[119px] bg-white text-sm shadow-[0_4px_18px_0_rgb(0,0,0,15%)] rounded-[3px]">
                  <div
                    className="p-1 cursor-pointer hover:bg-[#1E86E5] hover:text-white rounded-t-[3px] text-[#3A4664]"
                    onClick={handleAccountActionClick}
                  >
                    Tài khoản
                  </div>
                  <div
                    className="p-1 cursor-pointer hover:bg-[#1E86E5] hover:text-white rounded-b-[3px] text-[#3A4664]"
                    onClick={logout}
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              label="ĐĂNG NHẬP"
              width="auto"
              className="px-[10px] !rounded-lg font-bold"
              onClick={() => navigate("/sign-in")}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const selectMyInfo = (state: GlobalState) => state.myInfo;

export default Header;
