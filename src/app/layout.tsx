import type {Metadata} from 'next';
import type {CSSProperties} from 'react';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ShaderBackground } from '@/components/shader-background';
import { themeConfig } from '@/config/theme';
import { siteText } from '@/content/site-text';

export const metadata: Metadata = {
  title: siteText.metadata.title,
  description: siteText.metadata.description,
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
      <body className="relative min-h-dvh isolate bg-background font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ShaderBackground />
          <div className="relative z-10 flex min-h-dvh flex-col">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
