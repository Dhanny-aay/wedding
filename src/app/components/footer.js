import placeholder4 from "./assets/placeholder4.png";

const Footer = () => {
  return (
    <>
      <div className="bg-primary py-[130px] px-4 md:px-12 lg:px-40 w-full footer-container h-[360px] relative">
        <div className=" absolute top-0 left-0 footer-gradient w-full h-full">
          <div className=" w-full h-full  flex items-center flex-col justify-center relative">
            <h2 className="mt-4 font-alexBrush text-[#fff] text-[60px] leading-[60px]">
              Hikmat & Noah
            </h2>
            <p className="mt-[10px] text-[#FFFFFF] font-normal text-sm leading-1 tracking-[5px] uppercase">
              23RD AUGUST 2025
            </p>
            <p className="absolute bottom-6 text-[#FFFFFF] font-normal text-sm leading-[24px] capitalize">
              Hikmat & Noah. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
