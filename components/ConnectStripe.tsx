import { EmojiHappyIcon } from "@heroicons/react/solid";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function ConnectStripe() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const stripeLinkRequest = await fetch("/api/stripe_link", {
        method: "POST",
      });

      const stripeLink = await stripeLinkRequest.json();

      window.location.replace(stripeLink.url);
    } catch (error) {
      setLoading(false);
      console.log({ error });
    }
  };

  return (
    <>
      <div
        aria-live="assertive"
        className="flex px-4 py-6 pointer-events-none md:p-6"
      >
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex">
                <div className="ml-3 w-0 flex-1 space-y-4">
                  <p className="text-sm font-medium text-gray-900">
                    Connect Stripe
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Money will go directly to your Stripe account
                  </p>
                  <div className="text-center">
                    {!loading ? (
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="px-6 py-3 border border-transparent leading-4 font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        Connect Stripe
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="px-6 py-3 border border-transparent leading-4 font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        <EmojiHappyIcon className="h-6 w-6 animate-spin" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
