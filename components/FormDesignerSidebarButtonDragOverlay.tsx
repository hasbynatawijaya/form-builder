import React from "react";

import { FormElement } from "./FormElements";
import { Button } from "./ui/button";

interface Props {
  formElement: FormElement;
}

export default function FormDesignerSidebarButtonDragOverlay({
  formElement,
}: Props) {
  const { label, icon: Icon } = formElement.designerButtonElement;

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab"
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs">{label}</p>
    </Button>
  );
}
