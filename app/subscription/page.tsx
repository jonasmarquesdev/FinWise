import { getServerSession } from "next-auth";
import NavBar from "../_components/navbar";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/login");
  }
  return (
    <>
      <NavBar />
      <h1>Subscription Page</h1>
    </>
  );
};

export default SubscriptionPage;
