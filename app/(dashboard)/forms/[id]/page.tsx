export const dynamic = "force-dynamic";

import React from "react";

import VisitButton from "@/components/VisitButton";
import FormLinkShare from "@/components/FormLinkShare";
import StatsCards from "@/components/StatsCards";
import SubmissionTable from "@/components/SubmissionTable";

import { GetFormById } from "@/actions/form";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("form not found");
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitButton shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>

      <StatsCards
        className="container"
        loading={false}
        data={{ bounceRate, submissionRate, submissions, visits }}
      />

      <div className="container pt-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
}
