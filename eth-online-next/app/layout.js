import { AccountAbstractionProvider } from "@/Context/accountAbstractionContext";
import "./globals.css";
import { Inter } from "next/font/google";
import { NavBar } from "./components";
import { AboutUs } from "./views";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AccountAbstractionProvider>
          <NavBar />
          <AboutUs />
          {children}
        </AccountAbstractionProvider>
      </body>
    </html>
  );
}
