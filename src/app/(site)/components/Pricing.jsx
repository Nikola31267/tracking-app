"use client";

import { Check, Crown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export const plans = [
  {
    type: "Monthly",
    price: "$20",
    duration: "/month",
    features: [
      "Unlimited websites",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    link: "https://buy.stripe.com/test_3cs5lQ3C5byM6cw7ss",
    priceId: "price_1QU8QaK7FOhIMh40NVnUaKDo",
  },
  {
    type: "Yearly",
    price: "$200",
    originalPrice: "$240",
    duration: "/year",
    features: [
      "Unlimited websites",
      "Priority support",
      "Advanced analytics",
      "Custom integrations",
    ],
    link: "https://buy.stripe.com/test_8wMcOi3C50U81Wg4gh",
    priceId: "price_1QU8UxK7FOhIMh40XUkkz8FB",
  },
];

export default function Pricing({ user }) {
  const [isYearly, setIsYearly] = useState(false);

  const togglePricing = () => {
    setIsYearly(!isYearly);
  };

  const currentPlan = isYearly ? plans[1] : plans[0];

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            No hidden fees, no surprises.
          </p>
        </div>
        <div className="mx-auto max-w-lg mt-8">
          <Card>
            <div className="flex justify-between items-center gap-2 p-6 mb-10">
              <CardTitle className="text-[1.35rem] font-bold">
                Pixel Track
              </CardTitle>
              <div className="flex items-center gap-3 bg-purple-100 rounded-full py-1 px-2">
                <Switch
                  checked={isYearly}
                  onCheckedChange={togglePricing}
                  className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-purple-300"
                />
                <p className="uppercase text-xs font-bold">Yearly</p>
              </div>
            </div>
            <CardContent className="flex flex-col items-start text-left gap-2 mt-2">
              <span className="text-5xl font-bold tracking-tight">
                {isYearly && (
                  <span className="line-through text-lg font-normal text-gray-500">
                    {currentPlan.originalPrice}
                  </span>
                )}{" "}
                {currentPlan.price}
                <span className="text-lg">{currentPlan.duration}</span>
              </span>
              <ul className="mt-4 space-y-2 text-left">
                {currentPlan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                key={isYearly}
                className="w-full"
              >
                <Button
                  className="w-full group bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200"
                  asChild
                >
                  <Link
                    href={
                      currentPlan.link +
                      (user ? "?prefilled_email=" + user.email : "")
                    }
                    target="_blank"
                    className="flex items-center justify-center gap-2"
                  >
                    {" "}
                    <Crown className="transform rotate-0 group-hover:-rotate-[6.5deg] group-hover:scale-[1.18] transition-transform duration-200" />
                    Join Pixel Track
                  </Link>
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
