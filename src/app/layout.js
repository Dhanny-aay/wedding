import "./globals.css";
import QueryProvider from "./utils/queryProvider";
import { Alex_Brush, Didact_Gothic } from "next/font/google";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
});

const didactGothic = Didact_Gothic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-didact-gothic",
});

export const metadata = {
  title: "Hikmat & Noah",
  description:
    "And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy. Indeed in that are signs for a people who reflect. – Ar-Rum (30:21)",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${alexBrush.variable} ${didactGothic.variable}`}
    >
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
