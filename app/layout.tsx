import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'fetchLocation',
  description: 'fetches a location'
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang={'en'}>
    <body>
    {children}
    </body>
    </html>
  )
}