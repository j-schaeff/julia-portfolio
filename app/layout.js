import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const a2zFaucet = localFont({
  src: "../public/fonts/A2Z-Faucet-VAR.ttf",
    variable: "--font-a2z-faucet",
  weight: "100 900",
});

export const metadata = {
  title: "Julia Schaeffler | Freelance Designer",
  description: "Portfolio website for Julia Schäffler, freelance designer.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${a2zFaucet.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-50 text-neutral-900">
        {children}
        <Script id="netlify-identity-login" strategy="afterInteractive">{`
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
`}</Script>
        <Script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
