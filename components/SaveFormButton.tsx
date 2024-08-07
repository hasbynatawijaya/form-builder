import React, { useTransition } from "react";
import { HiSaveAs } from "react-icons/hi";
import { FaSpinner } from "react-icons/fa";

import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

import useFormDesigner from "@/hooks/useFormDesigner";

import { UpdateFormContent } from "@/actions/form";

interface Props {
  id: number;
}

export default function SaveFormButton({ id }: Props) {
  const { elements } = useFormDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: "success",
        description: "Your form has been saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2"
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading ? <FaSpinner className="animate-spin" /> : <></>}
    </Button>
  );
}
