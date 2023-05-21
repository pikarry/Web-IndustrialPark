import { CoreValueData, VisionData } from "@app/constants";
import { Images } from "@assets/images";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="w-full">
      <div className="relative">
        <img src={Images.Banner.default} alt="" />
        <div className="absolute w-full h-[60%] top-24 text-[#107EE3] bg-[#FFFFFFB2] text-center">
          <div className="font-bold text-5xl leading-[56.25px] mt-[5%]">
            Hiệu quả & thành công bền vững của nhà đầu tư
          </div>
          <div className="font-bold text-3xl leading-[35.16px] mt-[3.5%]">
            Là thước đo cho mọi kế hoạch và hành động của iRent
          </div>
        </div>
      </div>
      <div className="font-bold text-4xl text-[#107EE3] mt-20 text-center">
        Tầm nhìn
      </div>
      <div className="h-[7px] w-20 bg-[#1E86E5] mx-auto mt-7 rounded-[5px]"></div>
      <div className="mt-[33px] flex justify-around">
        {VisionData.map((vision, index) => (
          <div key={index} className="w-[396px]">
            <div>
              <img className="w-full h-[297px]" src={vision.image} alt="" />
            </div>
            <div className="font-bold text-center mt-6 text-[#3A4664]">
              {vision.title}
            </div>
            <div className="font-medium text-center text-sm text-[#3A4664] mt-2">
              {vision.description}
            </div>
          </div>
        ))}
      </div>
      <div className="font-bold text-4xl text-[#107EE3] mt-20 text-center">
        Sứ mệnh
      </div>
      <div className="h-[7px] w-20 bg-[#1E86E5] mx-auto mt-7 rounded-[5px]"></div>
      <div className="relative mt-9">
        <img src={Images.Mission.default} alt="" />
        <div className="absolute w-full h-full top-0 flex items-center text-[#107EE3] bg-[#0F5FA9CC] text-center">
          <div className="font-bold text-3xl text-white mx-32">
            Đầu tư thỏa đáng cho con người và sản phẩm nhằm hình thành môi
            trường sản xuất vững chắc & hiệu quả, mang lại giá trị gia tăng cho
            khách hàng và các thành viên của tổ chức, góp phần phát triển cộng
            đồng Doanh nghiệp tại Việt Nam.
          </div>
        </div>
      </div>
      <div className="font-bold text-4xl text-[#107EE3] mt-20 text-center">
        Giá trị cốt lõi
      </div>
      <div className="h-[7px] w-20 bg-[#1E86E5] mx-auto mt-7 rounded-[5px]"></div>
      <div className="mt-[33px] flex justify-around bg-white pt-12 pb-6">
        {CoreValueData.map((value, index) => (
          <div key={index} className="w-[250px]">
            <div>
              <img className="w-full h-[200px]" src={value.image} alt="" />
            </div>
            <div className="font-bold text-center mt-6 text-[#3A4664]">
              {value.title}
            </div>
            <div className="font-medium text-center text-sm text-[#3A4664] mt-2">
              {value.description}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 w-full h-80 bg-[#0C50A3] flex justify-between items-center">
        <div></div>
        <div className="text-white mr-20">
          <div className="font-bold">LIÊN HỆ CHÚNG TÔI</div>
          <div className="mt-3">
            <i className="fa fa-envelope mr-4"></i>info@kizuna.vn
          </div>
          <div className="mt-2">
            <i className="fa fa-phone mr-4"></i>+84 272 3900 191
          </div>
          <div className="mt-2">
            <i className="fa fa-map-marker-alt mr-4"></i>CÔNG TY CỔ PHẦN KIZUNA
            JV
          </div>
          <div className="ml-7 mt-2">Lô K, KCN Tân Kim, Huyện Cần</div>
          <div className="ml-7">Giuộc, Tỉnh Long An, Việt Nam</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
