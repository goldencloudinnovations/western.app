import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, ShieldCheck, Workflow } from 'lucide-react';

const benefits = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Blazing Fast",
    description: "Our platform is optimized for speed, ensuring a snappy and responsive experience at all times."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Secure by Design",
    description: "With state-of-the-art security, your data is always protected and private. Trust is built-in."
  },
  {
    icon: <Workflow className="h-8 w-8 text-primary" />,
    title: "Seamless Integration",
    description: "Connect with your favorite tools and services effortlessly. Our ecosystem is designed to be extensible."
  }
]

export function Benefits() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why you'll love it</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Discover the key features that will revolutionize your workflow.
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
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
