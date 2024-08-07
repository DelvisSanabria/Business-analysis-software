import "./globals.css";
import { montserrat } from "./ui/fonts";
import { ThemeProvider } from "./ThemeContext";
import { SessionProvider } from "../Context/Session";

export const metadata = {
  title: "Wuau Marketing",
  description: "Smart marketing solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider>
        <body className={`${montserrat.className} antialiased`}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
