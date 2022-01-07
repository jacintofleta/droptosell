import type { NextPage } from "next";
import Head from "next/head";
import Dropzone from "react-dropzone";
import Image from "next/image";
import Modal from "./../components/Modal";
import { useState } from "react";
import Footer from "../components/Footer";

const Home: NextPage = () => {
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
      <div className="container mx-auto mt-12 space-y-32">
        <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
          Drop to Sell
        </h1>

        <Dropzone onDrop={(acceptedFiles) => setShowModal(true)}>
          {({ getRootProps, getInputProps }) => (
            <section className="cursor-pointer">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex justify-center">
                  <div className="animate-ping absolute rounded-full bg-gray-600 w-48 h-48"></div>
                  <div className="relative inline-flex rounded-full bg-gray-600 w-48 h-48 justify-center">
                    <Image
                      src="/add-icon.svg"
                      height={30}
                      width={30}
                      alt="Drag and drop a file here"
                      className="relative text-8xl mx-auto my-auto"
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
        </Dropzone>

        {showModal && <Modal />}
      </div>
      <Footer />
    </>
  );
};

export default Home;
