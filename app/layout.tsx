import {Metadata} from "next";
import Footer from "../components/layout/footer";
import Fathom from "./components/fathom";

export const metadata: Metadata = {
  title: "fetchLocation",
  description: "fetches a location"
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  let assetPathPrefix= `/${process.env.REPO_NAME}`;
  if (process.env.NODE_ENV.toLowerCase() == "development") {
    assetPathPrefix = "";
  }
  return (
    <html lang={"en"}>
    <head>
      <link rel={"stylesheet"} href={assetPathPrefix+"/styles/main.css"} />
    </head>
    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <Fathom />
    {children}
    <Footer/>
    </body>
    </html>
  )
}