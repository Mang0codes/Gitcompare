import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
   weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Gitcompare | Compare GitHub Repositories Side by Side",
  description:
    "Easily compare GitHub repositories side by side. Analyze stars, forks, issues, and contributors to find the best project to contribute to.",
    icons: {
    icon: "/imgs/star.png",
  },
  keywords: ["GitHub compare", "open source", "repository analysis", "contribute GitHub"],
  openGraph: {
    title: "Gitcompare | GitHub Repo Comparison Tool",
    description:
      "Compare GitHub repositories side by side and discover the best one to contribute to.",
    url: "https://gitcompare-theta.vercel.app/",
    siteName: "Gitcompare",
    images: [
      {
        url: "/imgs/gitstar.png",
        width: 1200,
        height: 630,
        alt: "Gitcompare preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
