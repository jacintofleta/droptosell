import type { NextPage } from "next";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";
import Login from "../components/Login";
import ConnectStripe from "../components/ConnectStripe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useS3Upload } from "next-s3-upload";

const Home: NextPage = () => {
  const { user, loading } = useAuth();
  const [dropped, setDropped] = useState(false);

  const showLogin = dropped && !loading && !user;
  const showConnectStripe =
    dropped && !loading && user && !user.stripeConnected;
  const canUploadFiles = !loading && user && !showLogin && !showConnectStripe;

  let { uploadToS3 } = useS3Upload();

  const uploadFile = async (file: File) => {
    let { url } = await uploadToS3(file);
    console.log({ url });
  };

  return (
    <>
      <div className="flex flex-col container mx-auto pt-12 h-screen">
        <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
          Drop to Sell
        </h1>
        <main className="flex-1 mt-32">
          <Dropzone
            maxFiles={1}
            accept={
              "image/*, video/*, audio/*, application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf"
            }
            onDrop={(acceptedFiles, fileRejections) => {
              setDropped(true);
              if (!canUploadFiles) return;
              if (fileRejections.length > 0) {
                toast.error(fileRejections[0].errors[0]?.message);
                return;
              }
              uploadFile(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="cursor-pointer">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="flex justify-center">
                    {!showLogin && !showConnectStripe && (
                      <div
                        className={`animate-ping absolute rounded-full ${
                          canUploadFiles ? "bg-teal-600" : "bg-gray-600"
                        } w-48 h-48`}
                      ></div>
                    )}

                    <div
                      className={`${
                        showLogin || showConnectStripe ? "animate-pulse" : ""
                      } relative inline-flex rounded-full ${
                        canUploadFiles ? "bg-teal-600" : "bg-gray-600"
                      } w-48 h-48 justify-center`}
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
          {showConnectStripe && (
            <div className="mt-12">
              <ConnectStripe />
            </div>
          )}
          <ToastContainer />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
