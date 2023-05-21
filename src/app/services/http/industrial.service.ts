import {
  GetIndustrialsQuery,
  Industrial,
  IndustrialResponse,
} from "@app/types";
import HttpService from "@core/services/http/http.service";

class _IndustrialService {
  getIndustrials(optons?: GetIndustrialsQuery) {
    return HttpService.get<IndustrialResponse>("/industrials", {
      queryParams: { ...optons },
    });
  }

  getAllIndustrials() {
    return HttpService.get<Industrial[]>("/industrials/get-all");
  }

  getDetail(industrialId: string) {
    return HttpService.get<Industrial>(`/industrials/${industrialId}`);
  }
}

const IndustrialService = new _IndustrialService();

export default IndustrialService;
