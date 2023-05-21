import { LoaderFunction, redirect } from "react-router-dom";
import HttpService from "@core/services/http/http.service";
import { Environment } from "@environments/environment";
import { MyInfo } from "@app/types";
import { PathnameAdmin, Role } from "@app/constants";

export const authenticationLoader: LoaderFunction = async ({ request }) => {
  const url = `${Environment.BASE_API}/accounts/profile`;

  const token = HttpService.getAccessToken();

  const response = await fetch(url, {
    signal: request.signal,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.ok) {
    if (
      ["/sign-in", "/sign-up"]
        .map((path) => request.url.includes(path))
        .some(Boolean)
    ) {
      return redirect("/");
    }

    const dataResponse: MyInfo = await response.json();

    if (request.url.includes("/admin") && dataResponse.role !== Role.ADMIN) {
      return redirect("/");
    } else if (
      request.url.includes("/my-factories") &&
      dataResponse.role !== Role.USER
    ) {
      return redirect(PathnameAdmin.DASHBOARD);
    }
  } else {
    if (
      !["/sign-in", "/sign-up"]
        .map((path) => request.url.includes(path))
        .some(Boolean)
    ) {
      return redirect("/");
    }
  }

  return null;
};
