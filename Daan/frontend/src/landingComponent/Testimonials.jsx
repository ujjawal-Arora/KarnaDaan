import { testimonials } from "../constants";

const Testimonials = () => {
  return (
    <div className="mt-20 tracking-wide bg-gray-100"> {/* Slightly gray background for the section */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20 text-gray-800">
        What People are Saying
      </h2>
      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"> {/* 3x3 grid on large screens */}
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-md p-6 text-md border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out flex flex-col justify-between min-h-[250px]"
          >
            <p className="text-gray-600 font-normal">{testimonial.text}</p> {/* Softer gray and non-bold text */}
            <div className="flex mt-8 items-start">
              <img
                className="w-12 h-12 mr-6 rounded-full border border-gray-300"
                src={testimonial.image}
                alt=""
              />
              <div>
                <h5 className="text-gray-800">{testimonial.user}</h5>
                <span className="text-sm font-normal italic text-gray-600">
                  {testimonial.company}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
