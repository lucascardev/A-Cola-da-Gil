import type { Metadata, Viewport } from 'next';
import { GoogleAnalytics } from '@/components/google-analytics';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ff28b4',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'A cola da Gil - A força da mulher',
  description: 'A cola da Gil - A força da mulher. Consulta rápida dos números para Presidente, Governador, Senadores e Deputados, com opção de personalização, impressão para a urna e funcionamento offline.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cola da Gil',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'A cola da Gil - A força da mulher',
    description: 'Consulte os números de voto da Gil para Presidente, Governador, Senadores e Deputados, ou crie a sua cola personalizada!',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A cola da Gil - A força da mulher',
    description: 'Consulte os números de voto da Gil para Presidente, Governador, Senadores e Deputados.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

