import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className=" px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Buy one time and use forever. No hidden fees, no surprises.
          </p>
        </div>
        <div className="mx-auto max-w-sm mt-8">
          <Card>
            <CardHeader>
              <CardTitle>PixelTrack</CardTitle>
              <CardDescription>Perfect for growing businesses</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <span className="text-4xl font-extrabold tracking-tight font-dm-sans">
                $29
              </span>
              <ul className="mt-4 space-y-2 text-left">
                {[
                  "Unlimited projects",
                  "Priority support",
                  "Advanced analytics",
                  "Custom integrations",
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Get Started</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
