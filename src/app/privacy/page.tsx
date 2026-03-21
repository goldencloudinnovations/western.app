import type { Metadata } from "next";
import { siteText } from "@/content/site-text";
import { preventWidow } from "@/lib/prevent-widow";

const privacyText = siteText.legal.privacy;

export const metadata: Metadata = {
  title: `${privacyText.title} | ${siteText.brand.legalName}`,
  // description: privacyText.intro,
};

export default function PrivacyPage() {
  const lastUpdatedText = preventWidow(`${siteText.legal.lastUpdatedLabel}: ${siteText.legal.lastUpdated}`);

  return (
    <main className="min-h-dvh bg-transparent">
      <section className="border-b border-border/60 bg-background/45 py-16 backdrop-blur-sm md:py-20">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{privacyText.title}</h1>
          <p className="mt-2 text-balance text-sm text-muted-foreground">{lastUpdatedText}</p>
          {/* <p className="mt-6 text-muted-foreground">{privacyText.intro}</p> */}
        </div>
      </section>
      <section className="bg-background/20 py-10 backdrop-blur-[2px] md:py-12">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <div className="space-y-8">
            {privacyText.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-xl font-semibold">{section.heading}</h2>
                <p className="mt-2 text-balance text-muted-foreground">{preventWidow(section.body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
