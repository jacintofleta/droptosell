import type { NextPage } from "next";
import Footer from "../components/Footer";
import { CheckIcon } from "@heroicons/react/outline";

const Pricing: NextPage = () => {
  return (
    <>
      <div className="flex flex-col container px-16 lg:px-48 mx-auto pt-12 space-y-16 h-screen">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Pricing
            </h1>
          </div>
        </div>
        <main className="flex-1">
          <div className="mx-auto flex justify-center min-w-24">
            <div className=" p-12 bg-gray-600 rounded-2xl shadow-sm flex flex-col">
              <h3 className="text-xl font-semibold">Free to use</h3>
              <p className="mt-4 flex items-baseline">
                <span className="text-5xl font-extrabold tracking-tight">
                  $0
                </span>
                <span className="ml-1 text-xl font-semibold">month</span>
              </p>
              <p className="mt-6">We make money when you do.</p>

              {/* Feature list */}
              <ul role="list" className="mt-6 space-y-6">
                <li className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Only 5% transaction fee</span>
                </li>
                <li className="flex">
                  <CheckIcon
                    className="flex-shrink-0 w-6 h-6"
                    aria-hidden="true"
                  />
                  <span className="ml-3">Unlimited files</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
