import hero from "./assets/hero.png";

const Hero = () => {
  return (
    <>
      <div className="   w-full  bg-primary hero- relative">
        <img src={hero.src} className=" w-full h- object-cover" alt="" />
        <div className="absolute top-0 left-0 bg-[#1B1B1B]/40 w-full h-full ">
          <div className=" w-full h-[calc(100vh-100px)] flex flex-col items-center justify-center">
            <h1 className=" text-white text-[120px] font-alexBrush leading-[150px] text-center mt-32">
              Hikmat & Noah
            </h1>
            <p className=" text-white font-normal  text-[32px] leading-[1] tracking-[5px">
              23RD AUGUST, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
