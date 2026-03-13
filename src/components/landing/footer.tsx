import Link from "next/link";
import { siteText } from "@/content/site-text";

export function Footer() {
  return (
    <footer className="w-full shrink-0">
      <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-6">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteText.brand.legalName}. {siteText.footer.rightsReserved}
        </p>
        <nav className="flex items-center justify-center gap-4 sm:justify-end sm:gap-6">
          <Link href={siteText.links.terms} className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {siteText.footer.termsLabel}
          </Link>
          <Link href={siteText.links.privacy} className="text-xs hover:underline underline-offset-4" prefetch={false}>
            {siteText.footer.privacyLabel}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
