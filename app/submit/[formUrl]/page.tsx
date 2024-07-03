import React from "react";

import { FormElementInstance } from "@/components/FormElements";
import FormSubmit from "@/components/FormSubmit";

import { GetFormContentByUrl } from "@/actions/form";

interface Props {
  params: {
    formUrl: string;
  };
}

export default async function Page({ params }: Props) {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error("form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmit formUrl={params.formUrl} content={formContent} />;
}
