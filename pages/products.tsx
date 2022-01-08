import type { NextPage } from "next";
import Footer from "../components/Footer";
import useAuth from "../hooks/useAuth";

const Products: NextPage = () => {
  const { user, loading } = useAuth();

  return (
    <>
      <div className="container px-16 lg:px-48 mx-auto my-12 mb-36 space-y-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Products
            </h1>
          </div>
        </div>
        {!loading && (
          <div className="mx-auto">{user ? user.email : "Not signed in"}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
