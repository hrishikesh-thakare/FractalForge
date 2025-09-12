import { Hero } from "~/components/landing/hero";
import { PrinciplesSection } from "~/components/landing/principles-section";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="asymmetric-grid max-w-7xl mx-auto px-4 py-16">
        <div>
          <PrinciplesSection />
        </div>
      </div>
    </>
  );
}
