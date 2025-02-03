"use client";

import { Button } from "./ui/button";
import { HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSigOutClick = () => signOut();
  const handleSigInClcik = () => signIn();

  const buttons = [
    {
      label: "Início",
      href: "/",
      icon: <HomeIcon size={16} />,
    },
  ];

  return (
    <div className="flex h-full items-center justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="bg-transparentflex items-center gap-4 border-none"
          >
            <p>{data?.user?.name}</p>
            <Avatar>
              <AvatarImage src={data?.user?.image as string | undefined} />
              <AvatarFallback>
                {data?.user?.name?.split(" ")[0][0]}
                {data?.user?.name?.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(" ")[0][0]}
                      {data?.user?.name?.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá, Faça seu login</h2>
                <Button onClick={handleSigInClcik} size="icon">
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
                asChild
              >
                <Link href={button.href}>
                  {button.icon}
                  <span className="block">{button.label}</span>
                </Link>
              </Button>
            ))}
          </div>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-full text-sm font-normal"
              onClick={handleSigOutClick}
            >
              <LogOutIcon size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
