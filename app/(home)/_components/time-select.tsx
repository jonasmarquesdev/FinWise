"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { cn } from "@/app/_lib/utils";

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
  { value: "2027", label: "2027" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");
  const year = searchParams.get("year");
  const [isPending, startTransition] = useTransition();

  const handleMonthChange = (newMonth: string) => {
    if (month === "0" && newMonth !== "0") {
      const currentYear = new Date().getFullYear();
      startTransition(() => {
        push(`/?month=${newMonth}&year=${currentYear}`);
      });
      return;
    }
    startTransition(() => {
      push(`/?month=${newMonth}&year=${year}`);
    });
  };
  const handleYearChange = (year: string) => {
    if (year === "0") {
      startTransition(() => {
        push(`/?month=0&year=${year}`);
      });
      return;
    }
    startTransition(() => {
      push(`/?month=${month}&year=${year}`);
    });
  };
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Select
          onValueChange={(value) => handleMonthChange(value)}
          value={month ?? ""}
        >
          <SelectTrigger
            className={cn(
              "w-[150px] rounded-full focus:ring-0 focus:ring-offset-0",
              isPending && "text-primary",
            )}
          >
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
        {isPending && (
          <Skeleton className="absolute inset-0 rounded-full opacity-70" />
        )}
      </div>

      <div className="relative">
        <Select
          onValueChange={(value) => handleYearChange(value)}
          value={year ?? ""}
        >
          <SelectTrigger
            className={cn(
              "w-[150px] rounded-full focus:ring-0 focus:ring-offset-0",
              isPending && "text-primary",
            )}
          >
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
        {isPending && (
          <Skeleton className="absolute inset-0 rounded-full opacity-70" />
        )}
      </div>
    </div>
  );
};

export default TimeSelect;
