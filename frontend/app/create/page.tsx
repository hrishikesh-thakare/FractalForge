import { InteractiveGrid } from "@/components/interactive-grid";
import { Navigation } from "@/components/navigation";

export default function CreateKolamPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <InteractiveGrid />
      </main>
    </div>
  );
}
