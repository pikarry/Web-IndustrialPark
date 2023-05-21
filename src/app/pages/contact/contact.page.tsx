import { Images } from "@assets/images";

function Contact() {
  return (
    <div className="w-full">
      <div className="w-full">
        <img className="w-full" src={Images.Mission.default} alt="" />
      </div>
      <div className="px-9">
        <div className="mt-6 font-bold text-[#107EE3] text-xl">
          Bộ phận kinh doanh
        </div>
        <div className="h-[5px] w-20 bg-[#1E86E5] mt-5 rounded-[5px]"></div>
        <div className="mt-[33px] w-full flex justify-center gap-[50px]">
          <div>
            <img
              className="w-[280px]"
              src={Images.LeHoangVinhPhu.default}
              alt=""
            />
            <div className="font-bold text-center mt-4">
              LÊ HOÀNG VĨNH PHÚ (MR.)
            </div>
            <div className="text-center text-sm">
              Đại Diện Thương Mại tại Việt Nam
            </div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.PhoneIcon.default} alt="" />
              <div className="text-[#107EE3]">0123456789</div>
            </div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.SmsIcon.default} alt="" />
              <div className="text-[#107EE3]">phu.lhv@irent.com</div>
            </div>
          </div>
          <div>
            <img
              className="w-[280px]"
              src={Images.NguyenThiThuHang.default}
              alt=""
            />
            <div className="font-bold text-center mt-4">
              NGUYỄN THỊ THU HẰNG (MS.)
            </div>
            <div className="text-center text-sm">Phó giám đốc kinh doanh</div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.PhoneIcon.default} alt="" />
              <div className="text-[#107EE3]">0123456789</div>
            </div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.SmsIcon.default} alt="" />
              <div className="text-[#107EE3]">hang.ntt@irent.com</div>
            </div>
          </div>
          <div>
            <img
              className="w-[280px]"
              src={Images.DuongQuangPhuc.default}
              alt=""
            />
            <div className="font-bold text-center mt-4">
              DƯƠNG QUANG PHÚC ( MR.)
            </div>
            <div className="text-center text-sm">Trưởng bộ phận kinh doanh</div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.PhoneIcon.default} alt="" />
              <div className="text-[#107EE3]">0123456789</div>
            </div>
            <div className="mt-[5px] flex justify-center gap-[5px]">
              <img className="w-5" src={Images.SmsIcon.default} alt="" />
              <div className="text-[#107EE3]">phuc.dq@irent.com</div>
            </div>
          </div>
        </div>
        <div className="mt-10 font-bold text-[#107EE3] text-xl">
          Bộ phận tuyển dụng
        </div>
        <div className="h-[5px] w-20 bg-[#1E86E5] mt-5 rounded-[5px]"></div>
        <div className="mt-6 flex gap-[5px]">
          <img className="w-5" src={Images.PhoneIcon.default} alt="" />
          <div className="text-[#107EE3]">0123456789</div>
        </div>
        <div className="mt-[15px] flex gap-[5px]">
          <img className="w-5" src={Images.SmsIcon.default} alt="" />
          <div className="text-[#107EE3]">jobs@irent.com</div>
        </div>
        <div className="mt-10 font-bold text-[#107EE3] text-xl">
          IRENT CORPORATION
        </div>
        <div className="h-[5px] w-20 bg-[#1E86E5] mt-5 rounded-[5px]"></div>
        <div className="mt-6">
          Lô K, KCN Tân Kim, Thị Trấn Cần Giuộc, Huyện Cần Giuộc, Tỉnh Long An,
          Việt Nam
        </div>
        <div className="mt-[10px] flex gap-[5px]">
          <img className="w-5" src={Images.PhoneIcon.default} alt="" />
          <div className="text-[#107EE3]">0123456789</div>
        </div>
        <div className="mt-[15px] flex gap-[5px]">
          <img className="w-5" src={Images.SmsIcon.default} alt="" />
          <div className="text-[#107EE3]">jobs@irent.com</div>
        </div>
      </div>
      <div className="w-full mt-11">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9326.294920365386!2d106.64975205891787!3d10.639700049879288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175313e3480fcc7%3A0x83dc96f0cb289d7d!2zQ8O0bmcgVHkgQ-G7lSBQaOG6p24gS2l6dW5hIEpW!5e0!3m2!1svi!2s!4v1684121062818!5m2!1svi!2s"
          className="w-full h-96"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="w-full h-[350px] bg-[#107EE3]">
        <div className="pt-5 ml-[38px] font-bold text-white">
          LIÊN HỆ CHÚNG TÔI
        </div>
      </div>
    </div>
  );
}

export default Contact;
