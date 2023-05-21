import { StatusType } from "@app/constants";
import { BasePaginationReponse } from "./common.type";
import { PaginationOption } from "@core/services/http/http.type";

export interface Factory {
  _id: string;
  name: string;
  image: string;
  acreage: number;
  status: StatusType;
  price: number;
  idIndustrial: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetFactoriesQuery extends PaginationOption {
  search?: string;
}

export interface FactoryResponse extends BasePaginationReponse {
  factories: Factory[];
}
