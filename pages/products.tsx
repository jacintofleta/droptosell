import type { NextPage } from "next";
import Footer from "../components/Footer";
import Login from "../components/Login";
import UserProducts from "../components/UserProducts";
import useAuth from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import Loading from "../components/Loading";

const Products: NextPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col container px-16 lg:px-48 mx-auto pt-12  space-y-16 h-screen">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-6xl lg:text-8xl font-extrabold">
              Products
            </h1>
          </div>
        </div>
        <main className="flex-1">{user ? <UserProducts /> : <Login />}</main>
        <Footer />
      </div>
    </>
  );
};

export default Products;
