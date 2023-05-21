import { PortalDialogProps } from "@app/services/modal.service";
import Button from "../button";
import Input from "../input";
import Modal from "../modal/modal.component";

function ResetPasswordModal({ portalDialogRef }: PortalDialogProps) {
  return (
    <Modal onCancel={portalDialogRef.close} buttonCancelInChildren>
      <div className="w-[456px] pt-[22px] px-6 pb-8">
        <div className="font-bold text-2xl text-[#3A4664]">Đổi mật khẩu</div>
        <div className="mt-8">
          <div>
            <label className="font-bold text-[#3A4664]">
              Mật khẩu hiện tại
            </label>
          </div>
          <div>
            <Input
              className="!max-w-full mt-2"
              inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
              errorClassName="mt-[3px] text-xs leading-[14.06px]"
              type="password"
            />
          </div>
          <div className="mt-4">
            <label className="font-bold text-[#3A4664]">Mật khẩu mới</label>
          </div>
          <div>
            <Input
              className="!max-w-full mt-2"
              inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
              errorClassName="mt-[3px] text-xs leading-[14.06px]"
              type="password"
            />
          </div>
          <div className="mt-4">
            <label className="font-bold text-[#3A4664]">
              Xác nhận mật khẩu mới
            </label>
          </div>
          <div>
            <Input
              className="!max-w-full mt-2"
              inputClassName="!h-[40px] !leading-[40px] text-[#3A4664]"
              errorClassName="mt-[3px] text-xs leading-[14.06px]"
              type="password"
            />
          </div>
        </div>
        <Button
          label="RESET"
          width="fit-content"
          className="px-11"
          containerClassName="mt-8 mx-auto"
          labelClassName="text-sm font-bold"
        />
      </div>
    </Modal>
  );
}

export default ResetPasswordModal;
