import loon from "./assets/loon.png";
import birds from "./assets/birds.png";

const Order = () => {
  const events = [
    { time: "10:00 AM", title: "Welcoming Ceremonies", side: "left" },
    {
      time: "10:30 AM",
      title:
        "Recitation Ceremony & Singing Of The Marriage Certificate And Photo Session",
      side: "right",
    },
    { time: "11:30 AM", title: "Couple Entry", side: "left" },
    { time: "12:00 PM", title: "Jamming Moments & Games", side: "right" },
    {
      time: "12:30 PM",
      title: "Cake Cutting & Group Photo Session",
      side: "left",
    },
    { time: "01:00 PM", title: "Meals Are Open", side: "right" },
    { time: "02:30 PM", title: "Dance", side: "left" },
    { time: "03:00 PM", title: "Vote Of Thanks", side: "right" },
    { time: "03:15 PM", title: "Closing Prayer", side: "left" },
  ];

  return (
    <div
      id="events"
      className="bg-primary py-16 md:py-[130px] px-4 md:px-12 lg:px-40 w-full flex items-center flex-col justify-center"
    >
      <p className="mt-11 text-[#FFFFFF] font-normal text-sm leading-1 tracking-[5px] uppercase">
        HikmaT & Noah
      </p>
      <h2 className="mt-4 font-alexBrush text-[#fff]  text-[40px] leading-[40px] md:text-[60px] md:leading-[60px] font-normal mb-16">
        Order of Event
      </h2>

      {/* Timeline Container */}
      <div className="relative max-w-4xl w-full">
        {/* Central Timeline Line - Desktop */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[3px] bg-[#E8EFED] h-full"></div>

        {/* Left Timeline Line - Mobile */}
        <div className="md:hidden absolute left-8 w-[3px] bg-[#E8EFED] h-full"></div>

        {/* Decorative Top Element */}
        <div className="absolute top-0 left-8 md:left-1/2 transform -translate-x-1/2 -translate-y-8">
          <img src={loon.src} className=" w-[49px] h-[70px]" alt="" />
        </div>

        {/* Decorative Bottom Element */}
        <div className="absolute bottom-0 left-8 md:left-1/2 transform -translate-x-1/2 translate-y-8">
          <img src={loon.src} className=" w-[49px] h-[70px]" alt="" />
        </div>

        {/* Events */}
        <div className="space-y-8 pt-8 pb-8">
          {events.map((event, index) => (
            <div key={index} className="relative flex items-center">
              {/* Timeline Dot - Desktop (center) */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2  bg-white w-[60px] h-[60px] items-center justify-center rounded-full border-2 border-[#D9ECE7] z-10">
                <img src={birds.src} className=" w-[30px] h-[30px]" alt="" />
              </div>

              {/* Timeline Dot - Mobile (left) */}
              <div className="md:hidden absolute left-8 transform -translate-x-1/2 bg-white w-[60px] h-[60px] flex items-center justify-center rounded-full border-2 border-[#D9ECE7] z-10">
                <img src={birds.src} className=" w-[30px] h-[30px]" alt="" />
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex w-full">
                {event.side === "left" ? (
                  <>
                    <div className="w-1/2 pr-14 text-right">
                      <div className="bg-white border-2 border-[#F6F6F6]  p-6">
                        <h3 className="text-[#5E9A8D] text-2xl font-normal font-alexBrush leading-[27px">
                          {event.title}
                        </h3>
                        <p className="text-[#000000] text-sm font-normal leading-[20px] mt-2">
                          {event.time}
                        </p>
                      </div>
                    </div>
                    <div className="w-1/2"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2"></div>
                    <div className="w-1/2 pl-14 text-left">
                      <div className="bg-white border-2 border-[#F6F6F6]  p-6">
                        <h3 className="text-[#5E9A8D] text-2xl font-normal font-alexBrush leading-[27px]">
                          {event.title}
                        </h3>
                        <p className="text-[#000000] text-sm font-normal leading-[20px] mt-2">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Layout */}
              <div className="md:hidden w-full pl-20">
                <div className="bg-white border-2 border-[#F6F6F6] p-4">
                  <h3 className="text-[#5E9A8D] text-lg font-normal font-alexBrush leading-[22px]">
                    {event.title}
                  </h3>
                  <p className="text-[#000000] text-sm font-normal leading-[20px] mt-2">
                    {event.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
