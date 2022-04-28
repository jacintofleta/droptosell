import type { NextPage } from "next";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import useAuth from "../hooks/useAuth";
import Login from "../components/user/Login";
import ConnectStripe from "../components/user/ConnectStripe";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewProduct from "../components/products/New";
import Loading from "../components/layout/Loading";

const Home: NextPage = () => {
  const { user, loading } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [showLogin, setShowLogin] = useState<Boolean>(false);
  const [showConnectStripe, setShowConnectStripe] = useState<Boolean>(false);
  const [canUploadFiles, setCanUploadFiles] = useState<Boolean>(false);

  // FIXME: Refactor this mess
  useEffect(() => {
    setShowLogin(!!file && !user);
    setShowConnectStripe(!!file && user && !user.stripeConnected);
    setCanUploadFiles(user && user.stripeConnected);
  }, [file, showConnectStripe, showLogin, user]);

  if (loading) return <Loading />;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col container mx-auto pt-12 h-screen">
        <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
          Drop to Sell
        </h1>
        <main className="flex-1 mt-32">
          {file && canUploadFiles ? (
            <NewProduct file={file} setFile={setFile} />
          ) : (
            <Dropzone
              maxFiles={1}
              accept={
                "image/*, video/*, audio/*, application/pdf,.doc,.docx,.xls,.xlsx,.csv,.tsv,.ppt,.pptx,.pages,.odt,.rtf"
              }
              onDrop={(acceptedFiles, fileRejections) => {
                if (fileRejections.length > 0) {
                  toast.error(fileRejections[0].errors[0]?.message);
                  return;
                }
                setFile(acceptedFiles[0]);
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
          )}
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Home;
