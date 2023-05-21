import { MyInfo, UpdateProfileRequest } from "@app/types";
import HttpService from "@core/services/http/http.service";
import { RequestContentType } from "@core/services/http/http.type";

class _AccountService {
  public getMyInfo() {
    return HttpService.get<MyInfo>("/accounts/profile");
  }

  public updateProfile(updateProfileRequest: UpdateProfileRequest) {
    return HttpService.patch<MyInfo>("/accounts", {
      body: { ...updateProfileRequest },
    });
  }

  public updateAvatar(file: File) {
    return HttpService.patch<MyInfo>("/accounts/profile", {
      requestContentType: RequestContentType.MULTIPART,
      body: {
        avt: file,
      },
    });
  }
}

const AccountService = new _AccountService();

export default AccountService;
