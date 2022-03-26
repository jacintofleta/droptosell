import type { NextPage } from "next";
import Footer from "../components/layout/Footer";

const Pricing: NextPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen container px-16 lg:px-48 mx-auto pt-12 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Contact
            </h1>
          </div>
        </div>
        <main className="flex-1">
          <div className="mx-auto">
            <p>
              This project is built and mantained by Jacinto Fleta. You can
              contact me in twitter with the handle{" "}
              <a href="https://twitter.com/jacintofleta">
                <strong>@jacintofleta</strong>
              </a>{" "}
              or by email to jacintofleta@gmail.com.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
