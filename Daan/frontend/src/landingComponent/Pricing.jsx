import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";

const Pricing = () => {
  return (
    <div className="mt-20">
      {/* Heading */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide font-bold">
        Pricing
      </h2>
      
      {/* Cards Container */}
      <div className="flex justify-center gap-6 flex-wrap max-w-screen-lg mx-auto">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className="flex-1 min-w-[300px] max-w-[350px] p-4"
          >
            {/* Card */}
            <div className="p-8 border border-neutral-700 rounded-xl flex flex-col justify-between h-full">
              {/* Title and Price */}
              <div>
                <p className="text-4xl mb-4">
                  {option.title}
                  {option.title === "Pro" && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-400 text-transparent bg-clip-text text-xl ml-2">
                      (Most Popular)
                    </span>
                  )}
                </p>
                <p className="mb-6">
                  <span className="text-5xl font-bold">{option.price}</span>
                  <span className="text-neutral-400 tracking-tight">/Month</span>
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2">
                  {option.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <CheckCircle2 className="text-green-500 w-5 h-5 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subscribe Button */}
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-8 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200"
              >
                Subscribe
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
