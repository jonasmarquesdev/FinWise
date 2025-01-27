"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserMenu = () => {
  const { data } = useSession();
  const handleSigOutClick = () => signOut();
  return (
    <>
      <div className="flex items-center gap-4">
        <p>{data?.user?.name}</p>
        <Avatar onClick={() => handleSigOutClick()}>
          <AvatarImage src={data?.user?.image as string | undefined} />
          <AvatarFallback>
            {data?.user?.name?.split(" ")[0][0]}
            {data?.user?.name?.split(" ")[1][0]}
          </AvatarFallback>
        </Avatar>
      </div>
    </>
  );
};

export default UserMenu;
