import { StatusName, StatusType } from "@app/constants";
import clsx from "clsx";

interface StatusProps {
  statusType: StatusType;
}

function Status({ statusType }: StatusProps) {
  return (
    <div
      className={clsx(
        "w-[110px] h-[30px] rounded-lg flex justify-center items-center font-medium",
        {
          "bg-[#DBF3EC] text-[#2C8E5F]": statusType === StatusType.FREE,
          "bg-[#F4D6D8] text-[#F02B37]": statusType === StatusType.BUSY,
          "bg-[#FCEEC9] text-[#F1B211]": statusType === StatusType.PENDING,
        }
      )}
    >
      {StatusName[statusType]}
    </div>
  );
}

export default Status;
