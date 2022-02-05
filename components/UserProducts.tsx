/* This example requires Tailwind CSS v2.0+ */
import { TrashIcon, DocumentDownloadIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useAuth from "../hooks/useAuth";
import BannerStripe from "./BannerStripe";
import { toast } from "react-toastify";
import Loading from "./Loading";

//FIXME: Type of product

export default function UserProducts() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  const { products } = user;

  if (products?.length == 0)
    return (
      <div className="text-center">
        No products yet. <Link href="/">Drop something</Link> first.
      </div>
    );

  const copyToClipboard = (paymentLink: string) => {
    navigator.clipboard.writeText(paymentLink);
    toast("Copied to clipboard");
  };

  return (
    <>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((product: any) => (
          <li
            key={product.title}
            className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200"
          >
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="block items-center">
                  <h3 className="text-gray-600 text-sm font-medium truncate">
                    {product.title}
                  </h3>
                  <p
                    onClick={() =>
                      copyToClipboard(product.stripePaymentLinkUrl)
                    }
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium truncate cursor-pointer"
                  >
                    Copy payment link
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <a href={product.file} target="_blank" rel="noreferrer">
                      <DocumentDownloadIcon
                        className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
                <div className="-ml-px w-0 flex-1 flex">
                  <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                    <TrashIcon
                      className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-16">
        <BannerStripe />
      </div>
    </>
  );
}
