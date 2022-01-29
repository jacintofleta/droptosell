import { ChangeEvent, useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

export type Product = {
  name: string;
  currency: "USD" | "EUR" | "GBP";
  amount: number;
  file: File | null;
};

const currencySymbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export default function NewProduct({ file }: { file: File | null }) {
  const { user } = useAuth();

  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    currency: "USD",
    amount: 10,
    file: file,
  });

  const [paymentLink, setPaymentLink] = useState("");

  const { currency, amount, name } = newProduct;

  const [loading, setLoading] = useState(false);

  let { uploadToS3 } = useS3Upload();

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      //let { url } = await uploadToS3(file as File);

      const paymentLinkRequest = await fetch("/api/new_product", {
        method: "POST",
        headers: { Authorization: `Bearer ${user.issuer}` },
        body: JSON.stringify({
          currency,
          amount,
          name,
        }),
      });

      const { paymentLink } = await paymentLinkRequest.json();

      setPaymentLink(paymentLink);
    } catch (error) {
      console.log(error);
      // FIXME: Capture errors with Sentry
      toast.error("An error has ocurred");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
  };

  return (
    <>
      <div
        aria-live="assertive"
        className="flex px-4 py-6 pointer-events-none md:p-6"
      >
        <div className="w-full flex flex-col items-center space-y-4 text-gray-900">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
            {paymentLink ? (
              <div className="p-8 justify-center grid grid-cols-12 gap-4">
                <label htmlFor="paymentlink" className="sr-only">
                  Payment link
                </label>
                <input
                  type="text"
                  name="paymentlink"
                  id="paymentlink"
                  value={paymentLink}
                  className="col-span-9 shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="you@example.com"
                />
                <button
                  type="button"
                  className="col-span-3 justify-center inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Copy
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 justify-center">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        onChange={onChange}
                        name="name"
                        id="name"
                        value={name}
                        className="focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Web 3 fundamentals"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">
                          {currencySymbols[currency]}
                        </span>
                      </div>
                      <input
                        type="number"
                        onChange={onChange}
                        name="amount"
                        id="amount"
                        value={amount}
                        className="md:pr-16 focus:ring-teal-500 focus:border-teal-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <label htmlFor="currency" className="sr-only">
                          Currency
                        </label>
                        <select
                          onChange={onChange}
                          id="currency"
                          name="currency"
                          value={currency}
                          className="focus:ring-teal-500 focus:border-teal-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                        >
                          <option>EUR</option>
                          <option>USD</option>
                          <option>GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {!loading ? (
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Get payment link
                    </button>
                  ) : (
                    <button
                      disabled
                      type="button"
                      className="inline-flex w-full justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      <EmojiHappyIcon className="h-6 w-6 animate-spin" />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
