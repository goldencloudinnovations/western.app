import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { siteText } from '@/content/site-text';
import { preventWidow } from '@/lib/prevent-widow';

export function Teaser() {
  const teaserImage = PlaceHolderImages.find(img => img.id === 'app-teaser');
  const teaserDescription = preventWidow(siteText.teaser.description);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{siteText.teaser.title}</h2>
          <p className="mx-auto max-w-[760px] text-balance text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {teaserDescription}
          </p>
        </div>
        <div className="mx-auto max-w-5xl mt-12">
          <Card className="overflow-hidden shadow-2xl dark:shadow-primary/10">
            <CardContent className="p-0">
              {teaserImage && (
                <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={teaserImage.imageUrl}
                      alt={teaserImage.description}
                      fill
                      className="object-cover blur-sm brightness-90"
                      data-ai-hint={teaserImage.imageHint}
                    />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
