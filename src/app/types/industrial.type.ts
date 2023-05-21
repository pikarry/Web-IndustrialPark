import { PaginationOption } from "@core/services/http/http.type";
import { BasePaginationReponse } from "./common.type";

export interface Industrial {
  _id: string;
  name: string;
  image: string;
  address: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetIndustrialsQuery extends PaginationOption {
  search?: string;
}

export interface IndustrialResponse extends BasePaginationReponse {
  industrials: Industrial[];
}
