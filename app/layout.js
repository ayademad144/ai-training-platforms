import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  alternates: {
    canonical: "/",
  },
  applicationName: siteConfig.name,
  authors: [
    {
      name: siteConfig.author,
      url: new URL("/", siteConfig.url),
    },
  ],
  category: "technology",
  creator: siteConfig.author,
  description: siteConfig.description,
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        type: "image/svg+xml",
        url: "/brand/ai-training-models.svg",
      },
    ],
    shortcut: "/brand/ai-training-models.svg",
  },
  keywords: siteConfig.keywords,
  manifest: "/manifest.webmanifest",
  metadataBase: siteConfig.url,
  openGraph: {
    description: siteConfig.description,
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.title,
    type: "website",
    url: "/",
  },
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
    description: siteConfig.description,
    title: siteConfig.title,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}