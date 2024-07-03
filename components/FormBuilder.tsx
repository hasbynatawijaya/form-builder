"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ImSpinner2 } from "react-icons/im";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";

import PreviewDialogButton from "@/components/PreviewDialogButton";
import SaveFormButton from "@/components/SaveFormButton";
import PublishFormButton from "@/components/PublishFormButton";
import FormDesigner from "./FormDesigner";
import DragOverlayWrapper from "./DragOverlayWrapper";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

import { Form } from "@prisma/client";

import useFormDesigner from "@/hooks/useFormDesigner";
import useMounted from "@/hooks/useMounted";

interface Props {
  form: Form;
}

export default function FormBuilder({ form }: Props) {
  const { setElements } = useFormDesigner();
  const { isMounted } = useMounted();
  const [isReady, setIsReady] = useState(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    const elements = JSON.parse(form.content);
    setElements(elements);

    const loadingTimeout = setTimeout(() => {
      setIsReady(true);
    }, 500);

    return () => clearTimeout(loadingTimeout);
  }, [form, setElements, isReady]);

  if (!isMounted) return null;

  const shareUrl = `${window?.location?.origin}/submit/${form.shareURL}`;

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (form.published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1
              className="text-center text-4xl font-bold text-primary border-b
          pb-2 mb-10"
            >
              Form published
            </h1>
            <h2 className="text-2xl">Share this form</h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              anyone with the link can view and submit the form
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input className="w-full" readOnly value={shareUrl} />
              <Button
                className="mt-2 w-full"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({
                    title: "Copied",
                    description: "Link copied to clipboard",
                  });
                }}
              >
                Copy link
              </Button>
            </div>
            <div className="flex justify-between">
              <Button variant="link" asChild>
                <Link href="/" className="gap-2">
                  <BsArrowLeft />
                  Go back home
                </Link>
              </Button>
              <Button variant="link" asChild>
                <Link href={`/forms/${form.id}`} className="gap-2">
                  Form details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published ? (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            ) : (
              <></>
            )}
          </div>
        </nav>
        <div
          className="flex w-full flex-grow items-center justify-center 
      relative overflow-y-auto h-[200px] 
      bg-accent bg-[url(/builder-background.svg)] dark:bg-[url(/builder-background-dark.svg)]"
        >
          <FormDesigner />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}
