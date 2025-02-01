import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import { endOfMonth, startOfMonth } from "date-fns";
import { getServerSession } from "next-auth";

export const getCurrentMonthTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    throw new Error("Unauthorized");
  }
  return db.transaction.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};
