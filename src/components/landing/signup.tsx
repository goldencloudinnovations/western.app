import { SignUpForm } from './signup-form';
import { siteText } from '@/content/site-text';

export function SignUp() {
  return (
    <section id="signup" className="w-full border-b border-border/60 bg-secondary/35 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
        <div className="mx-auto max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{siteText.signup.title}</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            {siteText.signup.description}
          </p>
        </div>
        <div className="mt-6">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
