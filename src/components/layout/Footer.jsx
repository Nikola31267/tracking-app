import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-base-content/5 bg-base-300 py-24">
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
              <strong className="text-lg font-extrabold">PixelTrack</strong>
            </Link>
            <p className="text-sm mt-2 text-base-secondary">Description</p>
            <p className="text-sm mt-2 text-base-secondary">
              © 2024 - All rights reserved
            </p>
            <p className="text-sm mt-2 text-base-secondary">
              Made with ❤️ by TurboVerify Team.
            </p>
            <a
              href="https://turboverify.vercel.app"
              className="mt-4 inline-block text-sm bg-gray-100 px-2 py-1 transition-all duration-300 rounded-md hover:py-[0.360rem] "
            >
              <span className="flex items-center gap-1">
                <Image
                  src="/turboverify-logo.png"
                  alt="Logo"
                  width={24}
                  height={24}
                />
                Authenticated with
                <span className="font-semibold">TurboVerify</span>
              </span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center mt-10 md:mt-0 md:w-2/3">
            <div className="w-full md:w-1/3 px-4">
              <div className="text-sm font-semibold mb-3">Product</div>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/product" className="link-hover">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="link-hover">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="link-hover">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <div className="text-sm font-semibold mb-3">LEGAL</div>
              <ul className="text-sm space-y-2">
                <li>
                  <Link href="/tos" className="link-hover">
                    Terms of services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="link-hover">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="link-hover">
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
