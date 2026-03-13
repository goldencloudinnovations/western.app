import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full shrink-0">
      <div className="container mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left md:px-6">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Western.App. All rights reserved.</p>
        <nav className="flex items-center justify-center gap-4 sm:justify-end sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
