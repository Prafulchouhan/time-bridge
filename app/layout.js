import Header from "@/components/header";
import "./globals.css";
import {Inter} from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import CreateEventDrawer from "@/components/create-events";

export const metadata = {
  title: "Time Bridge",
  description: "Meeting Scheduling App",
};

const inter = Inter({subsets: ["latin"]})

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={inter.className}
        >
        {/* Header */}
        <Header></Header>
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
          {children}
        </main>
        <footer className="bg-green-200 py-12">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>this is a meet managment application</p>
          </div>
        </footer>
          <CreateEventDrawer/>
      </body>
    </html>
      </ClerkProvider>
  );
}
