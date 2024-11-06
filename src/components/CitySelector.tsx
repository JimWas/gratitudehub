import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const cities = [
  "Houston, Texas",
  "New York City, New York",
  "Los Angeles, California",
  "Chicago, Illinois",
  "Phoenix, Arizona",
];

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  return (
    <div className="city-select">
      <Select defaultValue={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-[280px] mx-auto">
          <SelectValue placeholder="Select your city" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CitySelector;