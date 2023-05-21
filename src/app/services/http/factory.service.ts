import { FactoryResponse, GetFactoriesQuery } from "@app/types";
import HttpService from "@core/services/http/http.service";

class _FactoryService {
  getFactories(industrialId: number | string, optons?: GetFactoriesQuery) {
    return HttpService.get<FactoryResponse>(
      `/factories/industrial/${industrialId}`,
      {
        queryParams: { ...optons },
      }
    );
  }
}

const FactoryService = new _FactoryService();

export default FactoryService;
