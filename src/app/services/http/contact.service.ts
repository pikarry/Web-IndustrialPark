import {
  CreateContractRequest,
  CreateContractResponse,
  GetContractQuery,
  GetContractResponse,
} from "@app/types/contract.type";
import HttpService from "@core/services/http/http.service";

class _ContractService {
  public createContract(createContractRequest: CreateContractRequest) {
    return HttpService.post<CreateContractResponse>("/contracts", {
      body: { ...createContractRequest },
    });
  }

  public getContracts(getContractQuery?: GetContractQuery) {
    return HttpService.get<GetContractResponse>("/contracts", {
      queryParams: { ...getContractQuery },
    });
  }
}

const ContractService = new _ContractService();

export default ContractService;
