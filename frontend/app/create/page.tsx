// frontend/app/create/page.tsx

"use client";

import { Suspense } from "react";
import { InteractiveGrid } from "~/components/interactive-grid";

export default function CreatePage() {
  return (
    <main>
      <Suspense fallback={<p>Loading Kolam Editor...</p>}>
        <InteractiveGrid />
      </Suspense>
    </main>
  );
}
