import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Workflow } from 'lucide-react';
import { siteText } from '@/content/site-text';
import { preventWidow } from '@/lib/prevent-widow';

const benefits = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: siteText.benefits.items[0].title,
    description: preventWidow(siteText.benefits.items[0].description)
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: siteText.benefits.items[1].title,
    description: preventWidow(siteText.benefits.items[1].description)
  },
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: siteText.benefits.items[2].title,
    description: preventWidow(siteText.benefits.items[2].description)
  }
]

export function Benefits() {
  const benefitsDescription = preventWidow(siteText.benefits.description);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{siteText.benefits.title}</h2>
          <p className="mx-auto max-w-[760px] text-balance text-lg text-muted-foreground sm:text-xl md:text-2xl">
            {benefitsDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6">
              <CardHeader className="items-center p-0 mb-4">
                {benefit.icon}
                <CardTitle className="mt-4">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-balance text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
