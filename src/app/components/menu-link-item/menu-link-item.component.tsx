import { MenuItem } from "@app/types";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

interface MenuItemProps extends MenuItem {
  isShowFullMenu: boolean;
}

function MenuLinkItem({
  linkTo,
  label,
  icon,
  iconSelected,
  isShowFullMenu,
}: MenuItemProps) {
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) => {
        let className =
          "p-[21px] h-[65px] flex items-center [&_.icon-selected]:hidden ";

        if (isActive) {
          className +=
            "bg-[#F2F8FF] border-l-[5px] border-solid border-[#1E86E5] !pl-[16px] ";
          className += "[&_.icon-unselected]:hidden [&_.icon-selected]:!block ";
        }

        if (!isShowFullMenu) {
          className += "!p-[10px] ";

          if (!isActive) {
            className += "!pl-[21px]";
          }
        }

        return className;
      }}
    >
      <div className="mr-[15px]">
        <img className="icon-unselected" src={icon} alt="" />
        <img className="icon-selected" src={iconSelected} alt="" />
      </div>
      <div
        className={clsx("font-bold text-lg text-[#3A4664]", {
          hidden: !isShowFullMenu,
        })}
      >
        {label}
      </div>
    </NavLink>
  );
}

export default MenuLinkItem;
