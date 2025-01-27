import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import NavBar from "../_components/navbar";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const TransactionsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between p-6">
          <h1 className="text-2xl font-bold">Transações</h1>
          <AddTransactionButton />
        </div>
        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default TransactionsPage;
