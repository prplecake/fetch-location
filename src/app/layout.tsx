import {Metadata} from "next";
import Footer from "../components/footer";
import Fathom from "../components/fathom";
import "./global.scss";
import React from "react";

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: "fetchLocation",
  description: "fetches a location"
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang={"en"}>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <Fathom />
    {children}
    <Footer/>
    </body>
    </html>
  );
}