import { PortfolioPage } from "@/components/PortfolioPage";
import { getPortfolioData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioPage data={data} />;
}
