import "@/assets/styles/globals.css"

export const metadata = {
  title: "Property Pulse",
  description: "Discover Your Dream Home with Property Pulse - Your Ultimate Real Estate Companion",
  keywords: "real estate, property listings, home search, real estate market, property values, neighborhood insights, real estate trends, property investment, home buying tips, real estate news",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
