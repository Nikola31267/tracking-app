import { HomeIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServerError() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <Image
          src="/404-image.jpg"
          alt="500"
          width={300}
          height={300}
          draggable={false}
        />
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">
            500: Server Under Construction!
          </h1>
          <p className="text-md text-center">
            Something went wrong on our end. Our servers are taking a little
            break, but don&apos;t worry, we&apos;ll be back up and running soon!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 px-4 py-2 rounded-lg text-black"
          >
            <HomeIcon className="w-4 h-4" />
            Home
          </Link>
          <Link
            href="mailto:contact-pixeltrack@builderbee.pro"
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 px-4 py-2 rounded-lg text-black"
          >
            <MessageCircleMore className="w-4 h-4" />
            Support
          </Link>
        </div>
      </div>
    </div>
  );
}
