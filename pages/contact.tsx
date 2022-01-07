import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import { ArrowCircleLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";

const Pricing: NextPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Head>
        <title>
          Drop to Sell - Get a payment link for your digital products in seconds
        </title>
        <meta
          name="description"
          content="Get a payment link for your digital products in seconds"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container px-16 lg:px-48 mx-auto mt-12 space-y-32">
        <div className="flex items-center">
          <Link href="/" passHref>
            <ArrowCircleLeftIcon
              className="h-12 w-12 text-white justify-start	cursor-pointer"
              aria-hidden="true"
            />
          </Link>
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Contact
            </h1>
          </div>
        </div>

        <div className="mt-6 mx-auto">
          <p>
            This project is built and mantained by Jacinto Fleta. You can
            contact me in twitter with the handle{" "}
            <a href="https://twitter.com/jacintofleta">
              <strong>@jacintofleta</strong>
            </a>{" "}
            or by email to jacintofleta@gmail.com.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
