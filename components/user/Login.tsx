import { MailIcon } from "@heroicons/react/solid";
import { Magic } from "magic-sdk";
import { ProcessEnv } from "../../types/env";
import { useSWRConfig } from "swr";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function Login() {
  const { mutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    const { elements } = event.target;
    try {
      // the Magic code
      const did = await new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUB_KEY as ProcessEnv
      ).auth.loginWithMagicLink({ email: elements.email.value });

      // Once we have the did from magic, login with our own API
      const authRequest = await fetch("/api/user/login", {
        method: "POST",
        headers: { Authorization: `Bearer ${did}` },
      });

      if (authRequest.ok) {
        // We successfully logged in, our API
        mutate("/api/user/user");
      } else {
        /* handle errors */
      }
      setLoading(false);
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
              <div className="flex items-start">
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Login first
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    We only need your email
                  </p>
                  <form onSubmit={handleSubmit} className="mt-4 flex space-x-6">
                    <div className="mt-1 relative rounded-md shadow-sm text-neutral-800">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-gray-500 focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                      />
                    </div>
                    {!loading ? (
                      <button
                        type="submit"
                        className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        Go
                      </button>
                    ) : (
                      <button
                        disabled
                        type="button"
                        className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <EmojiHappyIcon className="h-6 w-6 animate-spin" />
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
