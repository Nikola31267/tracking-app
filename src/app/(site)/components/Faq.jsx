"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFAQSearch } from "@/hooks/useFAQSearch";
import faqData from "@/lib/data/faq";

export default function FAQSection() {
  const { searchTerm, setSearchTerm, filteredItems } = useFAQSearch(faqData);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  const displayedItems = selectedCategory
    ? filteredItems.filter((item) => item.category === selectedCategory)
    : filteredItems;

  return (
    <div id="faq" className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer ${
              selectedCategory === category
                ? "bg-purple-500 text-white hover:bg-purple-500"
                : " text-gray-900"
            }`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            {category}
          </Badge>
        ))}
      </div>
      <AnimatePresence>
        {displayedItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {displayedItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer
                      .split("contact-pixeltrack@builderbee.pro")
                      .map((part, index) => (
                        <React.Fragment key={index}>
                          {part}
                          {index === 1 && (
                            <strong>contact-pixeltrack@builderbee.pro</strong>
                          )}
                        </React.Fragment>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500"
          >
            No matching questions found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
