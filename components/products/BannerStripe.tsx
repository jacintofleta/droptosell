import { ArrowRightIcon } from "@heroicons/react/solid";

export default function BannerStripe() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden shadow rounded-lg">
      <a
        href="https://dashboard.stripe.com/dashboard"
        target="_blank"
        rel="noreferrer"
      >
        <div className="px-4 py-5 sm:p-6 flex justify-between">
          <div>
            <h3 className="text-xl font-bold self-center">
              Looking for your sales?
            </h3>
            <p>Use the Stripe dashboard</p>
          </div>
          <div className="self-center">
            <ArrowRightIcon
              className="w-5 h-5 text-white cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>
      </a>
    </div>
  );
}
