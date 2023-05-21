export interface CardItem {
  image: string;
  title: string;
  description: string;
}

export interface BasePaginationReponse {
  page: number;
  total_page: number;
  per_page: number;
}

export interface MenuItem {
  linkTo: string;
  icon: string;
  iconSelected: string;
  label: string;
}
