"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent } from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import { TransactionPercentagePerType } from "@/app/_data/get-dashboard/types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PercentageItem from "./percentage-item";

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const TransactionsPieChart = ({
  investmentsTotal,
  depositsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: chartConfig[TransactionType.DEPOSIT].color,
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: chartConfig[TransactionType.EXPENSE].color,
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: chartConfig[TransactionType.INVESTMENT].color,
    },
  ];

  const hasData = chartData.some((item) => item.amount > 0);
  const defaultData = hasData
    ? chartData
    : [
        {
          type: "DEFAULT",
          amount: 1,
          fill: "#D3D3D3",
        },
      ];

  return (
    <Card className="flex flex-col sm:p-0 md:min-w-[220px] md:p-6">
      <CardContent className="flex-1 md:py-6 lg:p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={defaultData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3 lg:px-6">
          <PercentageItem
            title={chartConfig[TransactionType.DEPOSIT].label}
            value={typesPercentage[TransactionType.DEPOSIT] || 0}
            icon={<TrendingUpIcon size={16} className="text-primary" />}
          />
          <PercentageItem
            title={chartConfig[TransactionType.EXPENSE].label}
            value={typesPercentage[TransactionType.EXPENSE] || 0}
            icon={<TrendingDownIcon size={16} className="text-danger" />}
          />
          <PercentageItem
            title={chartConfig[TransactionType.INVESTMENT].label}
            value={typesPercentage[TransactionType.INVESTMENT] || 0}
            icon={<PiggyBankIcon size={16} className="text-white" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsPieChart;
