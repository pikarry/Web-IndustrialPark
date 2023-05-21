import { Images } from "@assets/images";

function NotFound() {
  return (
    <div className="flex justify-center">
      <img className="w-[600px] h-96" src={Images.NotFound.default} alt="" />
    </div>
  );
}

export default NotFound;
