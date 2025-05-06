import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/shared/Layout";
import GlobalProvider from "@/components/shared/Provider";


export const metadata: Metadata = {
    title: "Freddie Console",
    description: "The console application for Freddie.",
};
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body className="bg-white">
                <GlobalProvider>
                    <Layout
                        children={children}
                    />
                </GlobalProvider>
            </body>
        </html>
    );
}
