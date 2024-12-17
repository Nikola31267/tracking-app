"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useState, useEffect, useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import countryCodes from "@/lib/data/countryCodes.json";

const CountryMap = ({ visitsData }) => {
  const [countryData, setCountryData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownContent, setDropdownContent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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
      const getCountryCode = (countryName) => {
        const country = countryCodes.find((c) => c.name === countryName);
        return country ? country.code : null;
      };

      const countryCode = getCountryCode(countryName);
      const flagUrl = countryCode
        ? `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`
        : null;
      setDropdownContent(
        <div className="flex items-center">
          {flagUrl && (
            <Image
              src={flagUrl}
              alt={countryName}
              width={20}
              height={15}
              style={{ marginRight: 5 }}
            />
          )}
          {`${countryName}: ${visitCount}`}
        </div>
      );
      setDropdownOpen(true);
      setSelectedCountry(countryName);
    }
  };

  const getCountryFlagUrl = (countryName) => {
    const country = countryCodes.find((c) => c.name === countryName);
    return country
      ? `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country.code}.svg`
      : null;
  };

  const updateTooltipPosition = useCallback(
    (event) => {
      const tooltipWidth = 150;
      const tooltipHeight = 50;
      const offsetX = -tooltipWidth / 2;
      const offsetY = -tooltipHeight - 15;
      const x = Math.min(
        Math.max(event.clientX + offsetX, 0),
        window.innerWidth - tooltipWidth
      );
      const y = Math.min(
        Math.max(event.clientY + offsetY, 0),
        window.innerHeight - tooltipHeight
      );
      if (x !== tooltipPosition.x || y !== tooltipPosition.y) {
        setTooltipPosition({ x, y });
      }
    },
    [tooltipPosition]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Country Views</CardTitle>
        <CardDescription>Distribution of views by country</CardDescription>
      </CardHeader>
      <CardContent style={{ overflow: "visible" }}>
        <div className="relative">
          {hoveredCountry && (
            <div
              className="tooltip"
              style={{
                position: "absolute",
                top: tooltipPosition.y,
                left: tooltipPosition.x,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "#fff",
                padding: "5px 10px",
                borderRadius: "5px",
                pointerEvents: "none",
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="flex items-center">
                {getCountryFlagUrl(hoveredCountry) && (
                  <Image
                    src={getCountryFlagUrl(hoveredCountry)}
                    alt={hoveredCountry}
                    width={20}
                    height={15}
                    style={{ marginRight: 5 }}
                  />
                )}
                {`${hoveredCountry}: ${findCountryCount(
                  hoveredCountry
                )} visits`}
              </div>
            </div>
          )}
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
                          onMouseEnter={(event) => {
                            setHoveredCountry(countryName);
                            updateTooltipPosition(event);
                          }}
                          onMouseMove={(event) => {
                            updateTooltipPosition(event);
                          }}
                          onMouseLeave={() => setHoveredCountry(null)}
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
