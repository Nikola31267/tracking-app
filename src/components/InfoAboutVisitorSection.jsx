import Image from "next/image";
import React from "react";

const InfoAboutVisitorSection = () => {
  return (
    <section className="bg-base-300 py-24 md:py-36">
      <div className="mx-auto max-w-3xl space-y-12 md:space-y-20">
        <div className="relative flex items-center justify-center">
          <Image
            src="/logo-nobg.png"
            alt="Marc Lou — Product Hunt Maker of the Year 2023"
            className="h-52 w-52 rounded-lg object-cover object-center sm:float-left sm:h-32 sm:w-32 md:h-52 md:w-52"
            width={52}
            height={52}
          />
          <div className="text-base-secondary mx-auto max-w-xl space-y-4 leading-relaxed md:space-y-5">
            <p className="text-lg font-medium">
              Hello
              <span
                className="mx-0.5 cursor-pointer rounded-sm px-1 text-base-content underline decoration-primary/80 decoration-wavy decoration-[2px] underline-offset-[3px] duration-150 ease-in-out hover:bg-primary/20 hover:decoration-primary"
                data-tooltip-id="system-info-tooltip"
              >
                Wanderer
              </span>{" "}
              from{" "}
              <span className="inline-flex flex-wrap items-center gap-1.5 text-base-content">
                <span>Bulgaria</span>
                <div className="inline-flex h-[14px] w-[21px] overflow-hidden rounded-sm shadow-md">
                  <Image
                    src="https://purecatamphetamine.github.io/country-flag-icons/3x2/BG.svg"
                    alt="Bulgaria flag"
                    className="h-full w-full"
                    width={21}
                    height={14}
                  />
                </div>
              </span>
            </p>
            <p className="">
              It&apos;s me, This Marc, maker of DataFast. I built{" "}
              <a
                className="link font-medium text-base-content hover:link-secondary"
                target="_blank"
                href="https://marclou.com?ref=datafast_intro"
              >
                24 startups in 2 years
              </a>
              . People ask me:
            </p>
            <ul className="italic">
              <li>- How to know if I should focus on a startup?</li>
              <li>- What are the best marketing channels?</li>
            </ul>
            <p className="font-medium text-base-content">
              Answer: It depends on your data
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoAboutVisitorSection;
