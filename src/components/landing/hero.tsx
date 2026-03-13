import { siteText } from '@/content/site-text';

export function Hero() {
  return (
    <section className="flex w-full flex-1 items-center border-b border-border/60 py-20 md:py-28 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {siteText.hero.title}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {siteText.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}
