import { createRef } from "react";
import { Form, Formik, FormikContextType } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "@app/components/button";
import { FormControl } from "@app/components/form-control";
import Input from "@app/components/input";
import { Images } from "@assets/images";
import { signInValidationSchema } from "@app/validations";
import { SignInInitialValues } from "@app/types";
import useObservable from "@core/hooks/use-observable.hook";
import AuthService from "@app/services/http/auth.service";
import { switchMap } from "rxjs";
import StorageService from "@core/services/storage";
import { ACCESS_TOKEN_KEY } from "@app/constants";
import { useDispatch } from "react-redux";
import { storeUser } from "@app/store/auth/auth.action";
import AccountService from "@app/services/http/account.service";
import { storeMyInfo } from "@app/store/my-info/my-info.action";

function SignIn() {
  const formRef = createRef<FormikContextType<SignInInitialValues>>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { subscribeOnce } = useObservable();

  const handleSignIn = (values: SignInInitialValues) => {
    subscribeOnce(
      AuthService.login(values.email, values.password).pipe(
        switchMap((loginRes) => {
          StorageService.set(ACCESS_TOKEN_KEY, loginRes.jwt);
          dispatch(storeUser(loginRes));

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
      <div className="w-[476px] h-[564px] bg-white rounded-lg border border-black border-opacity-[0.08]">
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
              Sign In
            </span>
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              innerRef={formRef}
              onSubmit={handleSignIn}
              validationSchema={signInValidationSchema}
              validateOnChange
              validateOnBlur
            >
              <Form>
                <div className="mt-[35px]">
                  <label className="font-bold text-[#3A4664]">Email</label>
                </div>
                <div>
                  <FormControl name="email">
                    <Input
                      className="!max-w-full mt-[9px]"
                      inputClassName="!h-[45px] !leading-[45px]"
                      inputIcon={Images.UserIcon.default}
                      placeholder="Enter your email"
                      errorClassName="mt-[3px] text-xs leading-[14.06px]"
                    />
                  </FormControl>
                </div>
                <div className="mt-[19px]">
                  <label className="font-bold text-[#3A4664]">Password</label>
                </div>
                <div>
                  <FormControl name="password">
                    <Input
                      className="!max-w-full mt-[9px]"
                      inputClassName="!h-[45px] !leading-[45px]"
                      inputIcon={Images.LockOpenIcon.default}
                      inputIconClassName="!w-[18px] !h-[19px]"
                      placeholder="Enter your password"
                      type="password"
                      errorClassName="mt-[3px] text-xs leading-[14.06px]"
                    />
                  </FormControl>
                </div>
                <div className="text-end mt-[5px]">
                  <span className="font-medium text-[#1E86E5]">
                    Forgot password?
                  </span>
                </div>
                <Button
                  type="submit"
                  label="SIGN IN"
                  labelClassName="font-bold"
                  size="m"
                  width="auto"
                  containerClassName="w-full mt-[38px]"
                  className="!rounded-lg"
                />
                <div className="mt-[21px] text-center">
                  <span className="text-[#3A466480]">
                    Don’t have an account?
                  </span>
                  <span
                    className="text-[#1E86E5] font-bold cursor-pointer"
                    onClick={() => navigate("/sign-up")}
                  >
                    SIGN UP
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

export default SignIn;
