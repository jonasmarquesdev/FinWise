"use client";

import Image from "next/image";
import UserMenu from "./user-menu";
import { NavigationMenuDemo } from "./nav-menu";

const NavBar = () => {
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="FinWise" width={173} height={39} />
        <NavigationMenuDemo />
      </div>
      <UserMenu />
    </nav>
  );
};

export default NavBar;
