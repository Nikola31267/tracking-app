import { ArrowRight } from "lucide-react";
import { ShinyButton } from "./ui/shiny-button";

const CallToAction = () => {
  return (
    <section className="mt-20 flex flex-col items-center justify-center text-center mb-20 ">
      <div className="bg-gray-50 w-fit p-8 rounded-xl ">
        <div>
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Ready to Supercharge Your Website?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-500">
            Join thousands of satisfied customers who have transformed their
            online presence with our traffic tracking API.
          </p>
        </div>
        <div className="flex justify-center">
          <ShinyButton
            href="/sign-in"
            className="h-12 w-40"
            icon={<ArrowRight />}
          >
            Get started
          </ShinyButton>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
