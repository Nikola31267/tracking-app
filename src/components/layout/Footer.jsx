import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-base-content/5 bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-8 text-center md:text-left">
        <div className="flex flex-col items-center md:flex-row">
          <div className="flex-shrink-0 text-center md:text-left md:w-96 md:pr-12">
            <Link
              href="/"
              className="flex justify-center items-center gap-2 md:justify-start"
            >
              <Image
                src="/logo-nobg.png"
                alt="Logo"
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <strong className="text-lg font-extrabold">Pixel Track</strong>
            </Link>
            <p className="text-sm mt-2 text-base-secondary">
              Your Data, Your Power.
            </p>
            <p className="text-sm mt-2 text-base-secondary">
              Copyright © 2024 - All rights reserved
            </p>
            <p className="text-sm mt-2 text-base-secondary">
              Made with ❤️ by StartGrid Team.
            </p>
            <a
              href="https://startgrid.xyz"
              className="mt-4 inline-block text-sm bg-gray-100 px-2 py-1 transition-all duration-300 rounded-md hover:scale-[1.02] "
            >
              <span className="flex items-center gap-1">
                <Image
                  src="/startgrid-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                Built with
                <span className="font-semibold">StartGrid</span>
              </span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center mt-10 md:mt-0 md:w-2/3">
            <div className="w-full md:w-1/3 px-4">
              <div className="text-sm font-semibold mb-3">Product</div>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/#faq" className="hover:underline">
                    FAQs
                  </Link>
                </li>
                <li></li>
                <li>
                  <Link href="/#pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-sm font-semibold mb-3">LEGAL</div>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/tos" className="hover:underline">
                    Terms of services
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:underline">
                    Privacy policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
