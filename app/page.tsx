"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  if (status === "unauthenticated") {
    redirect("/login");
  }
  return (
    <div className="flex w-screen items-center justify-center">
      <h1 className="p-5 text-red-500">Home Page</h1>
    </div>
  );
}
