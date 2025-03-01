import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

const isDevelopment = process.env.APP_URL === "http://localhost:3000";

export const metadata: Metadata = {
  title: isDevelopment ? "FinWise - Development" : "FinWise",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} dark antialiased`}>
        <AuthProvider>
          <div className="flex h-full flex-col overflow-hidden">{children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
