import { Toaster } from "@/components/ui/sonner";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Scheduly",
  description: "Schedule your next meeting with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
