import {Metadata} from "next";
import Footer from "../components/layout/footer";

export const metadata: Metadata = {
  title: 'fetchLocation',
  description: 'fetches a location'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  let assetPathPrefix= `/${process.env.REPO_NAME}`;
  if (process.env.NODE_ENV.toLowerCase() == 'development') {
    assetPathPrefix = '';
  }
  return (
    <html lang={'en'}>
    <head>
      <link rel={'stylesheet'} href={assetPathPrefix+'/styles/main.css'} />
    </head>
    <body>
    {children}
    <Footer/>
    </body>
    </html>
  )
}