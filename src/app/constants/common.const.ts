import { MenuItem } from "@app/types";
import { Images } from "@assets/images";

export const DEFAULT_PAGE = 1;

export const DEFAULT_DATE_FORMAT = "DD-MM-YYYY";
export const DATE_YEAR_FIRST_FORMAT = "YYYY-MM-DD";

export const DEFAULT_MINUTES_SECONDS_FORMAT = "mm:ss";

export const ACCESS_TOKEN_KEY = "access_token";

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Gender {
  MALE = "nam",
  FEMALE = "nu",
}

export enum StatusType {
  FREE,
  PENDING,
  BUSY,
}

export enum AcceptType {
  PENDING,
  ACCEPTED,
}

export const StatusName = {
  [StatusType.FREE]: "Chưa thuê",
  [StatusType.PENDING]: "Chờ duyệt",
  [StatusType.BUSY]: "Đã thuê",
};

export const AcceptName = {
  [AcceptType.PENDING]: "Chờ duyệt",
  [AcceptType.ACCEPTED]: "Đã thuê",
};

export enum InputAccept {
  IMAGE = "image/png, image/gif, image/jpeg",
}

export enum PathnameAdmin {
  DASHBOARD = "/admin/dashboard",
  INDUSTRIAL = "/admin/industrials",
  FACTORY = "/admin/factories",
  ACCOUNT = "/admin/accounts",
}

enum LabelAdmin {
  DASHBOARD = "Dashboard",
  INDUSTRIAL = "Industrial Areas",
  FACTORY = "Factories",
  ACCOUNT = "Accounts",
}

export const TitleAdmin = {
  [PathnameAdmin.DASHBOARD]: LabelAdmin.DASHBOARD,
  [PathnameAdmin.INDUSTRIAL]: LabelAdmin.INDUSTRIAL,
  [PathnameAdmin.FACTORY]: LabelAdmin.FACTORY,
  [PathnameAdmin.ACCOUNT]: LabelAdmin.ACCOUNT,
};

export const MenuAdmin: readonly MenuItem[] = [
  {
    linkTo: PathnameAdmin.DASHBOARD,
    icon: Images.DashboardIcon.default,
    iconSelected: Images.DashboardSelectedIcon.default,
    label: LabelAdmin.DASHBOARD,
  },
  {
    linkTo: PathnameAdmin.INDUSTRIAL,
    icon: Images.HouseIcon.default,
    iconSelected: Images.HouseSelectedIcon.default,
    label: LabelAdmin.INDUSTRIAL,
  },
  {
    linkTo: PathnameAdmin.FACTORY,
    icon: Images.BuildingIcon.default,
    iconSelected: Images.BuildingSelectedIcon.default,
    label: LabelAdmin.FACTORY,
  },
  {
    linkTo: PathnameAdmin.ACCOUNT,
    icon: Images.ProfileIcon.default,
    iconSelected: Images.ProfileSelectedIcon.default,
    label: LabelAdmin.ACCOUNT,
  },
];
