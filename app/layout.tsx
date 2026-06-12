import "@/assets/styles/globals.css"
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import { ToastContainer } from "react-toastify";

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
    <AuthProvider>
      <html lang="en">
        <body className="">
          <Navbar />
          <main className="min-h-[calc(100vh-240px)]">{children}</main>
          <Footer />

          <Script src="/libs/dfp-sdk.min.js" strategy="lazyOnload" />
          <ToastContainer />
          {/* <Script id="dfp-init" strategy="lazyOnload">
            {`
              (function checkDFP() {
                if (typeof DFP !== 'undefined') {
                  const sdk = new DFP.WebTelemetrySDK();
                  console.log(sdk)
                  sdk.collectAndSend().then(r => console.log('✅ Sent:', r));
                } else {
                  setTimeout(checkDFP, 100); // retry
                }
              })();
            `}
          </Script> */}
        </body>
      </html>
    </AuthProvider>
  );
}
