import { AcceptType, StatusType } from "@app/constants";
import { BasePaginationReponse } from "./common.type";
import { Industrial } from "./industrial.type";
import { PaginationOption } from "@core/services/http/http.type";

export interface CreateContractRequest {
  idFactory: string;
  startDate: string;
  endDate: string;
}

export interface CreateContractResponse {
  _id: string;
  idUser: string;
  idFactory: string;
  startDate: string;
  endDate: string;
  deposit: number;
  isAccepted: number;
  isFinieshed: number;
  createdAt: string;
  updatedAt: string;
}

export interface Factory {
  _id: string;
  name: string;
  image: string;
  acreage: number;
  status: StatusType;
  price: number;
  idIndustrial: Industrial;
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  _id: string;
  idUser: string;
  idFactory: Factory;
  startDate: string;
  endDate: string;
  deposit: number;
  isAccepted: AcceptType;
  isFinieshed: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetContractQuery extends PaginationOption {
  is_accepted?: number;
  id_industrial?: string;
}

export interface GetContractResponse extends BasePaginationReponse {
  contractes: Contract[];
}
