import type { Metadata } from "next";
import { siteText } from "@/content/site-text";

const termsText = siteText.legal.terms;

export const metadata: Metadata = {
  title: `${termsText.title} | ${siteText.brand.legalName}`,
  description: termsText.intro,
};

export default function TermsPage() {
  return (
    <main className="min-h-dvh bg-background">
      <section className="border-b border-border/60 py-16 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{termsText.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {siteText.legal.lastUpdatedLabel}: {siteText.legal.lastUpdated}
          </p>
          <p className="mt-6 text-muted-foreground">{termsText.intro}</p>
        </div>
      </section>
      <section className="py-10 md:py-12">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="space-y-8">
            {termsText.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                <p className="mt-2 text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
