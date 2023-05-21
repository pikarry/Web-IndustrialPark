import { PathnameAdmin, Role } from "@app/constants";
import { MyInfo } from "@app/types";
import HttpService from "@core/services/http/http.service";
import { Environment } from "@environments/environment";
import { LoaderFunction, redirect } from "react-router-dom";

export const authorizationLoader: LoaderFunction = async ({ request }) => {
  const url = `${Environment.BASE_API}/accounts/profile`;

  const token = HttpService.getAccessToken();

  const response = await fetch(url, {
    signal: request.signal,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.ok) {
    const dataResponse: MyInfo = await response.json();

    if (!request.url.includes("/admin") && dataResponse.role === Role.ADMIN) {
      return redirect(PathnameAdmin.DASHBOARD);
    }
  }

  return null;
};
