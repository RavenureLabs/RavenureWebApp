// app/references/page.tsx
import ReferencesPageComponent from "@/src/components/pages/referances.page";
import { referanceService } from "@/src/lib/services";

export const metadata = {
  title: "Ravenure - Referanslar",
  description: "Ravenure Referanslar",
};

export default async function ReferencesPage() {
  // SSR veri çekme
  const refs = await referanceService.getReferances();

  return <ReferencesPageComponent refs={refs || []} />;
}
