"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "0", label: "Tudo" },
  { value: "1", label: "Janeiro" },
  { value: "2", label: "Fevereiro" },
  { value: "3", label: "Março" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Maio" },
  { value: "6", label: "Junho" },
  { value: "7", label: "Julho" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const YEAR_OPTIONS = [
  { value: "0", label: "Tudo" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");

  const handleMonthChange = (month: string) => {
    push(`/?month=${month}&year=${year}`);
  };
  const handleYearChange = (year: string) => {
    push(`/?month=${month}&year=${year}`);
  };
  return (
    <div className="flex gap-2">
      <Select
        onValueChange={(value) => handleMonthChange(value)}
        defaultValue={month ?? ""}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Mês" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleYearChange(value)}
        defaultValue={year ?? ""}
      >
        <SelectTrigger className="w-[150px] rounded-full">
          <SelectValue placeholder="Ano" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TimeSelect;
