import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";
import RootLayoutClient from "./layout-client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://www.noscultura.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Nós Cultural",
    default: "Nós Cultural — Artistas e Cultura de Franca, SP",
  },
  description:
    "Plataforma gratuita que conecta artistas, coletivos e espaços culturais de Franca, SP.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Nós Cultural",
    title: "Nós Cultural — Artistas e Cultura de Franca, SP",
    description:
      "Plataforma gratuita que conecta artistas, coletivos e espaços culturais de Franca, SP.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nós Cultural — Plataforma Cultural de Franca, SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nós Cultural — Artistas e Cultura de Franca, SP",
    description:
      "Plataforma gratuita que conecta artistas, coletivos e espaços culturais de Franca, SP.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <AuthProvider>
          <RootLayoutClient>
            {children}
          </RootLayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}