import { Gender, InputAccept } from "@app/constants";
import {
  openPortalDialog,
  PortalDialogProps,
} from "@app/services/modal.service";
import { Images } from "@assets/images";
import { ChangeEvent, createRef, useEffect, useState } from "react";
import Button from "../button";
import Input from "../input";
import Modal from "../modal/modal.component";
import ResetPasswordModal from "../reset-password-modal";
import TextArea from "../textarea";
import { Form, Formik, FormikContextType } from "formik";
import { convertFileToBase64 } from "@app/utils/util";
import { GlobalState } from "@app/store";
import { useDispatch, useSelector } from "react-redux";
import { addToast } from "../toast/toast.service";
import { FormControl } from "../form-control";
import { UpdateProfileInitialValues, UpdateProfileRequest } from "@app/types";
import useObservable from "@core/hooks/use-observable.hook";
import AccountService from "@app/services/http/account.service";
import useForceUpdate from "@core/hooks/use-force-update.hook";
import { switchMap } from "rxjs";
import { storeMyInfo } from "@app/store/my-info/my-info.action";

function AccountModal({ portalDialogRef }: PortalDialogProps) {
  const inputFileRef = createRef<HTMLInputElement>();
  const formRef = createRef<FormikContextType<UpdateProfileInitialValues>>();

  const dispatch = useDispatch();
  const { subscribeOnce } = useObservable();
  const { myInfo } = useSelector(selectMyInfo);
  const [update, forceUpdate] = useForceUpdate();

  const [avatar, setAvatar] = useState("");
  const [gender, setGender] = useState(Gender.MALE);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (myInfo._id && formRef.current) {
      setAvatar(myInfo.avt);
      setGender(myInfo.gender);
      formRef.current.setFieldValue("fullname", myInfo.fullname);
      formRef.current.setFieldValue("phone", myInfo.phone);
      formRef.current.setFieldValue("address", myInfo.address);
    }
  }, [myInfo._id, update]);

  const handleResetPasswordClick = () => {
    const resetPasswordModalObs = openPortalDialog(ResetPasswordModal);

    resetPasswordModalObs.afterClosed().subscribe(() => {});
  };

  const handleChangeAvatar = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const onInputFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event.target.files;

      if (files?.length) {
        const base64 = await convertFileToBase64(files[0]);

        setFile(files[0]);
        setAvatar(base64 as string);
      }
    } catch (_) {
      addToast({ text: "Cannot display image", status: "inValid" });
    }
  };

  const handleSubmit = (values: UpdateProfileInitialValues) => {
    const updateProfileRequest: UpdateProfileRequest = {
      fullname: values.fullname,
      phone: values.phone,
      gender,
      address: values.address,
    };

    if (file) {
      subscribeOnce(
        AccountService.updateAvatar(file).pipe(
          switchMap(() => AccountService.updateProfile(updateProfileRequest))
        ),
        (updateProfileRes) => {
          dispatch(storeMyInfo(updateProfileRes));
          addToast({ text: "Update successfully" });
          setFile(null);
          forceUpdate();
        }
      );
    } else {
      subscribeOnce(
        AccountService.updateProfile(updateProfileRequest),
        (updateProfileRes) => {
          dispatch(storeMyInfo(updateProfileRes));
          addToast({ text: "Update successfully" });
          forceUpdate();
        }
      );
    }
  };

  return (
    <Modal onCancel={portalDialogRef.close} buttonCancelInChildren>
      <div className="w-[700px] pt-[22px] px-6 pb-8">
        <div className="font-bold text-2xl text-[#3A4664]">
          Chỉnh sửa thông tin tài khoản
        </div>
        <Formik
          innerRef={formRef}
          initialValues={{ fullname: "", phone: "", address: "" }}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="flex mt-8 px-3">
              <div className="flex-1">
                <div className="w-[155px] relative">
                  {!avatar ? (
                    <img
                      className="w-[155px] rounded-lg"
                      src={Images.Avatar.default}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-[155px] h-[155px] rounded-lg"
                      src={avatar}
                      alt=""
                    />
                  )}
                  <div
                    className="absolute -top-2 -right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-slate-100"
                    onClick={handleChangeAvatar}
                  >
                    <img src={Images.AddPhoto.default} alt="" />
                  </div>
                  <input
                    ref={inputFileRef}
                    accept={InputAccept.IMAGE}
                    type="file"
                    name=""
                    className="hidden"
                    onChange={onInputFileChange}
                  />
                </div>
                <Button
                  containerClassName="mt-9"
                  label="RESET PASSWORD"
                  theme="secondary"
                  width="fit-content"
                  className="px-2"
                  labelClassName="font-bold"
                  onClick={handleResetPasswordClick}
                />
              </div>
              <div className="flex-[2]">
                <div>
                  <label className="font-bold text-[#3A4664]">Email</label>
                </div>
                <div>
                  <Input
                    className="!max-w-full mt-2"
                    inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
                    errorClassName="mt-[3px] text-xs leading-[14.06px]"
                    value={myInfo.email}
                    disabled
                  />
                </div>
                <div className="mt-4">
                  <label className="font-bold text-[#3A4664]">Họ tên</label>
                </div>
                <div>
                  <FormControl name="fullname">
                    <Input
                      className="!max-w-full mt-2"
                      inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
                      errorClassName="mt-[3px] text-xs leading-[14.06px]"
                    />
                  </FormControl>
                </div>
                <div className="flex mt-4 gap-8">
                  <div className="flex-1">
                    <div>
                      <label className="font-bold text-[#3A4664]">
                        Số điện thoại
                      </label>
                    </div>
                    <div>
                      <FormControl name="phone">
                        <Input
                          className="!max-w-full mt-2"
                          inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div>
                      <label className="font-bold text-[#3A4664]">
                        Giới tính
                      </label>
                    </div>
                    <div className="flex items-center mt-2 h-10">
                      <div className="flex-1 flex gap-1">
                        <span
                          className="cursor-pointer"
                          onClick={() => setGender(Gender.MALE)}
                        >
                          <img
                            src={
                              gender === Gender.MALE
                                ? Images.SelectedIcon.default
                                : Images.UnselectedIcon.default
                            }
                            alt=""
                          />
                        </span>
                        <span>Nam</span>
                      </div>
                      <div className="flex-1 flex gap-1">
                        <span
                          className="cursor-pointer"
                          onClick={() => setGender(Gender.FEMALE)}
                        >
                          <img
                            src={
                              gender === Gender.FEMALE
                                ? Images.SelectedIcon.default
                                : Images.UnselectedIcon.default
                            }
                            alt=""
                          />
                        </span>
                        <span>Nữ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-[#3A4664]">Địa chỉ</label>
                </div>
                <div>
                  <FormControl name="address">
                    <TextArea
                      className="w-full"
                      width="auto"
                      height="auto"
                      textAreaClassName="!rounded-lg text-[#3A4664] !px-4 !py-[7px]"
                    />
                  </FormControl>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              label="LƯU"
              width="fit-content"
              className="px-11"
              containerClassName="mt-8 mx-auto"
              labelClassName="text-sm font-bold"
            />
          </Form>
        </Formik>
      </div>
    </Modal>
  );
}

const selectMyInfo = (state: GlobalState) => state.myInfo;

export default AccountModal;
