import type { NextPage } from "next";
import Footer from "../components/Footer";

const Pricing: NextPage = () => {
  return (
    <>
      <div className="container px-16 lg:px-48 mx-auto my-12 mb-36 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              How it works
            </h1>
          </div>
        </div>

        <div className="mx-auto space-y-6">
          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden h-full">
              <div className="border-2-2 absolute border-white h-full border left-1/2" />
              {/* right timeline */}
              <div className="mb-8 flex justify-center md:justify-between items-center w-full ">
                <div className="hidden md:flex order-1 w-5/12" />
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-gray-900">
                    1
                  </h1>
                </div>
                <div className="z-10 order-1 bg-gray-600 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-xl">Drop a file</h3>
                  <p className="text-sm leading-snug tracking-wide text-opacity-100">
                    We will send it to your customers after they pay
                  </p>
                </div>
              </div>
              {/* left timeline */}
              <div className="mb-8 flex justify-center md:justify-between md:flex-row-reverse items-center w-full ">
                <div className="hidden md:flex order-1 w-5/12" />
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-gray-900 font-semibold text-lg">
                    2
                  </h1>
                </div>
                <div className="z-10 order-1 bg-gray-600 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-xl">
                    Get the payment link
                  </h3>
                  <p className="text-sm leading-snug tracking-wide text-opacity-100">
                    You will get a Stripe payment link
                  </p>
                </div>
              </div>
              {/* right timeline */}
              <div className="mb-8 flex justify-center md:justify-between items-center w-full ">
                <div className="hidden md:flex order-1 w-5/12" />
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-gray-900">
                    3
                  </h1>
                </div>
                <div className="z-10 order-1 bg-gray-600 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-xl">Share it</h3>
                  <p className="text-sm leading-snug tracking-wide text-opacity-100">
                    Share it with your audience
                  </p>
                </div>
              </div>
              {/* left timeline */}
              <div className="mb-8 flex justify-center md:justify-between md:flex-row-reverse items-center w-full ">
                <div className="hidden md:flex order-1 w-5/12" />
                <div className="hidden md:flex z-20 items-center order-1 bg-white shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-gray-900 font-semibold text-lg">
                    4
                  </h1>
                </div>
                <div className="z-10 order-1 bg-gray-600 rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4">
                  <h3 className="mb-3 font-bold text-xl">Get paid directly</h3>
                  <p className="text-sm leading-snug tracking-wide text-opacity-100">
                    All the money goes directly to your Stripe account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
