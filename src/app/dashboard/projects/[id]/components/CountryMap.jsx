"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const CountryMap = ({ visitsData }) => {
  const [countryData, setCountryData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownContent, setDropdownContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

  useEffect(() => {
    const countryUsage = visitsData.reduce((acc, visit) => {
      acc[visit.country] = (acc[visit.country] || 0) + 1;
      return acc;
    }, {});
    setCountryData(
      Object.entries(countryUsage).map(([country, count]) => ({
        country,
        count,
      }))
    );
  }, [visitsData]);

  const maxCount = Math.max(...countryData.map((d) => d.count), 1);
  const getColor = (count) => {
    const ratio = count / maxCount;
    const startColor = [224, 247, 250];
    const endColor = [0, 96, 100];
    const color = startColor.map((start, index) =>
      Math.round(start + ratio * (endColor[index] - start))
    );
    return `rgb(${color.join(",")})`;
  };

  const findCountryCount = (name) => {
    const country = countryData.find((c) => c.country === name);
    return country ? country.count : 0;
  };

  const handleCountryClick = (countryName, visitCount) => {
    if (selectedCountry === countryName && dropdownOpen) {
      setDropdownOpen(false);
      setSelectedCountry(null);
    } else {
      setDropdownContent(`${countryName}: ${visitCount}`);
      setDropdownOpen(true);
      setSelectedCountry(countryName);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Country Views</CardTitle>
        <CardDescription>Distribution of views by country</CardDescription>
      </CardHeader>
      <CardContent style={{ overflow: "visible" }}>
        <div className="relative">
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const visitCount = findCountryCount(countryName);
                  return (
                    <DropdownMenu
                      key={geo.rsmKey}
                      open={dropdownOpen && selectedCountry === countryName}
                      onOpenChange={(isOpen) => {
                        setDropdownOpen(isOpen);
                        if (!isOpen) {
                          setSelectedCountry(null);
                        }
                      }}
                    >
                      <DropdownMenuTrigger asChild>
                        <Geography
                          geography={geo}
                          onClick={() =>
                            handleCountryClick(countryName, visitCount)
                          }
                          style={{
                            default: {
                              fill:
                                dropdownOpen && selectedCountry === countryName
                                  ? "#F53"
                                  : visitCount > 0
                                  ? getColor(visitCount)
                                  : "#EEE",
                              outline: "none",
                            },
                            hover: {
                              fill: "#F53",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: "#E42",
                              outline: "none",
                            },
                          }}
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>{dropdownContent}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </CardContent>
    </Card>
  );
};

export default CountryMap;
