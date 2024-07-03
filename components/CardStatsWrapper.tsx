import StatsCards from "./StatsCards";

import { GetFormStats } from "@/actions/form";

export default async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}
