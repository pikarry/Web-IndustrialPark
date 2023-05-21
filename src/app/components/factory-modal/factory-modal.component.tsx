import { PortalDialogProps } from "@app/services/modal.service";
import { DatePicker } from "@mui/x-date-pickers";
import Button from "../button";
import Modal from "../modal/modal.component";
import CalendarIcon from "@app/icon/calendar.icon";
import "./factory-modal.style.scss";
import { Factory } from "@app/types";
import { GlobalState } from "@app/store";
import { useSelector } from "react-redux";
import { formatMoneyVN } from "@app/utils/util";
import { DATE_YEAR_FIRST_FORMAT, DEFAULT_DATE_FORMAT } from "@app/constants";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { CreateContractRequest } from "@app/types/contract.type";

interface FactoryModalProps {
  factory: Factory;
}

function FactoryModal({
  portalDialogRef,
  portalData,
}: PortalDialogProps<FactoryModalProps>) {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const { myInfo } = useSelector(selectMyInfo);

  const factory = portalData?.factory;

  const handleRentClick = () => {
    if (!factory || !startDate || !endDate) return;

    const createContractRequest: CreateContractRequest = {
      idFactory: factory._id,
      startDate: dayjs(startDate).format(DATE_YEAR_FIRST_FORMAT),
      endDate: dayjs(endDate).format(DATE_YEAR_FIRST_FORMAT),
    };

    portalDialogRef.close({ createContractRequest });
  };

  return (
    <Modal onCancel={portalDialogRef.close} buttonCancelInChildren>
      <div className="w-[700px] pt-[22px] px-6 pb-8">
        <div className="font-bold text-2xl">Thông tin thuê nhà xưởng</div>
        <div className="flex mt-8">
          <div className="font-bold flex-1">{factory?.name}</div>
          <div className="flex-1">
            <span className="font-bold">Diện tích: </span>
            <span>{factory?.acreage}m2</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 font-bold mt-6">Họ tên: {myInfo.fullname}</div>
          <div className="flex-1 font-bold mt-6">
            Số điện thoại liên hệ: {myInfo.phone}
          </div>
        </div>
        <div className="flex">
          <div className="flex-1 font-bold mt-6">Email: {myInfo.email}</div>
          <div className="flex-1 font-bold mt-6">
            Tiền cọc: {factory?.price && formatMoneyVN(factory.price)} VNĐ
          </div>
        </div>
        <div className="flex gap-7">
          <div>
            <div className="font-bold mt-6">
              Thời gian bắt đầu thuê <span className="text-[#DF1717]">*</span>
            </div>
            <div className="mt-[11px]">
              <DatePicker
                className="custom-datepicker"
                slots={{
                  openPickerIcon: CalendarIcon,
                }}
                format={DEFAULT_DATE_FORMAT}
                value={startDate}
                onChange={setStartDate}
              />
            </div>
          </div>
          <div>
            <div className="font-bold mt-6">
              Thời hạn thuê <span className="text-[#DF1717]">*</span>
            </div>
            <div className="mt-[11px]">
              <DatePicker
                className="custom-datepicker"
                slots={{
                  openPickerIcon: CalendarIcon,
                }}
                format={DEFAULT_DATE_FORMAT}
                value={endDate}
                onChange={setEndDate}
              />
            </div>
          </div>
        </div>
        <Button
          label="THUÊ NHÀ XƯỞNG"
          width="fit-content"
          className="px-[14px]"
          containerClassName="mt-11 mx-auto"
          labelClassName="text-sm font-bold"
          onClick={handleRentClick}
        />
      </div>
    </Modal>
  );
}

const selectMyInfo = (state: GlobalState) => state.myInfo;

export default FactoryModal;
