import { siteText } from '@/content/site-text';
import { preventWidow } from '@/lib/prevent-widow';

export function Hero() {
  const heroTitle = preventWidow(siteText.hero.title);
  const heroDescription = preventWidow(siteText.hero.description);

  return (
    <section className="flex w-full flex-1 items-center border-b border-border/60 py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h1 className="max-w-[16ch] text-balance text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {heroTitle}
          </h1>
          <p className="mx-auto max-w-[820px] text-balance text-xl text-muted-foreground sm:text-2xl md:text-3xl">
            {heroDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
