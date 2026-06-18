import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const editorial = Instrument_Serif({
  variable: "--font-editorial",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const SITE = "https://blinkmycareer.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "BlinkMyCareer — Don't write a resume. Just talk.",
    template: "%s · BlinkMyCareer",
  },
  description:
    "You don't write a resume and then prep for interviews. You have one honest conversation — and walk away hireable on paper and ready in the room. Talk, and it builds.",
  keywords: [
    "AI resume builder",
    "conversation resume",
    "interview preparation",
    "voice resume",
    "career coach AI",
    "ATS resume",
  ],
  openGraph: {
    title: "BlinkMyCareer — Don't write a resume. Just talk.",
    description:
      "One honest conversation. Your resume builds itself live, then it interviews you on your own stories. Paper-ready and Room-ready, together.",
    url: SITE,
    siteName: "BlinkMyCareer",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BlinkMyCareer — Don't write a resume. Just talk.",
    description:
      "One conversation builds your resume live and rehearses you for the room.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${editorial.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
