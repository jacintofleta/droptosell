import type { NextPage } from "next";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Login from "../components/Login";

const Home: NextPage = () => {
  const { user, loading } = useAuth();
  const [dropped, setDropped] = useState(false);

  const showLogin = dropped && !loading && !user;

  return (
    <>
      <div className="flex flex-col container mx-auto pt-12 h-screen">
        <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
          Drop to Sell
        </h1>
        <main className="flex-1 mt-32">
          <Dropzone
            onDrop={(acceptedFiles) => {
              setDropped(true);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="cursor-pointer">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex justify-center">
                    {!showLogin && (
                      <div className="animate-ping absolute rounded-full bg-gray-600 w-48 h-48"></div>
                    )}

                    <div
                      className={`${
                        showLogin ? "animate-pulse" : ""
                      } relative inline-flex rounded-full bg-gray-600 w-48 h-48 justify-center`}
                    >
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
          {showLogin && (
            <div className="mt-12">
              <Login />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
