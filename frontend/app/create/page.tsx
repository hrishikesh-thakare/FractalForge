// frontend/app/create/page.tsx

"use client";

import { Suspense } from "react";
import { KolamEditor } from "~/components/generateKolam/Kolam-Editor";

export default function CreatePage() {
  return (
    <main>
      <Suspense fallback={<p>Loading Kolam Editor...</p>}>
        <KolamEditor/>
      </Suspense>
    </main>
  );
}
