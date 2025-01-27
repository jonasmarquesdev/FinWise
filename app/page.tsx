import { redirect } from "next/navigation";
import NavBar from "./_components/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/login");
  }
  return (
    <>
      <NavBar />
      <div className="flex w-screen items-center justify-center">
        <h1 className="p-5 text-red-500">Home Page</h1>
      </div>
    </>
  );
};

export default Home;
