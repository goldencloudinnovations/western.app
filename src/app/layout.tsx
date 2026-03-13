import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { themeConfig } from '@/config/theme';

export const metadata: Metadata = {
  title: 'Western.App Showcase',
  description: 'A promotional landing page for Western.App',
};

const rootThemeVars = {
  '--main-color-light': themeConfig.light.mainColorHsl,
  '--main-color-dark': themeConfig.dark.mainColorHsl,
} as CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning style={rootThemeVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
