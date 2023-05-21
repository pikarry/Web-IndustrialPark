import { PortalDialogProps } from "@app/services/modal.service";
import Button from "../button";
import Modal from "../modal/modal.component";
import { Industrial } from "@app/types";

interface IndustrialModalProps {
  industrial: Industrial;
}

function IndustrialModal({
  portalDialogRef,
  portalData,
}: PortalDialogProps<IndustrialModalProps>) {
  const industrial = portalData?.industrial;

  return (
    <Modal onCancel={portalDialogRef.close} buttonCancelInChildren>
      <div className="w-[748px] pt-[14px] pb-9 px-[22px]">
        <div className="font-bold text-2xl">{industrial?.name}</div>
        <div className="mt-[22px] flex justify-center">
          <img className="w-[384px] h-[216px]" src={industrial?.image} alt="" />
        </div>
        <div className="px-[14px] mt-9">
          <div>
            <span className="font-bold">Vị trí: </span>
            <span>{industrial?.address}</span>
          </div>
          {/* <div className="mt-[10px]">
            <div className="flex justify-between">
              <div>
                <span className="font-bold">Tổng diện tích: </span>
                <span>6ha</span>
              </div>
              <div className="mr-16">
                <span className="font-bold">Tổng số nhà xưởng: </span>
                <span>30 nhà xưởng</span>
              </div>
            </div>
          </div> */}
          <div className="mt-[10px]">
            <div className="font-bold">Mô tả</div>
            <div>{industrial?.description}</div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="flex items-center ml-5">
              <div className="mr-[11px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.62 8.45C19.57 3.83 15.54 1.75 12 1.75C12 1.75 12 1.75 11.99 1.75C8.45997 1.75 4.41997 3.82 3.36997 8.44C2.19997 13.6 5.35997 17.97 8.21997 20.72C9.27997 21.74 10.64 22.25 12 22.25C13.36 22.25 14.72 21.74 15.77 20.72C18.63 17.97 21.79 13.61 20.62 8.45ZM12 13.46C10.26 13.46 8.84997 12.05 8.84997 10.31C8.84997 8.57 10.26 7.16 12 7.16C13.74 7.16 15.15 8.57 15.15 10.31C15.15 12.05 13.74 13.46 12 13.46Z"
                    fill="#107EE3"
                  />
                </svg>
              </div>
              <div className="text-[#107EE3B2] text-sm">
                <a href={industrial?.location} target="_blank" rel="noreferrer">
                  Bản đồ
                </a>
              </div>
            </div>
            <div>
              <Button
                label="DANH SÁCH XƯỞNG"
                width="fit-content"
                labelClassName="px-[11px] text-[15px] font-bold"
                onClick={() =>
                  portalDialogRef.close({ industrialId: industrial?._id })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default IndustrialModal;
