import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { SignUp } from "@/components/landing/signup";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <SignUp />
      </main>
      <Footer />
    </div>
  );
}
