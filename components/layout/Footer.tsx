/* This example requires Tailwind CSS v2.0+ */
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = {
  main: [
    { name: "Drop", href: "/" },
    { name: "Products", href: "/products" },
    { name: "How it works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
    { name: "Terms", href: "/terms" },
  ],
};

export default function Footer() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <footer className="flex flex-col bottom-0 w-full">
      <div className="bg-gray-900 max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <Link href={item.href} passHref>
                <span
                  className={`text-base ${
                    pathname === item.href
                      ? "text-teal-500"
                      : "text-gray-500 hover:text-gray-400"
                  } cursor-pointer`}
                >
                  {item.name}
                </span>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}
