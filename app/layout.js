import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sudhanshu Ghosh | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Exo+2:ital,wght@0,100..900;1,100..900&family=Goldman:wght@400;700&family=Hind+Siliguri:wght@300;400;500;600;700&family=Oswald:wght@200..700&family=Pacifico&family=Roboto:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="relative text-gray-900 bg-white">
        {/* <Navbar /> */}
        {children}</body>
    </html>
  );
}
