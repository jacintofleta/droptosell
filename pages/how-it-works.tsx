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
              How it works
            </h1>
          </div>
        </div>

        <div className="mx-auto space-y-6">
          <p>
            Drop a file to get a payment link. You can then share the link
            whenever you want and get sales. All your customers will receive the
            file by email after paying.
          </p>

          <p>
            You will receive the money directly in your Stripe account. We do
            not accumulate your money.
          </p>

          <p>
            If you want to edit or delete a product you can do it right into
            your Stripe dashboard.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
