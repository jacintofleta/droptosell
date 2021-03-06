import type { NextPage } from "next";
import Footer from "../components/layout/Footer";

const Pricing: NextPage = () => {
  return (
    <>
      <div className="flex flex-col container px-16 lg:px-48 mx-auto pt-12 space-y-16 h-screen">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              How it works
            </h1>
          </div>
        </div>
        <main className="flex-1">
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
                    <h3 className="mb-3 font-bold text-xl">Drop</h3>
                    <p className="text-sm leading-snug tracking-wide text-opacity-100">
                      Drop the file you would like to sell to your audience
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
                    <h3 className="mb-3 font-bold text-xl">Share</h3>
                    <p className="text-sm leading-snug tracking-wide text-opacity-100">
                      Share the payment link with them
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
                    <h3 className="mb-3 font-bold text-xl">Get paid</h3>
                    <p className="text-sm leading-snug tracking-wide text-opacity-100">
                      Get paid directly to your Stripe account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
