import { Hero } from "@/components/hero";
import { PrinciplesSection } from "@/components/principles-section";
import { CulturalSignificance } from "@/components/cultural-significance";
import { KolamGallery } from "@/components/kolam-gallery";

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
