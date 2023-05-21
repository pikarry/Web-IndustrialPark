import { Images } from "@assets/images";
import Button from "../button";
import { Industrial } from "@app/types";

interface IndustrialCardProps {
  industrial: Industrial;

  onViewInfoClick: () => void;
}

function IndustrialCard({ industrial, onViewInfoClick }: IndustrialCardProps) {
  return (
    <div className="w-[48%] h-72 bg-white rounded-[20px] py-5 pl-6 pr-7">
      <div className="font-bold text-xl text-[#3A4664]">{industrial.name}</div>
      <div className="flex justify-between mt-3">
        <div className="flex-1 flex flex-col justify-between items-center">
          <div>
            <img
              className="w-6 h-6 mt-9 m-auto"
              src={Images.LocationIcon.default}
              alt=""
            />
            <div className="font-bold text-xl mt-5 text-[#3A4664]">
              {industrial.address}
            </div>
          </div>
          <Button
            width="fit-content"
            containerClassName="mb-2"
            className="px-3 !rounded-lg"
            label="Xem thông tin"
            labelClassName="font-bold text-xl"
            onClick={onViewInfoClick}
          />
        </div>
        <div className="flex-[2]">
          <img className="w-96 h-52" src={industrial.image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default IndustrialCard;
