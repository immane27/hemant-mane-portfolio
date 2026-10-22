import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hemant Mane — Data Engineering & Lakehouse Architecture",
  description:
    "The portfolio of Hemant Mane, a data engineering team lead in the Mumbai Metropolitan Region specializing in Trino, lakehouse architecture, and modern data platforms.",
  openGraph: {
    title: "Hemant Mane — Data Engineering & Lakehouse Architecture",
    description:
      "Data engineering team lead. Trino and lakehouse architecture. Making big data feel simple.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
