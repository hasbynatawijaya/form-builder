import React, { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import CardStatsWrapper from "@/components/CardStatsWrapper";
import StatsCards from "@/components/StatsCards";
import CreateFormButton from "@/components/CreateFormButton";
import FormCards from "@/components/FormCards";
import FormCardSkeleton from "@/components/FormCardSkeleton";

export default async function Page() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Your forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense
          fallback={[1, 2, 3, 4, 5].map((el) => (
            <FormCardSkeleton key={el} />
          ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}
