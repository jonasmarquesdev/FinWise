import { getServerSession } from "next-auth";
import { getCurrentMonthTransactions } from "../get-current-month-transactions";
import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/_lib/auth";

export const canUserAddTransaction = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { subscriptionPlan: true },
  });
  if (user?.subscriptionPlan) {
    return true;
  }
  const currentMonthTransactions = await getCurrentMonthTransactions();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
