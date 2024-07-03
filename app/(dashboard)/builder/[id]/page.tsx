
export const dynamic = 'force-dynamic'

import React from "react";

import FormBuilder from "@/components/FormBuilder";

import { GetFormById } from "@/actions/form";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (form) return <FormBuilder form={form} />;
  return <></>;
}
