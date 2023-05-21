import { AcceptName, AcceptType } from "@app/constants";
import { Contract } from "@app/types/contract.type";
import clsx from "clsx";

interface StatusProps {
  acceptType: AcceptType;
}

function Status({ acceptType }: StatusProps) {
  return (
    <div
      className={clsx(
        "w-[110px] h-[30px] rounded-lg flex justify-center items-center font-medium",
        {
          "bg-[#F4D6D8] text-[#F02B37]": acceptType === AcceptType.ACCEPTED,
          "bg-[#FCEEC9] text-[#F1B211]": acceptType === AcceptType.PENDING,
        }
      )}
    >
      {AcceptName[acceptType]}
    </div>
  );
}

interface MyFactoryCardProps {
  contract: Contract;
}

function MyFactoryCard({ contract }: MyFactoryCardProps) {
  return (
    <div className="w-[48%] h-[570px] bg-white rounded-[20px] py-[22px] pl-6 pr-6">
      <div className="flex justify-between">
        <div className="font-bold text-xl text-[#3A4664]">
          {contract.idFactory?.idIndustrial?.name}
        </div>
        <div>
          <Status acceptType={contract.isAccepted} />
        </div>
      </div>
      <div className="font-bold text-xl text-[#3A4664] mt-[30px]">
        {contract.idFactory?.name}
      </div>
      <div className="mt-[30px] text-xl text-[#3A4664]">
        <span className="font-bold">Diện tích: </span>
        <span>{contract.idFactory?.acreage}m2</span>
      </div>
      <div className="mt-[30px] text-xl flex justify-between text-[#3A4664]">
        <div>
          <span className="font-bold">Thời gian bắt đầu: </span>
          {contract.startDate}
        </div>
        <div>
          <span className="font-bold">Thời gian kết thúc: </span>
          {contract.endDate}
        </div>
      </div>
      <div className="mt-[30px]">
        <img
          className="w-[456px] h-[282px] mx-auto"
          src={contract.idFactory?.image}
          alt="not found"
        />
      </div>
    </div>
  );
}

export default MyFactoryCard;
