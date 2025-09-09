import { Hero } from "@/components/hero";
import { PrinciplesSection } from "@/components/principles-section";
import { InteractiveGrid } from "@/components/interactive-grid";
import { CulturalSignificance } from "@/components/cultural-significance";
import { KolamGallery } from "@/components/kolam-gallery";
import { Navigation } from "@/components/navigation";
import { ThemeSelector } from "@/components/theme-selector";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navigation />
      <div className="fixed top-20 right-4 z-50">
        <ThemeSelector />
      </div>

      <main className="relative z-10">
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
      </main>
    </div>
  );
}
