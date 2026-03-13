import { SignUpForm } from './signup-form';

export function SignUp() {
  return (
    <section id="signup" className="w-full border-b border-border/60 bg-secondary/35 py-16 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 text-center md:px-6">
        <div className="mx-auto max-w-2xl space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Be the First to Know</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Sign up for our newsletter to get the latest news and a notification when we launch.
          </p>
        </div>
        <div className="mt-6">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
}
