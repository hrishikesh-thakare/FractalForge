import { Hero } from "~/components/landing/hero";
import { PrinciplesSection } from "~/components/landing/principles-section";
import { CulturalSignificance } from "~/components/landing/cultural-significance";
import { KolamGallery } from "~/components/landing/kolam-gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="asymmetric-grid max-w-7xl mx-auto px-4 py-16">
        <div>
          <PrinciplesSection />
        </div>
      </div>
      <div>
        <CulturalSignificance />
      </div>
      <KolamGallery />
    </>
  );
}
