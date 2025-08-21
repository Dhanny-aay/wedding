import couple from "./assets/couple.png";
import her from "./assets/her.png";
import him from "./assets/him.png";

const About = () => {
  return (
    <>
      {/* the wedding */}
      <div className=" bg-[#FDF6F8] py-16  px-4 md:px-12 lg:px-40 w-full flex items-center flex-col justify-center  ">
        <img src={couple.src} className="w-[226px] h-[226px] " alt="" />
        <p className=" mt-11 text-primary font-normal text-sm leading-1 tracking-[5px] uppercase ">
          Hello & Welcome
        </p>
        <h2 className=" mt-4 font-alexBrush text-[#1b1b1b] text-[60px] leading-[60px] font-normal">
          Our Wedding
        </h2>

        <p className=" mt-5 text-[#666666] max-w-[800px] text-center text-base leading-[28px] ">
          And among His signs is that He created for you from yourselves mates
          that you may find tranquility in them; and He placed between you
          affection and mercy. Indeed in that are signs for a people who
          reflect. – Ar-Rum (30:21)
        </p>
      </div>
      {/* tanout couple*/}
      <div className=" bg-[#FDF6F8] py-16  px-4 md:px-12 lg:px-40 w-full flex items-center flex-col justify-center  ">
        <p className=" mt-11 text-primary font-normal text-sm leading-1 tracking-[5px] uppercase ">
          Bride & Groom
        </p>
        <h2 className=" mt-4 font-alexBrush text-[#1b1b1b] text-[60px] leading-[60px] font-normal">
          Happy Couple
        </h2>
        <div className=" mt-20 max-w-[790px] grid grid-cols-2 gap-8">
          {/* bride */}
          <div className=" w-full flex flex-col items-center justify-center text-center">
            <img src={her.src} className="w-[190px] h-[190px] " alt="" />
            <p className=" font-normal tracking-[3px] text-base leading-[1] mt-5 uppercase">
              Hikmat
            </p>
            <p className=" mt-3 font-normal  text-2xl font-alexBrush text-primary leading-[28px] ">
              The Bride
            </p>
            <p className=" mt-3 text-center text-base text-[#666666] leading-[28px]">
              My partner in faith & love… you are my home and my horizon. May
              our journey together be endless in mercy, patience, and joy.
            </p>
          </div>
          {/* groom */}
          <div className=" w-full flex flex-col items-center justify-center text-center">
            <img src={him.src} className="w-[190px] h-[190px] " alt="" />
            <p className=" font-normal tracking-[3px] text-base leading-[1] mt-5 uppercase">
              Noah
            </p>
            <p className=" mt-3 font-normal  text-2xl font-alexBrush text-primary leading-[28px] ">
              The Groom
            </p>
            <p className=" mt-3 text-center text-base text-[#666666] leading-[28px]">
              My beloved, may I always be your comfort in trials and your
              laughter in ease, as we walk hand in hand towards Jannah.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
