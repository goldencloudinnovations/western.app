import Link from 'next/link';
import { Mountain } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { siteText } from '@/content/site-text';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href={siteText.links.home} className="flex items-center justify-center" prefetch={false}>
          <Mountain className="h-6 w-6 text-primary" />
          <span className="sr-only">{siteText.brand.srOnlyName}</span>
          <span className="ml-2 text-lg font-bold">{siteText.brand.displayName}</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
