"use client";

import React, { useRef, useState, useTransition } from "react";

import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "./ui/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

interface Props {
  formUrl: string;
  content: FormElementInstance[];
}

export default function FormSubmit({ content, formUrl }: Props) {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [submitted, setSubmitted] = useState(false);

  const [pending, startTransition] = useTransition();

  const validateForm = () => {
    for (const field of content) {
      const value = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, value);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  };

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      //to re-render component
      setRenderKey(new Date().getTime());
      toast({
        title: "Error",
        description: "Please check error on the form",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full items-center p-8">
        <div
          className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
      w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
        >
          <h1 className="text-2xl font-bold">Form submitted</h1>
          <p className="text-muted-foreground">
            Thank you for submitting the form, you can close the page now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      key={renderKey}
      className="flex justify-center w-full h-full items-center p-8"
    >
      <div
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
      w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          return (
            <FormElement
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          );
        })}
        <Button
          disabled={pending}
          className="mt-8"
          onClick={() => startTransition(submitForm)}
        >
          {pending ? (
            <ImSpinner2 className="animate-spin" />
          ) : (
            <>
              <HiCursorClick className="mr-2" />
              Submit
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
