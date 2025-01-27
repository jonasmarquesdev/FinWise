"use server";

import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { getServerSession } from "next-auth";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface addTransactionParams {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const addTransaction = async (params: addTransactionParams) => {
  addTransactionSchema.parse(params);
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }
  await db.transaction.create({
    data: { ...params, userId: session?.user.id },
  });
  revalidatePath("/transactions");
};
