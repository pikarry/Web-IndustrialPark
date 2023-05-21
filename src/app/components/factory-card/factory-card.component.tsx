import Button from "../button";
import Status from "../status";
import { Factory } from "@app/types";

interface FactoryCardProps {
  factory: Factory;

  onRentClick: () => void;
}

function FactoryCard({ factory, onRentClick }: FactoryCardProps) {
  return (
    <div className="w-[48%] h-[500px] bg-white rounded-[20px] py-[22px] pl-6 pr-6">
      <div className="flex justify-between">
        <div className="font-bold text-xl">{factory.name}</div>
        <div>
          <Status statusType={factory.status} />
        </div>
      </div>
      <div className="mt-7 text-xl">
        <span className="font-bold">Diện tích: </span>
        <span>{factory.acreage}m2</span>
      </div>
      <div className="mt-5">
        <img
          className="w-[456px] h-[282px] mx-auto"
          src={factory.image}
          alt=""
        />
      </div>
      <Button
        width="fit-content"
        containerClassName="mb-2 mt-7 mx-auto"
        className="px-6 !rounded-lg"
        label="THUÊ XƯỞNG"
        labelClassName="font-bold"
        onClick={onRentClick}
      />
    </div>
  );
}

export default FactoryCard;
