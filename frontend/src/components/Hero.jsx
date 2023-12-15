import React from "react";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="flex flex-row bg-[#F9FCFF]  w-full px-4 md:px-10 md:py-10 lg:px-20 lg:py-10 ">
      <div className="w-full lg:w-1/2 flex flex-col">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-center lg:text-left font-bold py-4 lg:py-8">
          Read the most interesting article
        </h1>
        <p className=" text-gray-500 text-center md:text-xl lg:text-left px-6 lg:px-0 py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          voluptates, ipsa, quibusdam, voluptas quidem natus voluptate
          voluptatum quas quae molestiae quod? Quisquam voluptates, ipsa,
          quibusdam, voluptas quidem natus voluptate voluptatum quas quae
          molestiae quod?
        </p>
        <div className="md:relative my-6 md:my-4 flex-col">
          <div className="relative flex items-center">
            <input
              type="text"
              className="w-full py-4 pl-12 text-[#959EAD] shadow-xl bg-[#fff] font-bold italic rounded-xl focus:outline-none"
              placeholder="Search for article"
            />
            <div className="absolute inset-y-0 left-0 flex items-center px-4">
              <Search className="w-6 h-6 text-[#959EAD]" />
            </div>
          </div>
          <button className="w-full md:max-w-fit md:absolute inset-y-0 right-0 md:mt-2 py-3 my-2 md:py-2 px-5 md:m-2 bg-[#1565D8] text-white rounded-xl focus:outline-none">
            Search
          </button>
        </div>
        <div className="flex flex-col italic items-center gap-4 md:gap-8">
          <div className="flex flex-wrap items-center gap-2 md:gap-8 ">
          <p className="text-[#959EAD] font-bold">Popular Tags :</p>
            <button className="text-[#1565D8] bg-[#cddffa] hover:bg-[#1565D8] hover:text-[#fff] font-bold px-4 py-2 rounded-lg my-2 ">
              Design
            </button>
            <button className="text-[#1565D8] bg-[#cddffa] hover:bg-[#1565D8] hover:text-[#fff] font-bold px-4 py-2 rounded-lg my-2 ">
              User Experience
            </button>
            <button className="text-[#1565D8] bg-[#cddffa] hover:bg-[#1565D8] hover:text-[#fff] font-bold px-4 py-2 rounded-lg my-2 ">
              User Interface
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/2 hidden lg:block ">
        <img src="./images/hero.svg" className="w-full" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
