import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import useFormDesigner from "@/hooks/useFormDesigner";

import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function FormDesignerSidebarProperties() {
  const { selectedElement, setSelectedElement } = useFormDesigner();

  if (!selectedElement) return null;

  const FormProperties =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <Separator className="mb-4" />
      <FormProperties elementInstance={selectedElement} />
    </div>
  );
}
