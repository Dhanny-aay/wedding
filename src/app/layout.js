import "./globals.css";
import QueryProvider from "./utils/queryProvider";

export const metadata = {
  title: "Hikmat & Noah",
  description:
    "And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect. – Ar-Rum (30:21)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload fonts */}
        <link
          rel="preload"
          href="/fonts/AlexBrush-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/DidactGothic-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
