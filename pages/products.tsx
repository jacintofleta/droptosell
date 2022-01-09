import type { NextPage } from "next";
import Footer from "../components/Footer";
import Login from "../components/Login";
import useAuth from "../hooks/useAuth";

const Products: NextPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <></>;

  return (
    <>
      <div className="flex flex-col container px-16 lg:px-48 mx-auto pt-12  space-y-16 h-screen">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Products
            </h1>
          </div>
        </div>
        <main className="flex-1">
          {!user ? <Login /> : `Your are logged in ${user.email}`}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
