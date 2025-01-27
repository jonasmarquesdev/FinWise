"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { getServerSession } from "next-auth";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface upsertTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: upsertTransactionParams) => {
  upsertTransactionSchema.parse(params);
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }
  await db.transaction.upsert({
    update: { ...params, userId: session?.user.id },
    create: { ...params, userId: session?.user.id },
    where: {
      id: params.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
