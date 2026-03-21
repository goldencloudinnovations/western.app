import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';
import { siteText } from '@/content/site-text';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href={siteText.links.home} className="flex items-center justify-center" prefetch={false}>
          <svg
            viewBox="36 60 253 156"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="h-7 w-7 shrink-0 text-[hsl(var(--main-color-light))] dark:text-[hsl(var(--main-color-dark))]"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
              <path d="M80 80 C60 120 40 170 60 210" />
              <circle cx="80" cy="70" r="10" />
              <path d="M80 74 C80 110 130 130 115 180" />
              <path d="M115 180 Q162.5 160 210 180" />
              <path d="M245 74 C245 110 195 130 210 180" />
              <circle cx="245" cy="70" r="10" />
              <path d="M245 80 C265 120 285 170 265 210" />
            </g>
          </svg>
          <span className="sr-only">{siteText.brand.srOnlyName}</span>
          <span className="ml-2 text-lg font-bold">{siteText.brand.displayName}</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
