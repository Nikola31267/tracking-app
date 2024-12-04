import countryCodes from "@/utils/countryCodes";

export const codeToCountryName = Object.entries(countryCodes).reduce(
  (acc, [name, code]) => {
    acc[code] = name;
    return acc;
  },
  {}
);
