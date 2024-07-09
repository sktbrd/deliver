import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gnars Dao Proposals Updates",
  description: "Show us what you did with the money we gave you!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description || ''} />
      </head>
      <body className={inter.className}>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
