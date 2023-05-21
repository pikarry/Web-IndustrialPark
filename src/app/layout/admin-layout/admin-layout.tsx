import AccountModal from "@app/components/account-modal";
import MenuLinkItem from "@app/components/menu-link-item";
import {
  ACCESS_TOKEN_KEY,
  MenuAdmin,
  PathnameAdmin,
  TitleAdmin,
} from "@app/constants";
import { openPortalDialog } from "@app/services/modal.service";
import { GlobalState } from "@app/store";
import { clearUser } from "@app/store/auth/auth.action";
import { clearMyInfo } from "@app/store/my-info/my-info.action";
import { Images } from "@assets/images";
import StorageService from "@core/services/storage";
import clsx from "clsx";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function AdminLayout() {
  const [isShowActions, setIsShowActions] = useState(false);
  const [isShowFullMenu, setIsShowFullMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { myInfo } = useSelector(selectMyInfo);

  const closeAction = () => {
    setIsShowActions(false);
  };

  const handleAccountActionClick = () => {
    closeAction();
    const accountModalObs = openPortalDialog(AccountModal);

    accountModalObs.afterClosed().subscribe(() => {});
  };

  const logout = () => {
    closeAction();
    dispatch(clearMyInfo());
    dispatch(clearUser());
    StorageService.remove(ACCESS_TOKEN_KEY);
    navigate("/");
  };

  return (
    <>
      <div
        className={clsx("ml-[300px] pl-2", {
          "!ml-[71px]": !isShowFullMenu,
        })}
      >
        <div className="flex justify-between items-center h-20 bg-white sticky top-0 z-10">
          <div className="flex items-center">
            <div className="ml-4 mr-6">
              <img
                className="w-[33px] cursor-pointer"
                src={Images.MenuIcon.default}
                alt=""
                onClick={() => setIsShowFullMenu(!isShowFullMenu)}
              />
            </div>
            <div className="font-bold text-2xl text-[#3A4664]">
              {TitleAdmin[location.pathname as PathnameAdmin]}
            </div>
          </div>
          <div className="mr-6">
            {!!myInfo._id && (
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
            )}
          </div>
        </div>
        <Outlet />
      </div>
      <div
        className={clsx(
          "fixed top-0 left-0 h-screen w-[300px] bg-white z-10",
          "shadow-[2px_0_2px_0_rgb(209,209,209,25%)] transition-all",
          {
            "!w-[71px]": !isShowFullMenu,
          }
        )}
      >
        <div className="h-20 flex justify-center items-center">
          <img
            className={clsx({ hidden: !isShowFullMenu })}
            src={Images.Logo.default}
            alt=""
          />
        </div>
        {MenuAdmin.length &&
          MenuAdmin.map((item, index) => (
            <MenuLinkItem
              key={index}
              {...item}
              isShowFullMenu={isShowFullMenu}
            />
          ))}
      </div>
    </>
  );
}

const selectMyInfo = (state: GlobalState) => state.myInfo;

export default AdminLayout;
