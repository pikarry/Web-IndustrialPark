import { Form, Formik, FormikContextType } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@app/components/button";
import { FormControl } from "@app/components/form-control";
import Input from "@app/components/input";
import { Images } from "@assets/images";
import { signUpValidationSchema } from "@app/validations";
import { createRef, useState } from "react";
import { SignUpInitialValues, SignUpRequest } from "@app/types";
import { ACCESS_TOKEN_KEY, Gender } from "@app/constants";
import useObservable from "@core/hooks/use-observable.hook";
import AuthService from "@app/services/http/auth.service";
import { switchMap } from "rxjs";
import StorageService from "@core/services/storage";
import { useDispatch } from "react-redux";
import { storeUser } from "@app/store/auth/auth.action";
import AccountService from "@app/services/http/account.service";
import { storeMyInfo } from "@app/store/my-info/my-info.action";

function SignUp() {
  const formRef = createRef<FormikContextType<SignUpInitialValues>>();

  const [gender, setGender] = useState(Gender.MALE);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subscribeOnce } = useObservable();

  const handleSignUp = (values: SignUpInitialValues) => {
    const signUpRequest: SignUpRequest = {
      email: values.email,
      password: values.password,
      fullname: values.fullname,
      gender,
      phone: values.phone,
      address: values.address,
    };

    subscribeOnce(
      AuthService.signUp(signUpRequest).pipe(
        switchMap((signUpRes) => {
          StorageService.set(ACCESS_TOKEN_KEY, signUpRes.jwt);
          dispatch(storeUser(signUpRes));

          return AccountService.getMyInfo();
        })
      ),
      (myInfoRes) => {
        dispatch(storeMyInfo(myInfoRes));
        navigate("/");
      }
    );
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[820px] h-[670px] bg-white rounded-lg border border-black border-opacity-[0.08]">
        <div className="flex justify-center mt-[18px]">
          <img
            className="w-[129px] h-[78px]"
            src={Images.Logo.default}
            alt=""
          />
        </div>
        <div className="ml-[72px] mr-[73px] mt-[7px]">
          <div>
            <span className="font-bold text-2xl leading-[28.13px] text-[#3A4664]">
              Sign Up
            </span>
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                fullname: "",
                password: "",
                confirmPassword: "",
                phone: "",
                address: "",
              }}
              innerRef={formRef}
              onSubmit={handleSignUp}
              validationSchema={signUpValidationSchema}
              validateOnChange
              validateOnBlur
            >
              <Form>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="mt-[20px]">
                      <label className="font-bold text-[#3A4664]">Email</label>
                    </div>
                    <div>
                      <FormControl name="email">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.UserIcon.default}
                          placeholder="Enter your email"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                    <div className="mt-[15px]">
                      <label className="font-bold text-[#3A4664]">
                        Password
                      </label>
                    </div>
                    <div>
                      <FormControl name="password">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.LockOpenIcon.default}
                          inputIconClassName="!w-[18px] !h-[19px]"
                          placeholder="Enter your password"
                          type="password"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                    <div className="mt-[15px]">
                      <label className="font-bold text-[#3A4664]">
                        Confirm password
                      </label>
                    </div>
                    <div>
                      <FormControl name="confirmPassword">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.LockOpenIcon.default}
                          inputIconClassName="!w-[18px] !h-[19px]"
                          placeholder="Confirm your password"
                          type="password"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mt-[20px]">
                      <label className="font-bold text-[#3A4664]">
                        Full name
                      </label>
                    </div>
                    <div>
                      <FormControl name="fullname">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.UserIcon.default}
                          placeholder="Enter your full name"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                    <div className="mt-[15px]">
                      <label className="font-bold text-[#3A4664]">Phone</label>
                    </div>
                    <div>
                      <FormControl name="phone">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.UserIcon.default}
                          placeholder="Enter your phone"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                    <div className="mt-[15px]">
                      <label className="font-bold text-[#3A4664]">
                        Address
                      </label>
                    </div>
                    <div>
                      <FormControl name="address">
                        <Input
                          className="mt-[9px]"
                          inputClassName="!h-[45px] !leading-[45px]"
                          inputIcon={Images.UserIcon.default}
                          placeholder="Enter your address"
                          errorClassName="mt-[3px] text-xs leading-[14.06px]"
                        />
                      </FormControl>
                    </div>
                    <div className="mt-[15px]">
                      <label className="font-bold text-[#3A4664]">Gender</label>
                    </div>
                    <div className="flex items-center h-10 gap-8">
                      <div className="flex gap-1">
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
                      <div className="flex gap-1">
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
                <Button
                  type="submit"
                  label="SIGN UP"
                  labelClassName="font-bold"
                  size="m"
                  width="fit-content"
                  containerClassName="mt-[15px] text-center mx-auto"
                  className="!rounded-lg text-center w-80 px-44"
                />
                <div className="mt-[15px] text-center">
                  <span className="text-[#3A466480]">
                    You already have an account?
                  </span>
                  <span
                    className="text-[#1E86E5] font-bold cursor-pointer"
                    onClick={() => navigate("/sign-in")}
                  >
                    SIGN IN
                  </span>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
