import type { NextPage } from "next";
import { useState } from "react";
import Footer from "../components/Footer";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Pricing: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="container px-16 lg:px-48 mx-auto my-12 mb-36 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Pricing
            </h1>
          </div>
        </div>

        <div className="mx-auto">
          <p>
            No monthly fees. <strong>Only 8% per sale forever</strong>. You can
            upload unlimited files to get unlimited payment links. As simple as
            that.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
