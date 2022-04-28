/* This example requires Tailwind CSS v2.0+ */
import { TrashIcon, DocumentDownloadIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import BannerStripe from "./BannerStripe";
import Loading from "../layout/Loading";
import { copyToClipboard } from "../../lib/copyToClipboard";
import { useState } from "react";
import Delete from "./Delete";
import { Product } from "@prisma/client";

//FIXME: Type of product

export default function UserProducts() {
  const { user, loading } = useAuth();

  const [productToDelete, setProductToDelete] = useState();

  if (loading) return <Loading />;

  const { products } = user;

  const activeProducts = products.filter(
    (product: Product) => !product.deleted
  );

  if (activeProducts?.length == 0) {
    return (
      <div className="text-center">
        No products yet. <Link href="/">Drop something</Link> first.
      </div>
    );
  }

  return (
    <>
      {productToDelete && (
        <Delete
          productToDelete={productToDelete}
          setProductToDelete={setProductToDelete}
        />
      )}
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {activeProducts.map((product: any, index: number) => (
          <li
            key={`${product.title}-${index}`}
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
                      copyToClipboard({
                        text: product.stripePaymentLinkUrl,
                        message: "Copied to clipboard",
                      })
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
                    <a
                      href={product.awsFileUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
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
                      className="w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer"
                      aria-hidden="true"
                      onClick={() => setProductToDelete(product.id)}
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
