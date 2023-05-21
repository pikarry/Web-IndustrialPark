import HttpService from "@core/services/http/http.service";
import { SignInResponse, SignUpRequest } from "@app/types";

class _AuthService {
  public login(email: string, password: string) {
    return HttpService.post<SignInResponse>("/accounts/login", {
      body: {
        email,
        password,
      },
    });
  }

  public signUp(signUpRequest: SignUpRequest) {
    return HttpService.post<SignInResponse>("/accounts", {
      body: { ...signUpRequest },
    });
  }
}

const AuthService = new _AuthService();

export default AuthService;
