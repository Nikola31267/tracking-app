import { HomeIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import config from "@/config";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-5 mt-10">
        <Image
          src="/404-image.jpg"
          alt="404"
          width={300}
          height={300}
          draggable={false}
        />
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl font-bold">404: Off the Radar!</h1>
          <p className="text-md text-center">
            Looks like this page took a detour and got lost in the traffic.
            <br /> But don&apos;t worry, we&apos;re tracking everything else
            just fine!
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
            href={`mailto:${config.supportEmail}`}
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
