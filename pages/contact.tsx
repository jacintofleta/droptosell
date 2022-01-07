import type { NextPage } from "next";
import Footer from "../components/Footer";

const Pricing: NextPage = () => {
  return (
    <>
      <div className="container px-16 lg:px-48 mx-auto my-12 mb-36 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Contact
            </h1>
          </div>
        </div>

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
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
