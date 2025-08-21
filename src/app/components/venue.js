import here from "./assets/here.png";
import location from "./assets/location.png";
import time from "./assets/time.png";

const Venue = () => {
  return (
    <>
      <div className=" py-[100px] px-4 md:px-12 lg:px-40 flex items-center justify-center flex-col bg-[#FDF6F8]">
        <p className=" mt- text-primary font-normal text-sm leading-1 tracking-[5px] uppercase ">
          Save the date
        </p>
        <h2 className=" mt-4 font-alexBrush text-[#1b1b1b] text-[60px] leading-[60px] font-normal">
          When & Where
        </h2>

        <div className="   h-[360px] flex items-start mt-7">
          <div className=" w-1/2 xl:w-[570px] h-full bg-primary relative">
            <img
              src={here.src}
              className=" w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className=" w-1/2 xl:w-[570px] h-full px-[15px] py-[60px]">
            <div className=" w-full h-full py-[30px] px-[45px] flex items-start gap-[30px] ">
              <div className="">
                <h3 className=" text-primary text-[75px] leading-[75px] font-normal">
                  23
                </h3>
                <p className=" text-[#666666] text-xs leading-[1] tracking-[3px] mt-2">
                  AUG 2025
                </p>
              </div>

              <div className="">
                <h2 className="font-alexBrush text-[#1b1b1b] text-[40px] leading-[40px] font-normal mt-6">
                  Walimah
                </h2>
                <span className=" mt-3 flex items-center space-x-5 text-[#666666] text-base leading-[28px]">
                  <img src={location.src} className=" w-5 h-5 mr-4" alt="" />
                  Thé Residence
                </span>
                <span className=" mt-1 flex items-center space-x-5 text-[#666666] text-base leading-[28px]">
                  <img src={time.src} className=" w-5 h-5 mr-4" alt="" />
                  10:00AM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Venue;
