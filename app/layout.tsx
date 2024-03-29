import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/nav/Navbar";
import SessionProvider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL(process.env.SITE_URL!),
	title: { template: "%s || DailyBlog", default: "DailyBlog" },
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="max-w-7xl mx-auto px-10 pt-6 pb-10 space-y-10">
						<Navbar />
						{children}
					</main>

					<Toaster />
				</ThemeProvider>
				<SessionProvider />
			</body>
		</html>
	);
}
